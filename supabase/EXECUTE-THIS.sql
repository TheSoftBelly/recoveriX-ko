-- ============================================
-- jjoon1024@naver.com Admin 권한 부여
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================

-- 1. public.users에 사용자 추가 + admin 권한 부여
INSERT INTO public.users (id, email, name, role, created_at)
VALUES (
  '6821d001-437b-45a0-bf36-e6a068eda1db',
  'jjoon1024@naver.com',
  'Admin User',
  'admin',
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin', email = 'jjoon1024@naver.com';

-- 2. auth.users의 user_metadata도 업데이트
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin", "name": "Admin User"}'::jsonb
WHERE id = '6821d001-437b-45a0-bf36-e6a068eda1db';

-- 3. 결과 확인
SELECT
  u.id,
  u.email,
  u.name,
  u.role as public_role,
  au.raw_user_meta_data->>'role' as auth_role,
  au.raw_user_meta_data->>'name' as auth_name
FROM public.users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'jjoon1024@naver.com';

-- 예상 결과:
-- id: 6821d001-437b-45a0-bf36-e6a068eda1db
-- email: jjoon1024@naver.com
-- name: Admin User
-- public_role: admin
-- auth_role: admin
-- auth_name: Admin User
