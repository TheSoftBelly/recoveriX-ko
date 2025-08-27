"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages/QuestionDetailPage.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@supabase/supabase-js";

interface Answer {
  id: number;
  content: string;
  created_at: string;
  users: { name: string; role: "admin" | "user" };
}

interface QuestionDetail {
  id: number;
  title: string;
  content: string;
  created_at: string;
  views: number;
  status: "pending" | "answered";
  is_private: boolean;
  users: { name: string };
  author_id: string;
}

interface QnaDetailClientProps {
  question: QuestionDetail;
  initialAnswers: Answer[];
  currentUser: User | null;
}

export default function QnaDetailClient({
  question,
  initialAnswers,
  currentUser,
}: QnaDetailClientProps) {
  const { supabase } = useAuth();
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [answerContent, setAnswerContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const isOwner = currentUser?.id === question.author_id;
  const isAdmin = currentUser?.user_metadata?.role === "admin";
  const canViewPrivate = !question.is_private || isOwner || isAdmin;

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("답변을 작성하려면 로그인이 필요합니다.");
      return;
    }

    startTransition(async () => {
      const { data: newComment, error } = await supabase
        .from("qna_comments")
        .insert({
          post_id: question.id,
          content: answerContent,
          author_id: currentUser.id,
          is_admin: currentUser.user_metadata.role === "admin",
        })
        .select(`*, users ( name, role )`)
        .single();

      if (error) {
        console.error("Error creating answer:", error);
        alert("답변 등록에 실패했습니다.");
        return;
      }

      setAnswers((prev) => [...prev, newComment as Answer]);
      setAnswerContent("");

      if (question.status !== "answered") {
        await supabase
          .from("qna_posts")
          .update({ status: "answered" })
          .eq("id", question.id);
      }

      router.refresh();
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={styles.detailMain}>
      <div className={styles.detailHeader}>
        <button onClick={handleGoBack} className={styles.backButton}>
          ←
        </button>
        <h1 className={styles.pageTitle}>질문 상세보기</h1>
      </div>

      <section className={styles.questionDetail}>
        <div className={styles.questionHeader}>
          <h2 className={styles.questionTitle}>
            {canViewPrivate
              ? question.title
              : "비밀글입니다 (관리자만 열람 가능)"}
          </h2>
          <div
            className={`${styles.statusBadge} ${
              question.status === "answered" ? styles.answered : styles.pending
            } ${question.is_private ? styles.privateBadge : ""}`}
          >
            {question.is_private
              ? "비밀글"
              : question.status === "answered"
              ? "답변완료"
              : "답변대기"}
          </div>
        </div>

        <p className={styles.questionContent}>
          {canViewPrivate
            ? question.content
            : "이 질문은 작성자와 관리자만 볼 수 있습니다."}
        </p>

        <div className={styles.questionMeta}>
          <span className={styles.author}>
            👤 작성자: {canViewPrivate ? question.users.name : "익명"}
          </span>
          <span className={styles.date}>
            📅 작성일: {new Date(question.created_at).toLocaleString()}
          </span>
          <span className={styles.views}>👁️ 조회수: {question.views}회</span>
        </div>
      </section>

      {canViewPrivate && answers.length > 0 && (
        <section className={styles.answersSection}>
          <div className={styles.answersHeader}>
            <span className={styles.answersIcon}>💬</span>
            <h3 className={styles.answersTitle}>답변</h3>
            <div className={styles.answerCount}>{answers.length}</div>
          </div>
          <div className={styles.answersList}>
            {answers.map((answer) => (
              <div key={answer.id} className={styles.answerCard}>
                <div className={styles.answerHeader}>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>👨‍⚕️</div>
                    <div className={styles.authorDetails}>
                      <div className={styles.authorNameLine}>
                        <span className={styles.authorName}>
                          {answer.users.name}
                        </span>
                        {answer.users.role === "admin" && (
                          <span className={styles.adminBadge}>관리자</span>
                        )}
                      </div>
                      <span className={styles.answerTime}>
                        {new Date(answer.created_at).toLocaleString()}에 답변
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.answerContent}>
                  {answer.content.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {canViewPrivate && currentUser && (
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
                disabled={isPending}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPending}
            >
              {isPending ? "등록 중..." : "답변 등록"}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
