# Vercel 배포 가이드

## 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

### 필수 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 선택적 환경 변수

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 환경 변수 설정 방법

1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Environment Variables 메뉴로 이동
3. 각 환경 변수 추가:
   - **Production**: 프로덕션 환경용
   - **Preview**: 프리뷰 환경용 (선택사항)
   - **Development**: 개발 환경용 (선택사항)

## Supabase 설정 확인

1. Supabase 프로젝트 대시보드에서 Settings > API 확인
2. Project URL과 anon public key 복사
3. Vercel 환경 변수에 설정

## 일반적인 문제들

### 1. 로그인 후 로딩 상태가 변경되지 않는 문제

- 환경 변수가 제대로 설정되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- Supabase 프로젝트의 Authentication 설정 확인

### 2. CORS 오류

- Supabase 프로젝트의 Authentication > URL Configuration에서 도메인 추가
- `https://your-domain.vercel.app` 추가

### 3. 환경 변수 인식 안됨

- Vercel에서 환경 변수 설정 후 재배포 필요
- `vercel --prod` 명령어로 재배포

## 디버깅 방법

1. 브라우저 개발자 도구 콘솔 확인
2. Network 탭에서 API 요청 상태 확인
3. Application 탭에서 로컬 스토리지/세션 스토리지 확인

## 로컬 개발 환경 설정

`.env.local` 파일 생성:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
