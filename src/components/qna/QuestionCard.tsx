"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import styles from "@/styles/pages/QnAPage.module.scss";

interface QuestionCardProps {
  question: {
    id: number;
    title: string;
    content: string;
    author_id: string;
    author_name: string;
    is_private: boolean;
    status: "pending" | "answered";
    views: number;
    created_at: string;
    comment_count: number;
  };
  currentUser?: {
    id: string;
    role: "user" | "admin";
  } | null;
}

export default function QuestionCard({
  question,
  currentUser,
}: QuestionCardProps) {
  const isPrivate = question.is_private;
  const canViewPrivate =
    currentUser &&
    (currentUser.id === question.author_id || currentUser.role === "admin");

  const shouldShowContent = !isPrivate || canViewPrivate;

  return (
    <div
      className={`${styles.questionCard} ${
        isPrivate ? styles.privateCard : ""
      }`}
    >
      <div className={styles.questionHeader}>
        <div className={styles.questionTitleArea}>
          {isPrivate && <span className={styles.privateIcon}>🔒</span>}
          <h3 className={styles.questionTitle}>
            <Link href={`/qna/${question.id}`}>
              {shouldShowContent
                ? question.title
                : "비밀글입니다 (관리자만 열람 가능)"}
            </Link>
          </h3>
        </div>
        <div
          className={`${styles.statusBadge} ${
            question.status === "answered" ? styles.answered : styles.pending
          } ${isPrivate ? styles.privateBadge : ""}`}
        >
          {isPrivate
            ? "비밀글"
            : question.status === "answered"
            ? "답변완료"
            : "답변대기"}
        </div>
      </div>

      <p className={styles.questionContent}>
        {shouldShowContent
          ? question.content
          : "이 질문은 작성자와 관리자만 볼 수 있습니다."}
      </p>

      <div className={styles.questionMeta}>
        <span className={styles.author}>
          작성자: {shouldShowContent ? question.author_name : "익명"}
        </span>
        <span className={styles.date}>
          작성일:{" "}
          {formatDistanceToNow(new Date(question.created_at), {
            addSuffix: true,
            locale: ko,
          })}
        </span>
        <span className={styles.views}>
          조회수: {question.views}
          {question.comment_count > 0 && ` | 답변: ${question.comment_count}개`}
        </span>
      </div>
    </div>
  );
}
