"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { createSupabaseClient } from "@/lib/supabase";
import styles from "@/styles/pages/LoginPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // 사용자 정보를 users 테이블에서 확인/생성
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (userError && userError.code === "PGRST116") {
          // 사용자가 users 테이블에 없으면 생성
          await supabase.from("users").insert({
            id: data.user.id,
            email: data.user.email || "",
            name:
              data.user.user_metadata?.name ||
              data.user.email?.split("@")[0] ||
              "",
            role: "user",
          });
        }

        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Google 로그인 중 오류가 발생했습니다.");
      console.error("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header user={null} />

      <main className={styles.loginMain}>
        {/* 왼쪽 이미지 영역 */}
        <div className={styles.imageContainer}>
          <div className={styles.backgroundImage}></div>
        </div>

        {/* 오른쪽 로그인 폼 영역 */}
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
              {/* 폼 제목 */}
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>로그인</h1>
                <p className={styles.formSubtitle}>
                  계정에 액세스하려면 자격 증명을 입력하세요
                </p>
                {error && <div className={styles.errorMessage}>{error}</div>}
              </div>

              {/* 이메일 필드 */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  Email address / 이메일 주소
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소를 입력해주세요"
                    className={styles.inputField}
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 필드 */}
              <div className={styles.inputGroup}>
                <div className={styles.passwordHeader}>
                  <label className={styles.inputLabel}>
                    Password / 비밀번호
                  </label>
                  <Link
                    href="/forgot-password"
                    className={styles.forgotPassword}
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요."
                    className={styles.inputField}
                    required
                  />
                </div>
              </div>

              {/* 기억하기 체크박스 */}
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                  30일동안 기억하기
                </label>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "Login / 로그인"}
              </button>

              {/* 구분선 */}
              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <span className={styles.dividerText}>Or</span>
              </div>

              {/* 소셜 로그인 버튼들 */}
              <div className={styles.socialButtons}>
                <button
                  type="button"
                  className={styles.googleButton}
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <div className={styles.socialIcon}></div>
                  구글로 간편 로그인하기
                </button>
                <button
                  type="button"
                  className={styles.appleButton}
                  disabled={isLoading}
                >
                  <div className={styles.socialIcon}></div>
                  애플로 간편 로그인하기 (준비중)
                </button>
              </div>

              {/* 회원가입 링크 */}
              <div className={styles.signupLink}>
                <span>계정이 없으신가요? </span>
                <Link href="/signup">회원가입</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
