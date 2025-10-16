import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res; // 환경변수 없으면 미들웨어 건너뜀
  }

  // 요청 쿠키를 Supabase에 전달해 인증 상태 파악
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          // 쿠키 옵션 기본값 설정
          const cookieOptions = {
            ...options,
            path: '/',
            sameSite: 'lax' as const,
            secure: process.env.NODE_ENV === 'production',
          };
          res.cookies.set(name, value, cookieOptions);
        });
      },
    },
  });

  // 세션 및 사용자 정보 가져오기
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedPaths = ["/admin"];
  const adminOnlyPaths = ["/admin"];
  const pathname = req.nextUrl.pathname;

  // 관리자 전용 페이지 보호
  if (adminOnlyPaths.some((path) => pathname.startsWith(path))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 로그인 필요 경로 보호
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 로그인한 사용자가 로그인/회원가입 페이지에 접근시 홈으로 리다이렉트
  if ((pathname === "/login" || pathname === "/signup") && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
