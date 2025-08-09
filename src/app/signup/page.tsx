"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import styles from "@/styles/pages/SignupPage.module.scss";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 구현
    console.log("Signup attempt:", { nickname, email, password, agreeToTerms });
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
                <p className={styles.formSubtitle}>Enter your Credentials to access your account</p>
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
                <label className={styles.inputLabel}>Email address / 이메일 주소</label>
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
                  Password / 비밀번호<br />
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
              <button type="submit" className={styles.signupButton}>
                Sign up / 회원가입
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