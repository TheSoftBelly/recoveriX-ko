"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Users as UsersIcon, Search, Shield, User } from "lucide-react";
import styles from "@/styles/pages/AdminUsers.module.scss";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

export default function AdminUsersPage() {
  const { supabase, user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");

  useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: "user" | "admin") => {
    if (userId === currentUser?.id) {
      alert("자신의 역할은 변경할 수 없습니다.");
      return;
    }

    if (!confirm(`정말로 이 사용자의 역할을 ${newRole === "admin" ? "관리자" : "일반 사용자"}로 변경하시겠습니까?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      // Audit log 기록
      await supabase.from("audit_logs").insert({
        actor_id: currentUser!.id,
        action: "role_changed",
        target_table: "users",
        target_id: userId,
        meta: {
          new_role: newRole,
        },
      });

      loadUsers();
      alert("역할이 변경되었습니다.");
    } catch (error) {
      console.error("Error changing role:", error);
      alert("역할 변경 중 오류가 발생했습니다.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loadingState}>로딩 중...</div>;
  }

  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <UsersIcon size={32} className={styles.titleIcon} />
          <h1 className={styles.title}>사용자 관리</h1>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterButtons}>
          <button
            onClick={() => setRoleFilter("all")}
            className={`${styles.filterButton} ${roleFilter === "all" ? styles.active : ""}`}
          >
            전체
          </button>
          <button
            onClick={() => setRoleFilter("admin")}
            className={`${styles.filterButton} ${roleFilter === "admin" ? styles.active : ""}`}
          >
            관리자
          </button>
          <button
            onClick={() => setRoleFilter("user")}
            className={`${styles.filterButton} ${roleFilter === "user" ? styles.active : ""}`}
          >
            일반 사용자
          </button>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="이름 또는 이메일 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className={styles.tableContainer}>
        {filteredUsers.length === 0 ? (
          <div className={styles.emptyState}>사용자가 없습니다.</div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableHeadRow}>
                <th>이름</th>
                <th>이메일</th>
                <th>역할</th>
                <th>가입일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.nameCell}>
                      {user.role === "admin" ? (
                        <Shield size={16} className={`${styles.roleIcon} ${styles.admin}`} />
                      ) : (
                        <User size={16} className={`${styles.roleIcon} ${styles.user}`} />
                      )}
                      {user.name}
                    </div>
                  </td>
                  <td className={styles.emailCell}>{user.email}</td>
                  <td>
                    <span
                      className={`${styles.roleBadge} ${
                        user.role === "admin" ? styles.admin : styles.user
                      }`}
                    >
                      {user.role === "admin" ? "관리자" : "일반 사용자"}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(user.created_at).toLocaleDateString("ko-KR")}
                  </td>
                  <td>
                    {user.id !== currentUser?.id && (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            e.target.value as "user" | "admin"
                          )
                        }
                        className={styles.roleSelect}
                      >
                        <option value="user">일반 사용자</option>
                        <option value="admin">관리자</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.summary}>총 {filteredUsers.length}명의 사용자</div>
    </div>
  );
}
