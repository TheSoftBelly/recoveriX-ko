"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/components/Header.module.scss";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log("Header - loading:", loading, "user:", user?.name);
  }, [loading, user]);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    if (mounted) {
      window.location.href = "/";
    }
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
        {!mounted ? (
          <div className={styles.authLoading}>초기화 중...</div>
        ) : loading ? (
          <div className={styles.authLoading}>로딩 중...</div>
        ) : user ? (
          <div className={styles.userMenu}>
            <button
              className={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={showUserMenu ? styles.rotated : ""}
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropdownHeader}>
                  <span className={styles.dropdownUserName}>{user.name}</span>
                  <span className={styles.dropdownUserEmail}>{user.email}</span>
                </div>
                <Link
                  href="/profile"
                  className={styles.dropdownItem}
                  onClick={() => setShowUserMenu(false)}
                >
                  프로필 관리
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
                    관리자 페이지
                  </Link>
                )}
                <div className={styles.dropdownDivider}></div>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginButton}>
              로그인
            </Link>
            <Link href="/signup" className={styles.signupButton}>
              회원가입
            </Link>
          </div>
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
