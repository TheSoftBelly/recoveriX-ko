-- 테이블 구조 및 데이터 확인 스크립트

-- 1. users 테이블 구조 확인
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'users'
ORDER BY ordinal_position;

-- 2. 모든 사용자 목록 확인
SELECT id, email, name, role, created_at
FROM public.users
ORDER BY created_at DESC;

-- 3. jjoon1024@naver.com 계정 상세 정보
SELECT *
FROM public.users
WHERE email = 'jjoon1024@naver.com';

-- 4. qna_posts 테이블 구조 확인
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'qna_posts'
ORDER BY ordinal_position;

-- 5. 최근 QnA 게시글 확인
SELECT id, title, author_id, status, is_private, created_at
FROM public.qna_posts
ORDER BY created_at DESC
LIMIT 10;
