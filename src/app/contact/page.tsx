"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import styles from "@/styles/pages/ContactPage.module.scss";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // 실제 구현에서는 API 호출을 여기에 추가
    try {
      // 시뮬레이션된 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>문의</h1>
          <p className={styles.description}>
            recoveriX에 대한 문의사항이 있으시면 언제든 연락주세요.
          </p>

          <div className={styles.contentGrid}>
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionTitle}>연락처 정보</h2>

              <div className={styles.infoItem}>
                <h3 className={styles.infoTitle}>주소</h3>
                <p className={styles.infoText}>
                  g.tec medical engineering GmbH
                  <br />
                  Herbersteinstrasse 60
                  <br />
                  8020 Graz, Austria
                </p>
              </div>

              <div className={styles.infoItem}>
                <h3 className={styles.infoTitle}>전화</h3>
                <p className={styles.infoText}>+43 316 389 20</p>
              </div>

              <div className={styles.infoItem}>
                <h3 className={styles.infoTitle}>이메일</h3>
                <p className={styles.infoText}>info@recoverix.com</p>
              </div>

              <div className={styles.infoItem}>
                <h3 className={styles.infoTitle}>영업시간</h3>
                <p className={styles.infoText}>
                  월-금: 09:00 - 18:00
                  <br />
                  토-일: 휴무
                </p>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2 className={styles.sectionTitle}>문의하기</h2>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  문의가 성공적으로 전송되었습니다. 빠른 시일 내에
                  답변드리겠습니다.
                </div>
              )}

              {submitStatus === "error" && (
                <div className={styles.errorMessage}>
                  문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.inputLabel}>
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.inputField}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.inputLabel}>
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.inputField}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.inputLabel}>
                      전화번호
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.inputField}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="subject" className={styles.inputLabel}>
                      문의 유형 *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={styles.inputField}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">선택해주세요</option>
                      <option value="treatment">치료 문의</option>
                      <option value="appointment">진료 예약</option>
                      <option value="technical">기술 문의</option>
                      <option value="business">사업 제휴</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.inputLabel}>
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textareaField}
                    rows={6}
                    required
                    disabled={isSubmitting}
                    placeholder="문의하실 내용을 자세히 작성해주세요."
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "전송 중..." : "문의하기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
