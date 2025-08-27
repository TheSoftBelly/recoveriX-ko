"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/pages/QnAPage.module.scss";

export default function QnaControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString());

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }

    params.set("page", "1"); // Reset to first page on new search
    router.push(`/qna?${params.toString()}`);
  };

  const handleFilterChange = (filter: "all" | "pending" | "answered") => {
    const params = new URLSearchParams(searchParams?.toString());

    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    params.set("page", "1"); // Reset to first page on filter change
    router.push(`/qna?${params.toString()}`);
  };

  const currentFilter = searchParams?.get("filter") || "all";

  return (
    <section className={styles.searchAndFilter}>
      <form onSubmit={handleSearch} className={styles.searchBox}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="질문 검색..."
          className={styles.searchInput}
        />
        {/* Hidden submit button to allow enter key submission */}
        <button type="submit" style={{ display: "none" }} />
      </form>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${
            currentFilter === "all" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("all")}
        >
          전체
        </button>
        <button
          className={`${styles.filterButton} ${
            currentFilter === "pending" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("pending")}
        >
          답변대기
        </button>
        <button
          className={`${styles.filterButton} ${
            currentFilter === "answered" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("answered")}
        >
          답변완료
        </button>
      </div>
    </section>
  );
}
