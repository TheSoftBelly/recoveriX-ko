"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import styles from "@/styles/pages/QnAPage.module.scss";

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  answers?: number;
  status: "pending" | "answered";
  isPrivate: boolean;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    title: "recoveriX 치료 중 주의사항이 있나요?",
    content:
      "치료를 받기 전에 미리 알아둬야 할 주의사항이나 준비사항이 있다면 알려주세요.",
    author: "김환자",
    createdAt: "2024.01.15",
    views: 23,
    status: "pending",
    isPrivate: false,
  },
  {
    id: 2,
    title: "치료 비용과 보험 적용 여부를 알고 싶습니다",
    content:
      "recoveriX 치료에 필요한 비용과 건강보험 적용 가능성에 대해 문의드립니다.",
    author: "박치료",
    createdAt: "2024.01.12",
    views: 156,
    answers: 2,
    status: "answered",
    isPrivate: false,
  },
  {
    id: 3,
    title: "치료 효과는 언제부터 나타나기 시작하나요?",
    content:
      "치료를 시작한 지 얼마나 지나야 개선 효과를 느낄 수 있는지 궁금합니다.",
    author: "이회복",
    createdAt: "2024.01.10",
    views: 89,
    answers: 1,
    status: "answered",
    isPrivate: false,
  },
  {
    id: 4,
    title: "비밀글입니다 (관리자만 열람 가능)",
    content: "이 질문은 작성자와 관리자만 볼 수 있습니다.",
    author: "김비밀",
    createdAt: "2024.01.14",
    views: 0,
    status: "pending",
    isPrivate: true,
  },
];

export default function QnAPage() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "answered">("all");
  // const [currentPage, setCurrentPage] = useState(1); // 추후 페이지네이션 구현 시 사용

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // 질문 등록 로직
    console.log("New question:", { questionTitle, questionContent, isPrivate });
    setQuestionTitle("");
    setQuestionContent("");
    setIsPrivate(false);
  };

  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || question.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.pageContainer}>
      <Header user={null} />

      <main className={styles.qnaMain}>
        {/* 페이지 제목 */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>QnA 게시판</h1>
          <p className={styles.pageDescription}>
            궁금한 것이 있으시면 언제든지 질문해 주세요! 전문가들이 빠르게
            답변드립니다.
          </p>
        </div>

        {/* 질문 작성 영역 */}
        <section className={styles.questionForm}>
          <h2 className={styles.formTitle}>새 질문 작성</h2>

          <form onSubmit={handleSubmitQuestion}>
            {/* 제목 입력 */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                placeholder="질문 제목을 입력해주세요..."
                className={styles.titleInput}
                required
              />
            </div>

            {/* 내용 입력 */}
            <div className={styles.inputGroup}>
              <textarea
                value={questionContent}
                onChange={(e) => setQuestionContent(e.target.value)}
                placeholder="질문 내용을 자세히 작성해주세요..."
                className={styles.contentInput}
                rows={4}
                required
              />
            </div>

            {/* 공개설정 및 등록 버튼 */}
            <div className={styles.formActions}>
              <div className={styles.privacySettings}>
                <div className={styles.privacyLabel}>
                  <span className={styles.lockIcon}>🔒</span>
                  <span>공개 설정</span>
                </div>
                <div className={styles.toggleGroup}>
                  <button
                    type="button"
                    className={`${styles.toggleButton} ${
                      !isPrivate ? styles.active : ""
                    }`}
                    onClick={() => setIsPrivate(false)}
                  >
                    공개
                  </button>
                  <button
                    type="button"
                    className={`${styles.toggleButton} ${
                      isPrivate ? styles.active : ""
                    }`}
                    onClick={() => setIsPrivate(true)}
                  >
                    비밀
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                질문 등록
              </button>
            </div>
          </form>
        </section>

        {/* 검색 및 필터 영역 */}
        <section className={styles.searchAndFilter}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질문 검색..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${
                filter === "all" ? styles.active : ""
              }`}
              onClick={() => setFilter("all")}
            >
              전체
            </button>
            <button
              className={`${styles.filterButton} ${
                filter === "pending" ? styles.active : ""
              }`}
              onClick={() => setFilter("pending")}
            >
              답변대기
            </button>
            <button
              className={`${styles.filterButton} ${
                filter === "answered" ? styles.active : ""
              }`}
              onClick={() => setFilter("answered")}
            >
              답변완료
            </button>
          </div>
        </section>

        {/* 질문 리스트 */}
        <section className={styles.questionList}>
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className={`${styles.questionCard} ${
                question.isPrivate ? styles.privateCard : ""
              }`}
            >
              <div className={styles.questionHeader}>
                <div className={styles.questionTitleArea}>
                  {question.isPrivate && (
                    <span className={styles.privateIcon}>🔒</span>
                  )}
                  <h3 className={styles.questionTitle}>
                    <Link href={`/qna/${question.id}`}>{question.title}</Link>
                  </h3>
                </div>
                <div
                  className={`${styles.statusBadge} ${
                    question.status === "answered"
                      ? styles.answered
                      : styles.pending
                  } ${question.isPrivate ? styles.privateBadge : ""}`}
                >
                  {question.isPrivate
                    ? "비밀글"
                    : question.status === "answered"
                    ? "답변완료"
                    : "답변대기"}
                </div>
              </div>

              <p className={styles.questionContent}>
                {question.isPrivate
                  ? "이 질문은 작성자와 관리자만 볼 수 있습니다."
                  : question.content}
              </p>

              <div className={styles.questionMeta}>
                <span className={styles.author}>작성자: {question.author}</span>
                <span className={styles.date}>
                  작성일: {question.createdAt}
                </span>
                <span className={styles.views}>
                  조회수: {question.views}
                  {question.answers && ` | 답변: ${question.answers}개`}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* 페이지네이션 */}
        <section className={styles.pagination}>
          <button className={styles.pageButton}>‹</button>
          <button className={`${styles.pageButton} ${styles.activePage}`}>
            1
          </button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton}>3</button>
          <button className={styles.pageButton}>›</button>
        </section>
      </main>
    </div>
  );
}
