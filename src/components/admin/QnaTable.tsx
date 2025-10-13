"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import styles from "@/styles/pages/AdminQna.module.scss";

interface QnaPost {
  id: number;
  title: string;
  author_id: string;
  is_private: boolean;
  is_answered: boolean;
  priority: "low" | "normal" | "high";
  created_at: string;
  users: {
    name: string;
    email: string;
  };
}

export default function QnaTable() {
  const { supabase } = useAuth();
  const [posts, setPosts] = useState<QnaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unanswered" | "answered">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPosts();
  }, [filter]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("qna_posts")
        .select(
          `
          *,
          users (name, email)
        `
        )
        .order("created_at", { ascending: false });

      if (filter === "unanswered") {
        query = query.eq("is_answered", false);
      } else if (filter === "answered") {
        query = query.eq("is_answered", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "높음";
      case "normal":
        return "보통";
      case "low":
        return "낮음";
      default:
        return "보통";
    }
  };

  return (
    <>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterButtons}>
          <button
            onClick={() => setFilter("all")}
            className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter("unanswered")}
            className={`${styles.filterButton} ${filter === "unanswered" ? styles.active : ""}`}
          >
            미답변
          </button>
          <button
            onClick={() => setFilter("answered")}
            className={`${styles.filterButton} ${filter === "answered" ? styles.active : ""}`}
          >
            답변완료
          </button>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="제목 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>로딩 중...</div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.emptyState}>게시물이 없습니다.</div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableHeadRow}>
                <th>제목</th>
                <th>작성자</th>
                <th>우선순위</th>
                <th>상태</th>
                <th>작성일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className={styles.titleCell}>
                      {post.title}
                      {post.is_private && (
                        <span className={styles.privateBadge}>비공개</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.authorCell}>
                    {post.users?.name || "알 수 없음"}
                  </td>
                  <td>
                    <span className={`${styles.priorityBadge} ${styles[post.priority]}`}>
                      {getPriorityLabel(post.priority)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        post.is_answered ? styles.answered : styles.unanswered
                      }`}
                    >
                      {post.is_answered ? "답변완료" : "미답변"}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </td>
                  <td>
                    <Link href={`/admin/qna/${post.id}`} className={styles.actionLink}>
                      보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
