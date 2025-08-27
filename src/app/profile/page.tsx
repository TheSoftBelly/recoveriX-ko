// /app/profile/page.tsx
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";
import styles from "@/styles/pages/ProfilePage.module.scss";
import Header from "@/components/layout/Header";

const ProfilePage: React.FC = async () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    console.error("Error fetching profile:", error);
    return (
      <div className={styles.profileContainer}>
        <Header />
        <h1 className={styles.title}>프로필 정보</h1>
        <p className={styles.error}>
          프로필 정보를 불러올 수 없습니다. 다시 로그인해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <h1 className={styles.title}>프로필 정보</h1>
      <ProfileForm profile={profile} />
    </div>
  );
};

export default ProfilePage;
