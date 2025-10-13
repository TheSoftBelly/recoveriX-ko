"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/pages/SignupPage.module.scss";

// Next.js 앱 라우트에서 Node.js 런타임 사용 강제
export const runtime = "nodejs";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const { signUp, user, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (mounted && user && !loading) {
      window.location.href = "/";
    }
  }, [user, loading, mounted]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!agreeToTerms) {
      setError("이용약관에 동의해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password, nickname);
      setSuccess("회원가입이 완료되었습니다! 자동으로 로그인됩니다.");
      // 회원가입 성공 후 자동 로그인 및 리다이렉트
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
      setIsLoading(false);
    }
  };

  // 이미 로그인된 경우 로딩 표시
  if (loading || (mounted && user)) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.main}>
          <div className={styles.signupContainer}>
            <div className={styles.signupForm}>
              <div className={styles.loadingMessage}>로그인 중...</div>
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
        <div className={styles.signupContainer}>
          <div className={styles.signupForm}>
            <form onSubmit={handleSignup}>
              {/* 폼 제목 */}
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>회원가입</h1>
                <p className={styles.formSubtitle}>
                  recoveriX 계정을 만들어보세요
                </p>
              </div>

              {/* 에러 메시지 */}
              {error && <div className={styles.errorMessage}>{error}</div>}

              {/* 성공 메시지 */}
              {success && (
                <div className={styles.successMessage}>{success}</div>
              )}

              {/* 닉네임 입력 */}
              <div className={styles.inputGroup}>
                <label htmlFor="nickname" className={styles.inputLabel}>
                  닉네임
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={styles.inputField}
                  placeholder="닉네임을 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>

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
                  placeholder="비밀번호를 입력하세요 (8자 이상)"
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>

              {/* 이용약관 동의 */}
              <div className={styles.termsGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className={styles.checkbox}
                    disabled={isLoading}
                  />
                  <span className={styles.checkboxText}>
                    <Link href="/terms" className={styles.termsLink}>
                      이용약관
                    </Link>
                    에 동의합니다
                  </span>
                </label>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className={styles.signupButton}
                disabled={isLoading}
              >
                {isLoading ? "회원가입 중..." : "회원가입"}
              </button>

              {/* 로그인 링크 */}
              <div className={styles.loginLink}>
                <span>이미 계정이 있으신가요? </span>
                <Link href="/login" className={styles.loginText}>
                  로그인
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
