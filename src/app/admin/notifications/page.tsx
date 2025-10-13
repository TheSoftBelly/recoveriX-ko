"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";
import styles from "@/styles/pages/AdminNotifications.module.scss";

interface Notification {
  id: number;
  type: string;
  payload: any;
  is_read: boolean;
  created_at: string;
}

export default function AdminNotificationsPage() {
  const { supabase } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("unread");

  useEffect(() => {
    loadNotifications();

    // Realtime 구독 설정
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("is_read", false);

      if (error) throw error;

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    filter === "unread" ? !n.is_read : true
  );

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const getNotificationMessage = (notification: Notification) => {
    switch (notification.type) {
      case "new_qna":
        return `새로운 Q&A 게시글: ${notification.payload?.title || "제목 없음"}`;
      case "qna_unanswered":
        return `미답변 Q&A: ${notification.payload?.title || "제목 없음"}`;
      default:
        return "새로운 알림";
    }
  };

  const getNotificationLink = (notification: Notification) => {
    if (notification.type.includes("qna")) {
      return `/admin/qna/${notification.payload?.post_id || ""}`;
    }
    return "#";
  };

  if (loading) {
    return <div className={styles.loadingState}>로딩 중...</div>;
  }

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>알림</h1>
          <p className={styles.subtitle}>
            {unreadCount > 0
              ? `${unreadCount}개의 읽지 않은 알림`
              : "모든 알림을 확인했습니다"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className={styles.markAllButton}>
            모두 읽음으로 표시
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`${styles.filterButton} ${filter === "unread" ? styles.active : ""}`}
        >
          읽지 않음 ({unreadCount})
        </button>
      </div>

      <div className={styles.notificationsList}>
        {filteredNotifications.length === 0 ? (
          <div className={styles.emptyState}>알림이 없습니다.</div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationCard} ${
                !notification.is_read ? styles.unread : ""
              }`}
            >
              <div
                className={`${styles.iconContainer} ${
                  !notification.is_read ? styles.unread : styles.read
                }`}
              >
                {!notification.is_read ? (
                  <AlertCircle size={24} />
                ) : (
                  <CheckCircle size={24} />
                )}
              </div>

              <div className={styles.content}>
                <Link
                  href={getNotificationLink(notification)}
                  className={styles.messageLink}
                >
                  {getNotificationMessage(notification)}
                </Link>
                <p className={styles.timestamp}>
                  {new Date(notification.created_at).toLocaleString("ko-KR")}
                </p>
              </div>

              {!notification.is_read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className={styles.markReadButton}
                >
                  읽음으로 표시
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
