"use client";

import { useState, useTransition } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import styles from "@/styles/pages/ProfilePage.module.scss";
import { useAuth } from "@/contexts/AuthContext"; // 추가

export default function ProfileForm({ profile }: { profile: any }) {
  const supabase = createSupabaseClient();
  const { refreshUserFromDB } = useAuth();
  const [name, setName] = useState(profile.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    startTransition(async () => {
      const { error: updateError } = await supabase
        .from("users")
        .update({ name })
        .eq("id", profile.id);

      if (updateError) {
        setError("프로필 업데이트에 실패했습니다.");
        console.error(updateError);
      } else {
        const { data: updatedProfile, error: fetchError } = await supabase
          .from("users")
          .select("name")
          .eq("id", profile.id)
          .single();

        if (!fetchError && updatedProfile) {
          setName(updatedProfile.name);
          setMessage("프로필이 성공적으로 업데이트되었습니다.");
          await refreshUserFromDB();
        } else {
          setMessage("업데이트되었지만 최신 정보를 불러오지 못했습니다.");
        }
      }
    });
  };

  return (
    <form onSubmit={handleUpdateProfile} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={profile.email || ""}
          className={styles.input}
          disabled
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          이름
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
          disabled={isPending}
        />
      </div>
      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "업데이트 중..." : "프로필 업데이트"}
      </button>
      {message && (
        <p className={`${styles.message} ${styles.success}`}>{message}</p>
      )}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
    </form>
  );
}
