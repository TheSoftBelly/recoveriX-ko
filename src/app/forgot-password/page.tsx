"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/pages/LoginPage.module.scss";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { supabase } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (resetError) {
        throw resetError;
      }

      setSuccess(true);
    } catch (error: any) {
      console.error("비밀번호 재설정 이메일 발송 오류:", error);

      // 에러 메시지 한국어 변환
      let errorMessage = "비밀번호 재설정 이메일 발송 중 오류가 발생했습니다.";

      if (error.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes("user not found") || msg.includes("not found")) {
          errorMessage = "등록되지 않은 이메일 주소입니다.";
        } else if (msg.includes("rate limit") || msg.includes("too many")) {
          errorMessage = "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.";
        } else if (msg.includes("invalid email")) {
          errorMessage = "올바른 이메일 형식이 아닙니다.";
        }
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            {!success ? (
              <form onSubmit={handleResetPassword}>
                {/* 폼 제목 */}
                <div className={styles.formHeader}>
                  <h1 className={styles.formTitle}>비밀번호 재설정</h1>
                  <p className={styles.formSubtitle}>
                    가입하신 이메일 주소를 입력하시면
                    <br />
                    비밀번호 재설정 링크를 보내드립니다
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

                {/* 재설정 버튼 */}
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={isLoading}
                >
                  {isLoading ? "발송 중..." : "재설정 이메일 보내기"}
                </button>

                {/* 로그인 링크 */}
                <div className={styles.signupLink}>
                  <Link href="/login" className={styles.signupText}>
                    ← 로그인 페이지로 돌아가기
                  </Link>
                </div>
              </form>
            ) : (
              <div className={styles.successContainer}>
                <div className={styles.formHeader}>
                  <h1 className={styles.formTitle}>이메일 발송 완료</h1>
                  <div className={styles.successMessage}>
                    <p>
                      <strong>{email}</strong>로
                      <br />
                      비밀번호 재설정 링크를 보냈습니다.
                    </p>
                    <p>
                      이메일을 확인하시고 링크를 클릭하여
                      <br />
                      비밀번호를 재설정해주세요.
                    </p>
                    <p className={styles.noteText}>
                      ※ 이메일이 도착하지 않은 경우 스팸함을 확인해주세요.
                    </p>
                  </div>
                </div>

                <div className={styles.signupLink}>
                  <Link href="/login" className={styles.signupText}>
                    ← 로그인 페이지로 돌아가기
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
