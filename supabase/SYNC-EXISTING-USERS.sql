-- 기존 사용자들의 auth.users.user_metadata.role을 public.users.role과 동기화
-- ============================================

-- 모든 기존 사용자의 user_metadata.role 업데이트
UPDATE auth.users au
SET raw_user_meta_data = jsonb_set(
  COALESCE(au.raw_user_meta_data, '{}'::jsonb),
  '{role}',
  to_jsonb(pu.role)
)
FROM public.users pu
WHERE au.id = pu.id
  AND (au.raw_user_meta_data->>'role' IS DISTINCT FROM pu.role);

-- 확인: 모든 사용자의 role이 동기화되었는지 확인
SELECT
  au.id,
  au.email,
  au.raw_user_meta_data->>'role' as jwt_role,
  pu.role as db_role,
  CASE
    WHEN au.raw_user_meta_data->>'role' = pu.role THEN '✓ 동기화됨'
    ELSE '✗ 불일치'
  END as status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC;
