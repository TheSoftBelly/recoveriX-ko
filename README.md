# recoveriX Korea Website

recoveriX 한국어 공식 웹사이트 - Next.js + Supabase + Vercel

## 🚀 기능

- **회원가입/로그인**: Supabase Auth를 활용한 사용자 인증
- **QnA 게시판**: 질문과 답변, 비밀글 기능 지원
- **관리자 기능**: 관리자 전용 답변 및 관리 기능
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **피그마 디자인**: 10년차 웹디자이너가 제작한 UI/UX

## 🛠 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deploy**: Vercel
- **UI**: Lucide React Icons, React Hook Form, Zod

## 📋 주요 페이지

- `/` - 메인 페이지
- `/qna` - QnA 게시판 (목록)
- `/qna/[id]` - QnA 상세 페이지
- `/login` - 로그인
- `/signup` - 회원가입
- `/about` - 회사소개
- `/contact` - 문의하기

## 🔧 개발 환경 설정

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd recoverix-website
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 기타 설정
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase 데이터베이스 설정

Supabase 프로젝트를 생성한 후, `supabase/schema.sql` 파일의 SQL을 실행하여 데이터베이스를 초기화합니다.

### 5. 개발 서버 실행
```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

## 🚀 배포

### Vercel 배포
1. [Vercel](https://vercel.com/)에 로그인
2. GitHub 리포지토리 연결
3. 환경변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. 배포 완료

## 📊 데이터베이스 스키마

### users
- 사용자 정보 (이름, 이메일, 역할)

### qna_posts
- QnA 게시글 (제목, 내용, 작성자, 비밀글 여부, 상태)

### qna_comments
- QnA 댓글/답변 (내용, 작성자, 관리자 여부)

### notices
- 공지사항 (관리자만 작성 가능)

## 🔐 보안 기능

- **RLS (Row Level Security)**: Supabase의 행 단위 보안 정책
- **비밀글 시스템**: 작성자와 관리자만 볼 수 있는 비밀글
- **관리자 권한**: 관리자 전용 기능과 접근 제어

## 🎨 UI/UX 특징

- **피그마 디자인**: 전문 디자이너가 제작한 현대적인 UI
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **접근성**: 웹 표준을 준수한 접근성 지원
- **사용자 경험**: 직관적이고 사용하기 쉬운 인터페이스

## 📝 라이센스

이 프로젝트는 recoveriX Korea의 공식 웹사이트입니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

recoveriX Korea - [공식 웹사이트](https://recoverix-korea.vercel.app)

프로젝트 링크: [https://github.com/your-username/recoverix-website](https://github.com/your-username/recoverix-website)