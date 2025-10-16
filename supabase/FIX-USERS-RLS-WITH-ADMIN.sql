-- users 테이블 RLS 정책 최적화 (JWT 기반 Admin 체크)
-- ============================================

-- 기존 정책 모두 제거
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;

-- RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ✅ 정책 1: 사용자는 자신의 데이터를 조회 가능 + Admin은 모든 데이터 조회 가능
-- JWT의 user_metadata.role을 체크 (순환 참조 없음!)
CREATE POLICY "Users can view own data, admins can view all"
ON public.users
FOR SELECT
USING (
  auth.uid() = id  -- 자신의 데이터
  OR
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'  -- 또는 JWT에 admin role
);

-- ✅ 정책 2: 사용자는 자신의 데이터를 업데이트 (role 제외)
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  role = (SELECT role FROM public.users WHERE id = auth.uid())
);

-- ✅ 정책 3: Admin은 모든 사용자의 role 변경 가능
CREATE POLICY "Admins can update user roles"
ON public.users
FOR UPDATE
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- ✅ 정책 4: 회원가입 시 INSERT 허용
CREATE POLICY "Users can insert their own data"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================
-- 중요: auth.users의 user_metadata와 public.users의 role 동기화 필수!
-- ============================================

-- 회원가입 시 auth.users.user_metadata.role을 'user'로 설정
-- signUp 함수에서 options.data = { role: 'user', ... } 확인

-- Admin 승격 시 user_metadata도 업데이트하는 함수
CREATE OR REPLACE FUNCTION sync_user_metadata_role()
RETURNS TRIGGER AS $$
BEGIN
  -- public.users의 role이 변경되면 auth.users의 user_metadata.role도 업데이트
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    to_jsonb(NEW.role)
  )
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
DROP TRIGGER IF EXISTS sync_role_to_metadata ON public.users;
CREATE TRIGGER sync_role_to_metadata
  AFTER UPDATE OF role ON public.users
  FOR EACH ROW
  WHEN (OLD.role IS DISTINCT FROM NEW.role)
  EXECUTE FUNCTION sync_user_metadata_role();

-- ============================================
-- 정책 확인
-- ============================================

SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users'
ORDER BY policyname;
