import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Supabase 클라이언트 생성
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res; // 환경 변수가 없으면 미들웨어를 건너뜀
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });

  // 세션 새로고침
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 보호된 경로들
  const protectedPaths = ["/profile", "/admin"];
  const adminOnlyPaths = ["/admin"];

  const pathname = req.nextUrl.pathname;

  // 관리자 전용 페이지 보호
  if (adminOnlyPaths.some((path) => pathname.startsWith(path))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 사용자 역할 확인
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 일반 보호된 페이지
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하는 경우
  if ((pathname === "/login" || pathname === "/signup") && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
