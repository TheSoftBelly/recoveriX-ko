// /app/qna/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import styles from "@/styles/pages/QuestionDetailPage.module.scss";
import { createSupabaseClient } from "@/lib/supabase";
import QnaDetailClient from "@/components/qna/QnaDetailClient";

interface QuestionType {
  id: number;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  is_private: boolean;
  status: "pending" | "answered";
  views: number;
  created_at: string;
  users: { name: string }; // Add users property
}

interface AnswerType {
  id: number;
  post_id: number;
  content: string;
  author_id: string;
  author_name: string;
  is_admin: boolean;
  created_at: string;
}

export default function QuestionDetailPage() {
  const { id } = useParams(); // URL에서 question id 추출
  const supabase = createSupabaseClient();

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 현재 로그인한 사용자 정보 가져오기
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUser(user);

        // 질문 조회 및 조회수 증가
        if (id) {
          await supabase.rpc("increment_views", { post_id: parseInt(id) });

          const { data: questionData, error: qError } = await supabase
            .from("qna_posts")
            .select("*, users(name)")
            .eq("id", id)
            .single();

          if (qError || !questionData) {
            console.error("질문 가져오기 실패:", qError);
            setQuestion(null);
            return;
          }

          // 비밀글이면 작성자 또는 관리자만 접근 가능
          if (
            questionData.is_private &&
            !(
              user?.id === questionData.author_id ||
              user?.user_metadata?.role === "admin"
            )
          ) {
            setQuestion(null);
            return;
          }

          setQuestion({
            ...questionData,
            author_name: questionData.users?.name || "익명",
          });

          // 답변 가져오기
          const { data: answerData, error: aError } = await supabase
            .from("qna_comments")
            .select("*, users(name, role)")
            .eq("post_id", id)
            .order("created_at", { ascending: true });

          if (aError) {
            console.error("답변 가져오기 실패:", aError);
            setAnswers([]);
          } else {
            const formattedAnswers = (answerData || []).map((a: any) => ({
              ...a,
              author_name: a.users?.name || "익명",
            }));
            setAnswers(formattedAnswers);
          }
        }
      } catch (err) {
        console.error("데이터 fetching 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, supabase]);

  if (loading) return <div className={styles.pageContainer}>로딩 중...</div>;
  if (!question)
    return <div className={styles.pageContainer}>질문을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <QnaDetailClient
        question={question}
        initialAnswers={answers}
        currentUser={currentUser}
      />
    </div>
  );
}
