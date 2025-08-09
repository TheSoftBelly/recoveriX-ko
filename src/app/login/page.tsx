"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import styles from "@/styles/pages/LoginPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log("Login attempt:", { email, password, rememberMe });
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
                <p className={styles.formSubtitle}>계정에 액세스하려면 자격 증명을 입력하세요</p>
              </div>

              {/* 이메일 필드 */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email address / 이메일 주소</label>
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
                  <label className={styles.inputLabel}>Password / 비밀번호</label>
                  <Link href="/forgot-password" className={styles.forgotPassword}>
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
              <button type="submit" className={styles.loginButton}>
                Login / 로그인
              </button>

              {/* 구분선 */}
              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <span className={styles.dividerText}>Or</span>
              </div>

              {/* 소셜 로그인 버튼들 */}
              <div className={styles.socialButtons}>
                <button type="button" className={styles.googleButton}>
                  <div className={styles.socialIcon}></div>
                  구글로 간편 로그인하기
                </button>
                <button type="button" className={styles.appleButton}>
                  <div className={styles.socialIcon}></div>
                  애플로 간편 로그인하기
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