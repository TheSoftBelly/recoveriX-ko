-- Admin 권한 설정 스크립트
-- 실행 방법: Supabase Dashboard > SQL Editor에서 실행

-- 1. jjoon1024@naver.com 계정에 admin 권한 부여
UPDATE public.users
SET role = 'admin'
WHERE email = 'jjoon1024@naver.com';

-- 2. auth.users의 user_metadata도 업데이트
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'jjoon1024@naver.com';

-- 3. 결과 확인
SELECT id, email, name, role, created_at
FROM public.users
WHERE email = 'jjoon1024@naver.com';

-- 4. auth.users 메타데이터 확인
SELECT id, email, raw_user_meta_data->>'role' as metadata_role
FROM auth.users
WHERE email = 'jjoon1024@naver.com';
