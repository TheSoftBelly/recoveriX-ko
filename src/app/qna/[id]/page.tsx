"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import styles from "@/styles/pages/QuestionDetailPage.module.scss";

interface Answer {
  id: number;
  content: string;
  author: {
    name: string;
    role: "admin" | "user";
    avatar?: string;
  };
  createdAt: string;
}

interface QuestionDetail {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  status: "pending" | "answered";
  isPrivate: boolean;
  answers: Answer[];
}

const mockQuestion: QuestionDetail = {
  id: 1,
  title: "recoveriX 치료 중 주의사항이 있나요?",
  content: `치료를 받기 전에 미리 알아둬야 할 주의사항이나 준비사항이 있다면 알려주세요. 특히 치료 전후로 피해야 할 행동이나 음식, 약물 등이 있는지 궁금합니다. 또한 치료 중에 느낄 수 있는 일반적인 증상들도 미리 알고 싶습니다.`,
  author: "김환자",
  createdAt: "2024년 1월 15일 14:30",
  views: 23,
  status: "answered",
  isPrivate: false,
  answers: [
    {
      id: 1,
      content: `안녕하세요! recoveriX 치료에 대한 주의사항을 안내드리겠습니다.

**치료 전 준비사항:**
• 금속 임플란트나 심박조율기가 있는 경우 반드시 사전에 알려주세요
• 치료 당일 알코올 섭취는 피해주세요
• 편안한 복장을 착용해 주세요

**치료 중 주의사항:**
• 전기 자극 중 불편함을 느끼시면 즉시 알려주세요
• 치료 중에는 움직임을 최소화해 주세요
• 집중력을 유지하며 화면의 지시에 따라 주세요

**치료 후 관리:**
• 치료 직후 충분한 수분 섭취를 권장합니다
• 당일 격한 운동은 피해주세요
• 일반적으로 특별한 부작용은 없지만, 이상 증상 시 연락주세요

더 궁금한 점이 있으시면 언제든 문의해 주세요!`,
      author: {
        name: "Dr. recoveriX 전문의",
        role: "admin",
      },
      createdAt: "2024년 1월 16일 09:15에 답변",
    },
  ],
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function QuestionDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [answerContent, setAnswerContent] = useState("");
  const [questionId, setQuestionId] = useState<string>("");

  // Next.js 15에서 params가 Promise이므로 useEffect에서 처리
  React.useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setQuestionId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    // 답변 등록 로직
    console.log("New answer:", answerContent, "for question:", questionId);
    setAnswerContent("");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.pageContainer}>
      <Header user={null} />
      
      <main className={styles.detailMain}>
        {/* 상세페이지 헤더 */}
        <div className={styles.detailHeader}>
          <button onClick={handleGoBack} className={styles.backButton}>
            ←
          </button>
          <h1 className={styles.pageTitle}>질문 상세보기</h1>
        </div>

        {/* 질문 상세 내용 */}
        <section className={styles.questionDetail}>
          <div className={styles.questionHeader}>
            <h2 className={styles.questionTitle}>{mockQuestion.title}</h2>
            <div
              className={`${styles.statusBadge} ${
                mockQuestion.status === "answered" ? styles.answered : styles.pending
              }`}
            >
              {mockQuestion.status === "answered" ? "답변완료" : "답변대기"}
            </div>
          </div>
          
          <p className={styles.questionContent}>{mockQuestion.content}</p>
          
          <div className={styles.questionMeta}>
            <span className={styles.author}>👤 작성자: {mockQuestion.author}</span>
            <span className={styles.date}>📅 작성일: {mockQuestion.createdAt}</span>
            <span className={styles.views}>👁️ 조회수: {mockQuestion.views}회</span>
          </div>
        </section>

        {/* 답변 섹션 */}
        {mockQuestion.answers.length > 0 && (
          <section className={styles.answersSection}>
            <div className={styles.answersHeader}>
              <span className={styles.answersIcon}>💬</span>
              <h3 className={styles.answersTitle}>답변</h3>
              <div className={styles.answerCount}>{mockQuestion.answers.length}</div>
            </div>

            {/* 답변 목록 */}
            <div className={styles.answersList}>
              {mockQuestion.answers.map((answer) => (
                <div key={answer.id} className={styles.answerCard}>
                  <div className={styles.answerHeader}>
                    <div className={styles.authorInfo}>
                      <div className={styles.authorAvatar}>👨‍⚕️</div>
                      <div className={styles.authorDetails}>
                        <div className={styles.authorNameLine}>
                          <span className={styles.authorName}>{answer.author.name}</span>
                          {answer.author.role === "admin" && (
                            <span className={styles.adminBadge}>관리자</span>
                          )}
                        </div>
                        <span className={styles.answerTime}>{answer.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.answerContent}>
                    {answer.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 답변 작성 영역 */}
        <section className={styles.answerForm}>
          <h3 className={styles.formTitle}>✍️ 답변 작성하기</h3>
          
          <form onSubmit={handleSubmitAnswer}>
            <div className={styles.inputGroup}>
              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="답변을 입력해주세요..."
                className={styles.answerInput}
                rows={6}
                required
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              답변 등록
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
