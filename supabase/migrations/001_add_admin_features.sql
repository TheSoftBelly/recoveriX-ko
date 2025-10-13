-- notifications 테이블 생성
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- audit_logs 테이블 생성
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id TEXT NOT NULL,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- qna_posts에 새 컬럼 추가
ALTER TABLE qna_posts
  ADD COLUMN IF NOT EXISTS is_answered BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
  ADD COLUMN IF NOT EXISTS assigned_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- qna_comments에 새 컬럼 추가
ALTER TABLE qna_comments
  ADD COLUMN IF NOT EXISTS is_admin_reply BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qna_posts_is_answered ON qna_posts(is_answered);
CREATE INDEX IF NOT EXISTS idx_qna_posts_priority ON qna_posts(priority);
CREATE INDEX IF NOT EXISTS idx_qna_posts_assigned_admin ON qna_posts(assigned_admin);

-- RLS (Row Level Security) 활성화
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- notifications RLS 정책
-- 관리자는 모든 알림 볼 수 있음
CREATE POLICY "Admins can view all notifications"
  ON notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- 관리자는 알림 업데이트 가능 (읽음 표시)
CREATE POLICY "Admins can update notifications"
  ON notifications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- 시스템에서 알림 생성 가능
CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- audit_logs RLS 정책
-- 관리자만 감사 로그 볼 수 있음
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- 인증된 사용자는 감사 로그 생성 가능
CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- qna_posts RLS 정책 업데이트
-- 관리자는 모든 게시물의 우선순위와 담당자 수정 가능
DROP POLICY IF EXISTS "Admins can update any post" ON qna_posts;
CREATE POLICY "Admins can update any post"
  ON qna_posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- 답변 작성 시 자동으로 is_answered 업데이트하는 함수
CREATE OR REPLACE FUNCTION update_post_answered_status()
RETURNS TRIGGER AS $$
BEGIN
  -- 관리자 답변이 추가되면 해당 게시물을 답변완료로 표시
  IF NEW.is_admin_reply = true THEN
    UPDATE qna_posts
    SET is_answered = true, status = 'answered'
    WHERE id = NEW.post_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
DROP TRIGGER IF EXISTS on_admin_reply_insert ON qna_comments;
CREATE TRIGGER on_admin_reply_insert
  AFTER INSERT ON qna_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_answered_status();

-- 새 게시물 생성 시 알림 생성하는 함수
CREATE OR REPLACE FUNCTION create_notification_on_new_post()
RETURNS TRIGGER AS $$
BEGIN
  -- 미답변 Q&A 알림 생성
  INSERT INTO notifications (type, payload, is_read)
  VALUES (
    'qna_unanswered',
    jsonb_build_object(
      'post_id', NEW.id,
      'title', NEW.title,
      'author_id', NEW.author_id,
      'created_at', NEW.created_at
    ),
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
DROP TRIGGER IF EXISTS on_qna_post_insert ON qna_posts;
CREATE TRIGGER on_qna_post_insert
  AFTER INSERT ON qna_posts
  FOR EACH ROW
  EXECUTE FUNCTION create_notification_on_new_post();

-- 기존 qna_posts 데이터 마이그레이션
-- status가 'answered'인 게시물은 is_answered를 true로 설정
UPDATE qna_posts
SET is_answered = true
WHERE status = 'answered' AND is_answered = false;

-- Comments
COMMENT ON TABLE notifications IS '관리자용 알림 테이블';
COMMENT ON TABLE audit_logs IS '관리자 작업 감사 로그';
COMMENT ON COLUMN qna_posts.is_answered IS '답변 완료 여부';
COMMENT ON COLUMN qna_posts.priority IS '게시물 우선순위 (low, normal, high)';
COMMENT ON COLUMN qna_posts.assigned_admin IS '담당 관리자 ID';
COMMENT ON COLUMN qna_comments.is_admin_reply IS '관리자 답변 여부';
COMMENT ON COLUMN qna_comments.published_at IS '답변 게시 시간';
