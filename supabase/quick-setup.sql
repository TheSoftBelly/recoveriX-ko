-- ============================================
-- recoveriX 빠른 설정 스크립트
-- Supabase SQL Editor에서 직접 실행 가능
-- ============================================

-- Step 1: notifications 테이블 생성
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 2: audit_logs 테이블 생성
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id TEXT NOT NULL,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 3: qna_posts에 새 컬럼 추가
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'qna_posts' AND column_name = 'is_answered') THEN
    ALTER TABLE qna_posts ADD COLUMN is_answered BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'qna_posts' AND column_name = 'priority') THEN
    ALTER TABLE qna_posts ADD COLUMN priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'qna_posts' AND column_name = 'assigned_admin') THEN
    ALTER TABLE qna_posts ADD COLUMN assigned_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Step 4: qna_comments에 새 컬럼 추가
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'qna_comments' AND column_name = 'is_admin_reply') THEN
    ALTER TABLE qna_comments ADD COLUMN is_admin_reply BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'qna_comments' AND column_name = 'published_at') THEN
    ALTER TABLE qna_comments ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Step 5: 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qna_posts_is_answered ON qna_posts(is_answered);
CREATE INDEX IF NOT EXISTS idx_qna_posts_priority ON qna_posts(priority);

-- Step 6: RLS 활성화
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Step 7: RLS 정책 생성
-- notifications 정책
DROP POLICY IF EXISTS "Admins can view all notifications" ON notifications;
CREATE POLICY "Admins can view all notifications"
  ON notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update notifications" ON notifications;
CREATE POLICY "Admins can update notifications"
  ON notifications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "System can insert notifications" ON notifications;
CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- audit_logs 정책
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON audit_logs;
CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Step 8: 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_post_answered_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_admin_reply = true THEN
    UPDATE qna_posts
    SET is_answered = true, status = 'answered'
    WHERE id = NEW.post_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION create_notification_on_new_post()
RETURNS TRIGGER AS $$
BEGIN
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

-- Step 9: 트리거 생성
DROP TRIGGER IF EXISTS on_admin_reply_insert ON qna_comments;
CREATE TRIGGER on_admin_reply_insert
  AFTER INSERT ON qna_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_answered_status();

DROP TRIGGER IF EXISTS on_qna_post_insert ON qna_posts;
CREATE TRIGGER on_qna_post_insert
  AFTER INSERT ON qna_posts
  FOR EACH ROW
  EXECUTE FUNCTION create_notification_on_new_post();

-- Step 10: 기존 데이터 마이그레이션
UPDATE qna_posts
SET is_answered = true
WHERE status = 'answered' AND is_answered = false;

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '✅ recoveriX 데이터베이스 설정이 완료되었습니다!';
  RAISE NOTICE '다음 단계:';
  RAISE NOTICE '1. 관리자 계정 설정: UPDATE users SET role = ''admin'' WHERE email = ''your-email@example.com'';';
  RAISE NOTICE '2. Realtime 구독 활성화 (Dashboard > Database > Replication)';
  RAISE NOTICE '3. 애플리케이션에서 기능 테스트';
END $$;
