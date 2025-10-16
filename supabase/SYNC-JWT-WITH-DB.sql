-- JWT를 DB와 동기화 (DB를 권위 소스로 사용)
-- ============================================

-- ✅ 모든 사용자의 JWT(user_metadata)를 public.users 테이블과 동기화
UPDATE auth.users au
SET raw_user_meta_data = jsonb_set(
  jsonb_set(
    COALESCE(au.raw_user_meta_data, '{}'::jsonb),
    '{name}',
    to_jsonb(pu.name)
  ),
  '{role}',
  to_jsonb(pu.role)
)
FROM public.users pu
WHERE au.id = pu.id
  AND (
    au.raw_user_meta_data->>'name' IS DISTINCT FROM pu.name
    OR au.raw_user_meta_data->>'role' IS DISTINCT FROM pu.role
  );

-- ============================================
-- 동기화 결과 확인
-- ============================================

SELECT
  au.id,
  au.email,
  au.raw_user_meta_data->>'name' as jwt_name,
  pu.name as db_name,
  au.raw_user_meta_data->>'role' as jwt_role,
  pu.role as db_role,
  CASE
    WHEN au.raw_user_meta_data->>'name' = pu.name
      AND au.raw_user_meta_data->>'role' = pu.role::text
    THEN '✓ 동기화됨'
    ELSE '✗ 불일치'
  END as status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NOT NULL
ORDER BY au.created_at DESC;
