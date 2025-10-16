"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // ✅ AuthContext 사용
import styles from "@/styles/pages/QnAPage.module.scss"; // 스타일 재사용

const questionSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  content: z.string().min(10, "내용은 10자 이상이어야 합니다."),
  is_private: z.boolean(),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function QuestionForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { user, loading, supabase } = useAuth(); // ✅ Context에서 supabase 가져오기

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      content: "",
      is_private: true, // 기본값을 true로 변경 (비밀글만 가능)
    },
  });

  const isPrivate = watch("is_private");

  const onSubmit = async (data: QuestionFormData) => {
    console.log("폼 제출 데이터:", data);
    setIsPending(true);

    try {
      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }
      if (!supabase) {
        alert("Supabase 클라이언트가 초기화되지 않았습니다.");
        return;
      }

      const insertData = {
        title: data.title,
        content: data.content,
        is_private: data.is_private,
        author_id: user.id,
      };

      console.log("질문 등록 데이터:", insertData);

      const { data: insertedData, error } = await supabase
        .from("qna_posts")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("질문 등록 에러:", error);
        alert("질문 등록에 실패했습니다: " + error.message);
        return;
      }

      console.log("질문 등록 성공:", insertedData);
      alert("질문이 성공적으로 등록되었습니다!");
      reset();
      router.push("/qna");
    } catch (err) {
      console.error("예상치 못한 오류:", err);
      alert(
        "질문 등록 중 오류가 발생했습니다: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsPending(false);
    }
  };

  // 로딩 중이면 로딩 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <section className={styles.questionForm}>
        <p>질문을 등록하려면 로그인이 필요합니다.</p>
      </section>
    );
  }

  return (
    <section className={styles.questionForm}>
      <h2 className={styles.formTitle}>새 질문 작성</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <input
            {...register("title")}
            placeholder="질문 제목을 입력해주세요..."
            className={styles.titleInput}
            disabled={isPending}
          />
          {errors.title && (
            <p className={styles.errorText}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="content" className={styles.inputLabel}>질문 내용</label>
          <textarea
            id="content"
            {...register("content")}
            placeholder="질문 내용을 자세히 작성해주세요..."
            className={styles.contentInput}
            rows={4}
            disabled={isPending}
          />
          {errors.content && (
            <p className={styles.errorText}>{errors.content.message}</p>
          )}
        </div>
        <div className={styles.formActions}>
          <div className={styles.privacySettings}>
            <div className={styles.privacyLabel}>
              <span className={styles.lockIcon}>🔒</span>
              <span>모든 글은 비밀글로 작성됩니다</span>
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            {isPending ? "등록 중..." : "질문 등록"}
          </button>
        </div>
      </form>
    </section>
  );
}
