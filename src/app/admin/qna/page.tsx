"use client";

import QnaTable from "@/components/admin/QnaTable";
import styles from "@/styles/pages/AdminQna.module.scss";

export default function AdminQnaPage() {
  return (
    <div className={styles.qnaPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Q&A 관리</h1>
      </div>
      <QnaTable />
    </div>
  );
}
