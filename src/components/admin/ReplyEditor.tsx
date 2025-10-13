"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/components/ReplyEditor.module.scss";

interface ReplyEditorProps {
  postId: number;
  onReplySubmitted: () => void;
}

export default function ReplyEditor({
  postId,
  onReplySubmitted,
}: ReplyEditorProps) {
  const { user, supabase } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // 답변 작성
      const { error: commentError } = await supabase
        .from("qna_comments")
        .insert({
          post_id: postId,
          content: content.trim(),
          author_id: user!.id,
          is_admin: true,
          is_admin_reply: true,
          published_at: new Date().toISOString(),
        });

      if (commentError) throw commentError;

      // 게시물 상태 업데이트 (답변완료로 변경)
      const { error: updateError } = await supabase
        .from("qna_posts")
        .update({
          is_answered: true,
          status: "answered",
        })
        .eq("id", postId);

      if (updateError) throw updateError;

      // Audit log 기록
      await supabase.from("audit_logs").insert({
        actor_id: user!.id,
        action: "reply_created",
        target_table: "qna_posts",
        target_id: postId.toString(),
        meta: {
          comment_content: content.trim(),
        },
      });

      setContent("");
      onReplySubmitted();
    } catch (err: any) {
      console.error("Error submitting reply:", err);
      setError("답변 작성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.replyForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>관리자 답변</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="답변을 입력하세요..."
          className={styles.textarea}
          rows={6}
          disabled={isSubmitting}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "답변 작성 중..." : "답변 작성"}
        </button>
      </div>
    </form>
  );
}
