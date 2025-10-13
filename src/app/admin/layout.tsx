"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Database,
  Bell,
  Menu,
  X,
} from "lucide-react";
import styles from "@/styles/pages/AdminLayout.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>로딩 중...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const menuItems = [
    {
      name: "대시보드",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Q&A 관리",
      href: "/admin/qna",
      icon: MessageSquare,
    },
    {
      name: "사용자 관리",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "데이터베이스",
      href: "/admin/database",
      icon: Database,
    },
    {
      name: "알림",
      href: "/admin/notifications",
      icon: Bell,
    },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          {sidebarOpen && (
            <h1 className={styles.sidebarTitle}>Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={styles.toggleButton}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navItem}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.navItem}>
            <span>←</span>
            {sidebarOpen && <span>사이트로 돌아가기</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
    </div>
  );
}
