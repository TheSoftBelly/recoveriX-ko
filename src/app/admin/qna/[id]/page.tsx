"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ReplyEditor from "@/components/admin/ReplyEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/pages/AdminQnaDetail.module.scss";

interface QnaPost {
  id: number;
  title: string;
  content: string;
  is_private: boolean;
  is_answered: boolean;
  priority: "low" | "normal" | "high";
  created_at: string;
  author_id: string;
  users: {
    name: string;
    email: string;
  };
}

interface Comment {
  id: number;
  content: string;
  is_admin_reply: boolean;
  created_at: string;
  author_id: string;
  users: {
    name: string;
  };
}

export default function AdminQnaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { supabase } = useAuth();
  const [post, setPost] = useState<QnaPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");

  const postId = Number(params?.id);

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from("qna_posts")
        .select(
          `
          *,
          users (name, email)
        `
        )
        .eq("id", postId)
        .single();

      if (error) throw error;
      setPost(data);
      setPriority(data.priority || "normal");
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from("qna_comments")
        .select(
          `
          *,
          users (name)
        `
        )
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handlePriorityChange = async (
    newPriority: "low" | "normal" | "high"
  ) => {
    try {
      const { error } = await supabase
        .from("qna_posts")
        .update({ priority: newPriority })
        .eq("id", postId);

      if (error) throw error;
      setPriority(newPriority);
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const handleReplySubmitted = () => {
    loadPost();
    loadComments();
  };

  if (loading) {
    return <div className={styles.loadingState}>로딩 중...</div>;
  }

  if (!post) {
    return <div className={styles.notFoundState}>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.detailPage}>
      <Link href="/admin/qna" className={styles.backLink}>
        <ArrowLeft size={20} />
        Q&A 목록으로 돌아가기
      </Link>

      <div className={styles.postCard}>
        <div className={styles.postHeader}>
          <div className={styles.postHeaderContent}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.postMeta}>
              <span>작성자: {post.users?.name}</span>
              <span>
                작성일: {new Date(post.created_at).toLocaleDateString("ko-KR")}
              </span>
              {post.is_private && (
                <span className={styles.privateBadge}>비공개</span>
              )}
            </div>
          </div>

          <div className={styles.priorityControl}>
            <label className={styles.priorityLabel}>우선순위:</label>
            <select
              value={priority}
              onChange={(e) =>
                handlePriorityChange(
                  e.target.value as "low" | "normal" | "high"
                )
              }
              className={styles.prioritySelect}
            >
              <option value="low">낮음</option>
              <option value="normal">보통</option>
              <option value="high">높음</option>
            </select>
          </div>
        </div>

        <div className={styles.postContent}>
          <p>{post.content}</p>
        </div>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className={styles.commentsCard}>
          <h2 className={styles.commentsTitle}>답변</h2>
          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`${styles.commentItem} ${
                  comment.is_admin_reply ? styles.adminReply : styles.userComment
                }`}
              >
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{comment.users?.name}</span>
                  {comment.is_admin_reply && (
                    <span className={styles.adminBadge}>관리자</span>
                  )}
                  <span className={styles.commentDate}>
                    {new Date(comment.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <div className={styles.commentContent}>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply Editor */}
      {!post.is_answered && (
        <div className={styles.replyCard}>
          <h2 className={styles.replyTitle}>답변 작성</h2>
          <ReplyEditor
            postId={postId}
            onReplySubmitted={handleReplySubmitted}
          />
        </div>
      )}
    </div>
  );
}
