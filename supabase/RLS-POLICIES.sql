-- 1. users 테이블 RLS 정책
-- ============================================

-- 기존 정책 제거 (있을 경우)
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 정책 1: 모든 사용자는 자신의 데이터를 조회할 수 있음
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- 정책 2: 관리자는 모든 사용자 데이터를 조회할 수 있음
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 정책 3: 사용자는 자신의 데이터를 업데이트할 수 있음 (role 제외)
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  role = (SELECT role FROM public.users WHERE id = auth.uid())
);

-- 정책 4: 관리자는 모든 사용자의 role을 변경할 수 있음
CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);


-- 2. qna_posts 테이블 RLS 정책
-- ============================================

DROP POLICY IF EXISTS "Anyone can view public posts" ON public.qna_posts;
DROP POLICY IF EXISTS "Users can view their own posts" ON public.qna_posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.qna_posts;
DROP POLICY IF EXISTS "Users can create posts" ON public.qna_posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.qna_posts;
DROP POLICY IF EXISTS "Admins can update all posts" ON public.qna_posts;

ALTER TABLE public.qna_posts ENABLE ROW LEVEL SECURITY;

-- 누구나 비공개가 아닌 게시글 조회 가능 (비로그인 포함)
CREATE POLICY "Anyone can view public posts"
ON public.qna_posts
FOR SELECT
USING (is_private = false);

-- 사용자는 자신의 게시글만 조회 (비공개 포함)
CREATE POLICY "Users can view their own posts"
ON public.qna_posts
FOR SELECT
USING (auth.uid() = author_id);

-- 관리자는 모든 게시글 조회
CREATE POLICY "Admins can view all posts"
ON public.qna_posts
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 로그인한 사용자는 게시글 작성 가능
CREATE POLICY "Users can create posts"
ON public.qna_posts
FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- 사용자는 자신의 게시글만 수정
CREATE POLICY "Users can update their own posts"
ON public.qna_posts
FOR UPDATE
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- 관리자는 모든 게시글 수정 가능 (우선순위, 답변 상태 등)
CREATE POLICY "Admins can update all posts"
ON public.qna_posts
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);


-- 3. qna_comments 테이블 RLS 정책
-- ============================================

DROP POLICY IF EXISTS "Users can view comments on their posts" ON public.qna_comments;
DROP POLICY IF EXISTS "Admins can view all comments" ON public.qna_comments;
DROP POLICY IF EXISTS "Users can create comments" ON public.qna_comments;
DROP POLICY IF EXISTS "Admins can create comments" ON public.qna_comments;

ALTER TABLE public.qna_comments ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 게시글에 달린 댓글만 조회
CREATE POLICY "Users can view comments on their posts"
ON public.qna_comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.qna_posts
    WHERE id = post_id AND author_id = auth.uid()
  )
);

-- 관리자는 모든 댓글 조회
CREATE POLICY "Admins can view all comments"
ON public.qna_comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 사용자는 자신의 게시글에 댓글 작성 가능
CREATE POLICY "Users can create comments"
ON public.qna_comments
FOR INSERT
WITH CHECK (
  auth.uid() = author_id AND
  EXISTS (
    SELECT 1 FROM public.qna_posts
    WHERE id = post_id AND author_id = auth.uid()
  )
);

-- 관리자는 모든 게시글에 댓글 작성 가능
CREATE POLICY "Admins can create comments"
ON public.qna_comments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);


-- 4. audit_logs 테이블 RLS 정책
-- ============================================

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can create audit logs" ON public.audit_logs;

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 관리자만 audit logs 조회 가능
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 관리자만 audit logs 생성 가능
CREATE POLICY "Admins can create audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);


-- 5. notifications 테이블 RLS 정책 (있을 경우)
-- ============================================

DROP POLICY IF EXISTS "Admins can view notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON public.notifications;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 관리자는 모든 알림 조회
CREATE POLICY "Admins can view notifications"
ON public.notifications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 시스템 (서비스 롤)이 알림 생성 가능
CREATE POLICY "System can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);

-- 관리자는 알림 읽음 처리 가능
CREATE POLICY "Admins can update notifications"
ON public.notifications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);


-- ============================================
-- 정책 확인
-- ============================================

-- users 테이블 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users';

-- qna_posts 테이블 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'qna_posts';

-- qna_comments 테이블 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'qna_comments';
