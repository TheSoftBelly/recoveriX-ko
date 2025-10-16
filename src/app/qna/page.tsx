import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuestionCard from "@/components/qna/QuestionCard";
import QuestionForm from "@/components/qna/QuestionForm";
import QnaControls from "@/components/qna/QnaControls";
import styles from "@/styles/pages/QnAPage.module.scss";

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

const ITEMS_PER_PAGE = 10;
export const runtime = "nodejs"; // Supabase Node API 사용
export const dynamic = "force-dynamic"; // searchParams 관련 타입 충돌 방지

const QnAPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const q = (searchParams?.q as string) ?? "";
  const filter =
    searchParams?.filter === "pending" || searchParams?.filter === "answered"
      ? searchParams.filter
      : "all";
  const currentPage = parseInt((searchParams?.page as string) ?? "1", 10);

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase.from("qna_posts").select(
    `
      id,
      title,
      content,
      author_id,
      created_at,
      views,
      status,
      is_private,
      users ( name ),
      qna_comments ( id )
    `,
    { count: "exact" }
  );

  if (filter !== "all") query = query.eq("status", filter);
  if (q) query = query.ilike("title", `%${q}%`);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;
  query = query.range(start, end).order("created_at", { ascending: false });

  const { data: questions, error, count } = await query;

  if (error) {
    console.error("QnA 페이지 로딩 에러:", error);
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.qnaMain}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>QnA 게시판</h1>
            <p className={styles.pageDescription} style={{ color: "red" }}>
              게시글을 불러오는 중 오류가 발생했습니다: {error.message}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.qnaMain}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>QnA 게시판</h1>
          <p className={styles.pageDescription}>
            궁금한 것이 있으시면 언제든지 질문해 주세요!
          </p>
        </div>

        {user ? (
          <QuestionForm />
        ) : (
          <div className={styles.loginPrompt}>
            <p className={styles.loginPromptText}>
              질문을 등록하려면 로그인이 필요합니다.
            </p>
            <Link href="/login" className={styles.loginPromptButton}>
              로그인하기
            </Link>
          </div>
        )}
        <QnaControls />

        <section className={styles.questionList}>
          {questions?.map((q: any) => (
            <QuestionCard
              key={q.id}
              question={{
                id: q.id,
                title: q.title,
                content: q.content,
                author_id: q.author_id,
                author_name: q.users?.name || "익명",
                is_private: q.is_private,
                status: q.status,
                views: q.views,
                created_at: q.created_at,
                comment_count: q.qna_comments?.length || 0,
              }}
              currentUser={
                user
                  ? {
                      id: user.id,
                      role: user.user_metadata.role as "user" | "admin",
                    }
                  : null
              }
            />
          ))}
        </section>

        <section className={styles.pagination}>
          {currentPage > 1 && (
            <Link href={`/qna?page=${currentPage - 1}&filter=${filter}&q=${q}`}>
              <button className={styles.pageButton}>‹</button>
            </Link>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <Link key={i} href={`/qna?page=${i + 1}&filter=${filter}&q=${q}`}>
              <button
                className={`${styles.pageButton} ${
                  currentPage === i + 1 ? styles.activePage : ""
                }`}
              >
                {i + 1}
              </button>
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link href={`/qna?page=${currentPage + 1}&filter=${filter}&q=${q}`}>
              <button className={styles.pageButton}>›</button>
            </Link>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QnAPage;
