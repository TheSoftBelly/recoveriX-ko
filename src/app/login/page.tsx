"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/pages/LoginPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const { signIn, user, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (mounted && user && !loading) {
      console.log("로그인 완료, 홈으로 리다이렉트");
      setIsLoading(false); // 로그인 페이지 로딩 상태 해제
      window.location.href = "/";
    }
  }, [user, loading, mounted]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        // 로그인 성공 시 로딩 상태 유지 (AuthContext에서 처리)
        console.log("로그인 성공, AuthContext 상태 변화 대기 중");
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  // 이미 로그인된 경우 로딩 표시
  if (loading || (mounted && user) || isLoading) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.main}>
          <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
              <div className={styles.loadingMessage}>
                {loading ? "인증 상태 확인 중..." : "로그인 중..."}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <form onSubmit={handleLogin}>
              {/* 폼 제목 */}
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>로그인</h1>
                <p className={styles.formSubtitle}>
                  recoveriX 계정으로 로그인하세요
                </p>
              </div>

              {/* 에러 메시지 */}
              {error && <div className={styles.errorMessage}>{error}</div>}

              {/* 이메일 입력 */}
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  placeholder="이메일을 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* 로그인 옵션 */}
              <div className={styles.loginOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkbox}
                    disabled={isLoading}
                  />
                  <span className={styles.checkboxText}>로그인 상태 유지</span>
                </label>
                <Link href="/forgot-password" className={styles.forgotPassword}>
                  비밀번호를 잊으셨나요?
                </Link>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </button>

              {/* 회원가입 링크 */}
              <div className={styles.signupLink}>
                <span>계정이 없으신가요? </span>
                <Link href="/signup" className={styles.signupText}>
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
