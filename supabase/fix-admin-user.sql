-- jjoon1024@naver.com 사용자 admin 권한 설정
-- Supabase Dashboard > SQL Editor에서 실행

-- 1. auth.users에서 사용자 ID 확인
SELECT id, email, raw_user_meta_data
FROM auth.users
WHERE email = 'jjoon1024@naver.com';

-- 2. public.users 테이블에 사용자가 있는지 확인
SELECT * FROM public.users WHERE email = 'jjoon1024@naver.com';

-- 3. (만약 없다면) auth.users의 ID를 복사하여 public.users에 추가
-- ⚠️ 아래 UUID를 1번 쿼리 결과의 실제 ID로 교체하세요!
INSERT INTO public.users (id, email, name, role, created_at)
VALUES (
  '[1번 쿼리에서 나온 UUID]',  -- 예: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  'jjoon1024@naver.com',
  'Admin',
  'admin',
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- 4. auth.users의 user_metadata도 업데이트
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'jjoon1024@naver.com';

-- 5. 최종 확인
SELECT
  u.id,
  u.email,
  u.name,
  u.role as public_role,
  au.raw_user_meta_data->>'role' as auth_role
FROM public.users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'jjoon1024@naver.com';

-- 예상 결과:
-- id: [UUID]
-- email: jjoon1024@naver.com
-- name: Admin
-- public_role: admin
-- auth_role: admin
