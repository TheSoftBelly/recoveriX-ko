"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/Header.module.scss";
import type { User } from "@supabase/supabase-js";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface HeaderProps {
  user?: UserData | null;
}

export default function Header({ user: initialUser }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState<UserData | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    // 현재 사용자 상태 확인
    const checkUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          // users 테이블에서 사용자 정보 가져오기
          const { data: userData } = await supabase
            .from("users")
            .select("*")
            .eq("id", authUser.id)
            .single();

          if (userData) {
            setUser(userData);
          } else {
            // users 테이블에 사용자 정보가 없으면 생성
            const newUser = {
              id: authUser.id,
              email: authUser.email || "",
              name:
                authUser.user_metadata?.name ||
                authUser.email?.split("@")[0] ||
                "",
              role: "user" as const,
            };

            const { error } = await supabase.from("users").insert(newUser);

            if (!error) {
              setUser(newUser);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // 초기 사용자가 없는 경우에만 확인
    if (!initialUser) {
      checkUser();
    }

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        // 로그인 시 사용자 정보 가져오기
        checkUser();
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시 사용자 정보 제거
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, initialUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
    router.refresh();
  };

  return (
    <header className={styles.header}>
      {/* 로고 */}
      <Link href="/" className={styles.logoLink}>
        <Image
          src="https://recoverix.com/wp-content/themes/recoverix/img/recoveriX-logo.svg"
          alt="recoveriX"
          width={200}
          height={36}
          priority
          className={styles.logo}
        />
      </Link>

      {/* 데스크톱 네비게이션 */}
      <nav className={styles.nav}>
        <Link href="/news" className={`${styles.navItem} ${styles.news}`}>
          소식
        </Link>
        <Link href="/faq" className={`${styles.navItem} ${styles.faq}`}>
          자주 묻는 질문
        </Link>
        <Link href="/qna" className={`${styles.navItem} ${styles.qna}`}>
          QnA 게시판
        </Link>
        <Link href="/results" className={`${styles.navItem} ${styles.results}`}>
          치료결과
        </Link>
        <Link href="/about" className={`${styles.navItem} ${styles.about}`}>
          회사소개
        </Link>
        <Link href="/contact" className={`${styles.navItem} ${styles.contact}`}>
          문의
        </Link>
      </nav>

      {/* 인증 섹션 */}
      <div className={styles.authSection}>
        {isLoading ? (
          <div className={styles.authLoading}>로딩 중...</div>
        ) : user ? (
          <div className={styles.userMenu}>
            <button
              className={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user.name}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown}>
                <Link
                  href="/profile"
                  className={styles.dropdownItem}
                  onClick={() => setShowUserMenu(false)}
                >
                  프로필
                </Link>
                <Link
                  href="/qna"
                  className={styles.dropdownItem}
                  onClick={() => setShowUserMenu(false)}
                >
                  QnA 게시판
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className={styles.dropdownItem}
                    onClick={() => setShowUserMenu(false)}
                  >
                    관리자
                  </Link>
                )}
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className={styles.loginButton}>
              로그인
            </Link>
            <Link href="/signup" className={styles.signupButton}>
              회원가입
            </Link>
          </>
        )}

        {/* 모바일 메뉴 버튼 */}
        <button
          className={`${styles.mobileMenuButton} ${
            showMobileMenu ? styles.open : ""
          }`}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <nav
        className={`${styles.mobileMenu} ${showMobileMenu ? styles.open : ""}`}
      >
        <div className={styles.mobileNavList}>
          <Link
            href="/news"
            className={styles.mobileNavItem}
            onClick={() => setShowMobileMenu(false)}
          >
            소식
          </Link>
          <Link
            href="/faq"
            className={styles.mobileNavItem}
            onClick={() => setShowMobileMenu(false)}
          >
            자주 묻는 질문
          </Link>
          <Link
            href="/qna"
            className={styles.mobileNavItem}
            onClick={() => setShowMobileMenu(false)}
          >
            QnA 게시판
          </Link>
          <Link
            href="/results"
            className={styles.mobileNavItem}
            onClick={() => setShowMobileMenu(false)}
          >
            치료결과
          </Link>
          <Link
            href="/about"
            className={styles.mobileNavItem}
            onClick={() => setShowMobileMenu(false)}
          >
            회사소개
          </Link>
          <Link
            href="/contact"
            className={styles.mobileNavItem}
            onClick={() => setShowMobileMenu(false)}
          >
            문의
          </Link>

          {!user && (
            <div className={styles.mobileAuthButtons}>
              <Link
                href="/login"
                className={styles.loginButton}
                onClick={() => setShowMobileMenu(false)}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={styles.signupButton}
                onClick={() => setShowMobileMenu(false)}
              >
                회원가입
              </Link>
            </div>
          )}

          {user && (
            <div className={styles.mobileNavList}>
              <Link
                href="/profile"
                className={styles.mobileNavItem}
                onClick={() => setShowMobileMenu(false)}
              >
                프로필
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={styles.mobileNavItem}
                  onClick={() => setShowMobileMenu(false)}
                >
                  관리자
                </Link>
              )}
              <button
                className={styles.mobileNavItem}
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
