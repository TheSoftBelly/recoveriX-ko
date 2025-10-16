-- users 테이블 RLS 정책 최적화 (순환 참조 제거)
-- ============================================

-- 기존 정책 모두 제거
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ✅ 정책 1: 인증된 사용자는 자신의 데이터를 조회할 수 있음 (순환 참조 없음)
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- ✅ 정책 2: 인증된 사용자는 자신의 데이터를 업데이트할 수 있음 (role 제외)
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  -- role 변경 방지: 기존 role과 동일해야 함
  role = (SELECT role FROM public.users WHERE id = auth.uid())
);

-- ✅ 정책 3: 회원가입 시 INSERT 허용
CREATE POLICY "Users can insert their own data"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================
-- 관리자 권한 확인
-- ============================================

-- Admin 기능은 클라이언트 RLS가 아닌 서버 사이드에서 처리
-- 방법 1: Supabase Service Role Key 사용 (서버 컴포넌트)
-- 방법 2: auth.jwt() 함수로 user_metadata.role 체크 (아래 참고)

-- ============================================
-- 정책 확인
-- ============================================

SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users'
ORDER BY policyname;
