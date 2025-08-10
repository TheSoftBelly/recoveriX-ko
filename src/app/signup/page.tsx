"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { createSupabaseClient } from "@/lib/supabase";
import styles from "@/styles/pages/SignupPage.module.scss";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  
  let supabase = null;
  try {
    supabase = createSupabaseClient();
  } catch (err) {
    console.warn("Supabase not configured:", err);
  }

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // 유효성 검사
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "비밀번호는 8~16자의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError("개인정보 제공 동의가 필요합니다.");
      setIsLoading(false);
      return;
    }

    try {
      if (!supabase) {
        setError("인증 시스템이 설정되지 않았습니다.");
        return;
      }

      // Supabase Auth로 회원가입
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: nickname,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // 사용자 정보를 users 테이블에 저장
        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email || "",
          name: nickname,
          role: "user",
        });

        if (insertError) {
          console.error("User table insert error:", insertError);
          // 에러가 있어도 회원가입은 성공으로 처리 (Auth는 이미 완료됨)
        }

        setSuccess("회원가입이 완료되었습니다! 이메일 인증 후 로그인해주세요.");

        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!supabase) {
        setError("인증 시스템이 설정되지 않았습니다.");
        return;
      }

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
      setError("Google 회원가입 중 오류가 발생했습니다.");
      console.error("Google signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header user={null} />

      <main className={styles.signupMain}>
        {/* 왼쪽 이미지 영역 */}
        <div className={styles.imageContainer}>
          <div className={styles.backgroundImage}></div>
        </div>

        {/* 오른쪽 회원가입 폼 영역 */}
        <div className={styles.signupContainer}>
          <div className={styles.signupForm}>
            <form onSubmit={handleSubmit}>
              {/* 폼 제목 */}
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>회원가입</h1>
                <p className={styles.formSubtitle}>
                  Enter your Credentials to access your account
                </p>
                {error && <div className={styles.errorMessage}>{error}</div>}
                {success && (
                  <div className={styles.successMessage}>{success}</div>
                )}
              </div>

              {/* 닉네임 필드 */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Nickname / 닉네임</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="활동하실 닉네임을 입력해주세요."
                    className={styles.inputField}
                    required
                  />
                </div>
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
                    placeholder="이메일 주소를 입력해주세요."
                    className={styles.inputField}
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 필드 */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  Password / 비밀번호
                  <br />
                  <span className={styles.passwordHint}>
                    ( 8~16자의 영문 대소문자, 숫자, 특수문자만 가능합니다. )
                  </span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요."
                    className={styles.inputField}
                    minLength={8}
                    maxLength={16}
                    required
                  />
                </div>
              </div>

              {/* 동의 체크박스 */}
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className={styles.checkbox}
                  required
                />
                <label htmlFor="agreeToTerms" className={styles.checkboxLabel}>
                  서비스 이용을 위해 개인정보를 제공하는 것에 대해 동의
                </label>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className={styles.signupButton}
                disabled={isLoading}
              >
                {isLoading ? "회원가입 중..." : "Sign up / 회원가입"}
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
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                >
                  <div className={styles.socialIcon}></div>
                  구글로 간편 회원가입하기
                </button>
                <button
                  type="button"
                  className={styles.appleButton}
                  disabled={isLoading}
                >
                  <div className={styles.socialIcon}></div>
                  애플로 간편 회원가입하기 (준비중)
                </button>
              </div>

              {/* 로그인 링크 */}
              <div className={styles.loginLink}>
                <span>이미 계정이 있으신가요? </span>
                <Link href="/login">로그인</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
