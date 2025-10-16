"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/pages/LoginPage.module.scss";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { supabase } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // URL에서 토큰 확인 (hash와 query params 모두 체크)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const queryParams = new URLSearchParams(window.location.search);

    const accessToken = hashParams.get("access_token") || queryParams.get("access_token");
    const type = hashParams.get("type") || queryParams.get("type");
    const errorDescription = hashParams.get("error_description") || queryParams.get("error_description");

    console.log("Reset Password - Full URL:", window.location.href);
    console.log("Reset Password - URL Hash:", window.location.hash);
    console.log("Reset Password - URL Search:", window.location.search);
    console.log("Reset Password - Access Token:", accessToken ? "존재함" : "없음");
    console.log("Reset Password - Type:", type);
    console.log("Reset Password - Error Description:", errorDescription);

    // Supabase에서 에러를 반환한 경우
    if (errorDescription) {
      setError(`비밀번호 재설정 링크가 유효하지 않습니다: ${errorDescription}`);
      console.error("Reset Password - Supabase error:", errorDescription);
      return;
    }

    // type이 recovery 또는 없을 때 허용 (Supabase 버전에 따라 다름)
    if (!accessToken) {
      setError("유효하지 않은 비밀번호 재설정 링크입니다. 비밀번호 찾기를 다시 시도해주세요.");
      console.error("Reset Password - No access token found");
    } else if (type && type !== "recovery") {
      setError("유효하지 않은 비밀번호 재설정 링크입니다.");
      console.error("Reset Password - Invalid type:", type);
    } else {
      // 토큰이 있으면 세션 자동 설정 (Supabase가 처리)
      console.log("Reset Password - Token valid, ready to reset password");
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // 비밀번호 유효성 검사
    if (newPassword.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Reset Password - Attempting to update password...");

      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      console.log("Reset Password - Update result:", { data, error: updateError });

      if (updateError) {
        throw updateError;
      }

      console.log("Reset Password - Password updated successfully");
      setSuccess(true);

      // 3초 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      console.error("비밀번호 재설정 오류:", error);
      console.error("비밀번호 재설정 오류 상세:", {
        message: error.message,
        status: error.status,
        code: error.code,
      });

      // 에러 메시지 한국어 변환
      let errorMessage = "비밀번호 재설정 중 오류가 발생했습니다.";

      if (error.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes("same as the old password")) {
          errorMessage = "새 비밀번호는 이전 비밀번호와 달라야 합니다.";
        } else if (msg.includes("weak password")) {
          errorMessage = "비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.";
        } else if (msg.includes("invalid") || msg.includes("expired")) {
          errorMessage = "비밀번호 재설정 링크가 만료되었거나 유효하지 않습니다.";
        } else if (msg.includes("session") || msg.includes("not authenticated")) {
          errorMessage = "세션이 만료되었습니다. 비밀번호 재설정을 다시 요청해주세요.";
        }
      }

      setError(errorMessage);
    } finally {
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
                  <h1 className={styles.formTitle}>새 비밀번호 설정</h1>
                  <p className={styles.formSubtitle}>
                    새로 사용할 비밀번호를 입력해주세요
                  </p>
                </div>

                {/* 에러 메시지 */}
                {error && <div className={styles.errorMessage}>{error}</div>}

                {/* 새 비밀번호 입력 */}
                <div className={styles.inputGroup}>
                  <label htmlFor="newPassword" className={styles.inputLabel}>
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={styles.inputField}
                    placeholder="새 비밀번호를 입력하세요"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>

                {/* 비밀번호 확인 */}
                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword" className={styles.inputLabel}>
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.inputField}
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>

                {/* 재설정 버튼 */}
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={isLoading}
                >
                  {isLoading ? "재설정 중..." : "비밀번호 재설정"}
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
                  <h1 className={styles.formTitle}>비밀번호 재설정 완료</h1>
                  <div className={styles.successMessage}>
                    <p>비밀번호가 성공적으로 변경되었습니다.</p>
                    <p>잠시 후 로그인 페이지로 이동합니다...</p>
                  </div>
                </div>

                <div className={styles.signupLink}>
                  <Link href="/login" className={styles.signupText}>
                    지금 로그인하기 →
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
