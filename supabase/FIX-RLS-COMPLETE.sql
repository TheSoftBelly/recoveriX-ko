-- ============================================
-- RLS 무한 재귀 문제 해결 (Admin 지원 버전)
-- ============================================
--
-- 문제: users 테이블의 RLS 정책이 users 테이블을 참조하여 무한 재귀 발생
-- 해결: auth.jwt() 또는 간단한 인증 체크 사용
--
-- ⚠️ 이 SQL을 Supabase Dashboard → SQL Editor에서 실행하세요
-- ============================================

-- 1단계: 기존 정책 제거
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can view other users basic info" ON public.users;

-- 2단계: RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3단계: 새로운 정책 생성 (무한 재귀 방지)

-- 정책 1: 모든 인증된 사용자는 자신의 데이터를 조회할 수 있음
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- 정책 2: 모든 인증된 사용자는 다른 사용자의 기본 정보를 조회할 수 있음
-- (QnA 게시판에서 작성자 이름 표시를 위해 필요)
CREATE POLICY "Authenticated users can view other users"
ON public.users
FOR SELECT
USING (auth.role() = 'authenticated');

-- 정책 3: 사용자는 자신의 name만 업데이트할 수 있음 (role은 변경 불가)
CREATE POLICY "Users can update their own name"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  -- role은 변경할 수 없음
  role = (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1)
);

-- ============================================
-- 확인
-- ============================================

-- users 테이블 정책 확인
SELECT
  schemaname,
  tablename,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users'
ORDER BY policyname;

-- ============================================
-- 추가: role을 user_metadata에도 저장
-- ============================================

-- 이 쿼리를 실행하여 admin 사용자의 user_metadata에 role 추가
-- (이미 있으면 skip)

UPDATE auth.users
SET raw_user_meta_data =
  CASE
    WHEN raw_user_meta_data ? 'role' THEN raw_user_meta_data
    ELSE jsonb_set(raw_user_meta_data, '{role}', '"admin"')
  END
WHERE id IN (
  SELECT id FROM public.users WHERE role = 'admin'
);

-- ============================================
-- 검증
-- ============================================

-- 1. auth.users의 metadata 확인
SELECT
  id,
  email,
  raw_user_meta_data->>'role' as metadata_role
FROM auth.users
WHERE id = '6821d001-437b-45a0-bf36-e6a068eda1db';

-- 2. public.users의 role 확인
SELECT id, email, name, role
FROM public.users
WHERE id = '6821d001-437b-45a0-bf36-e6a068eda1db';



비 로그인 시에는 질문들을 등록하려면 로그인을 하라는 문구의 안내 문구가 있어야할거같아 그리고 여전히 admin에 접속하면 로딩중.. 만 무한 로딩되고 반응이 없어  대 