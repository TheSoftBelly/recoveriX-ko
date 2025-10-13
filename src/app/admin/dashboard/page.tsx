"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Users, MessageSquare, AlertCircle, TrendingUp, Eye, Calendar } from "lucide-react";
import styles from "@/styles/pages/AdminDashboard.module.scss";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  unansweredQna: number;
  totalQna: number;
  todayVisitors: number;
  weeklyVisitors: number;
  recentPosts: Array<{
    id: number;
    title: string;
    created_at: string;
    is_answered: boolean;
  }>;
}

export default function AdminDashboard() {
  const { supabase } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    unansweredQna: 0,
    totalQna: 0,
    todayVisitors: 0,
    weeklyVisitors: 0,
    recentPosts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // 총 사용자 수
      const { count: totalUsers } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      // 활성 사용자 수 (최근 30일 이내 활동)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { count: activeUsers } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("created_at", thirtyDaysAgo.toISOString());

      // Q&A 통계
      const { count: totalQna } = await supabase
        .from("qna_posts")
        .select("*", { count: "exact", head: true });

      const { count: unansweredQna } = await supabase
        .from("qna_posts")
        .select("*", { count: "exact", head: true })
        .eq("is_answered", false);

      // 최근 게시물
      const { data: recentPosts } = await supabase
        .from("qna_posts")
        .select("id, title, created_at, is_answered")
        .order("created_at", { ascending: false })
        .limit(5);

      // 방문자 통계 (시뮬레이션 - 실제로는 analytics API 사용)
      const todayVisitors = Math.floor(Math.random() * 100) + 50;
      const weeklyVisitors = Math.floor(Math.random() * 500) + 300;

      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        unansweredQna: unansweredQna || 0,
        totalQna: totalQna || 0,
        todayVisitors,
        weeklyVisitors,
        recentPosts: recentPosts || [],
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>데이터 로딩 중...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: "오늘 방문자",
      value: stats.todayVisitors,
      icon: Eye,
      color: "blue",
      trend: "+12%",
    },
    {
      title: "주간 방문자",
      value: stats.weeklyVisitors,
      icon: Calendar,
      color: "cyan",
      trend: "+8%",
    },
    {
      title: "총 사용자",
      value: stats.totalUsers,
      icon: Users,
      color: "purple",
      trend: "+5%",
    },
    {
      title: "활성 사용자",
      value: stats.activeUsers,
      icon: TrendingUp,
      color: "green",
      trend: "+15%",
    },
    {
      title: "미답변 Q&A",
      value: stats.unansweredQna,
      icon: AlertCircle,
      color: "red",
      trend: "-3%",
    },
    {
      title: "총 Q&A",
      value: stats.totalQna,
      icon: MessageSquare,
      color: "orange",
      trend: "+20%",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>관리자 대시보드</h1>
        <p className={styles.subtitle}>
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
            <div className={styles.statIcon}>
              <stat.icon size={24} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>{stat.title}</p>
              <p className={styles.statValue}>{stat.value.toLocaleString()}</p>
              <span className={styles.statTrend}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>최근 Q&A 게시물</h2>
        <div className={styles.postList}>
          {stats.recentPosts.length === 0 ? (
            <p className={styles.emptyState}>게시물이 없습니다.</p>
          ) : (
            stats.recentPosts.map((post) => (
              <div key={post.id} className={styles.postItem}>
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDate}>
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <span
                  className={`${styles.postBadge} ${
                    post.is_answered ? styles.answered : styles.pending
                  }`}
                >
                  {post.is_answered ? "답변완료" : "미답변"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
