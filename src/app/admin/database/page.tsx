"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Database as DatabaseIcon, RefreshCw } from "lucide-react";
import styles from "@/styles/pages/AdminDatabase.module.scss";

type TableName = "users" | "qna_posts" | "qna_comments" | "notices" | "audit_logs";

export default function AdminDatabasePage() {
  const { supabase } = useAuth();
  const [selectedTable, setSelectedTable] = useState<TableName>("users");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);

  const tables: Array<{ name: TableName; label: string }> = [
    { name: "users", label: "사용자" },
    { name: "qna_posts", label: "Q&A 게시글" },
    { name: "qna_comments", label: "Q&A 댓글" },
    { name: "notices", label: "공지사항" },
    { name: "audit_logs", label: "감사 로그" },
  ];

  useEffect(() => {
    loadTableData();
  }, [selectedTable]);

  const loadTableData = async () => {
    try {
      setLoading(true);
      const { data: tableData, error } = await supabase
        .from(selectedTable)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      if (tableData && tableData.length > 0) {
        setColumns(Object.keys(tableData[0]));
        setData(tableData);
      } else {
        setColumns([]);
        setData([]);
      }
    } catch (error) {
      console.error("Error loading table data:", error);
      setData([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "✓" : "✗";
    if (typeof value === "object") return JSON.stringify(value);
    if (typeof value === "string" && value.length > 50) {
      return value.substring(0, 50) + "...";
    }
    return String(value);
  };

  return (
    <div className={styles.databasePage}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <DatabaseIcon size={32} className={styles.titleIcon} />
          <h1 className={styles.title}>데이터베이스 뷰어</h1>
        </div>
        <button
          onClick={loadTableData}
          disabled={loading}
          className={styles.refreshButton}
        >
          <RefreshCw size={16} className={loading ? styles.spinning : ""} />
          새로고침
        </button>
      </div>

      <div className={styles.warningBanner}>
        <p className={styles.warningText}>
          ⚠️ 주의: 이 페이지는 데이터베이스를 직접 조회합니다. 민감한 정보가
          포함될 수 있으니 주의하세요.
        </p>
      </div>

      {/* Table Selector */}
      <div className={styles.tableTabs}>
        {tables.map((table) => (
          <button
            key={table.name}
            onClick={() => setSelectedTable(table.name)}
            className={`${styles.tableTab} ${
              selectedTable === table.name ? styles.active : ""
            }`}
          >
            {table.label}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className={styles.dataTableContainer}>
        {loading ? (
          <div className={styles.loadingState}>데이터 로딩 중...</div>
        ) : data.length === 0 ? (
          <div className={styles.emptyState}>데이터가 없습니다.</div>
        ) : (
          <div className={styles.scrollContainer}>
            <table className={styles.dataTable}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableHeadRow}>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {data.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column}>{formatValue(row[column])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.summary}>
        총 {data.length}개의 레코드 (최대 100개까지 표시)
      </div>
    </div>
  );
}
