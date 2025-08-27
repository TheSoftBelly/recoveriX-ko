import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import Header from "@/components/layout/Header";
import QuestionCard from "@/components/qna/QuestionCard";
import QuestionForm from "@/components/qna/QuestionForm";
import QnaControls from "@/components/qna/QnaControls";
import styles from "@/styles/pages/QnAPage.module.scss";

// Define props for the page, including search params for filtering and pagination
interface QnAPageProps {
  searchParams: {
    q?: string;
    filter?: "all" | "pending" | "answered";
    page?: string;
  };
}

const ITEMS_PER_PAGE = 10;

const QnAPage: React.FC<QnAPageProps> = async ({ searchParams }) => {
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

  const { q, filter: searchFilter, page } = searchParams;
  const searchQuery = q || "";
  const filter = searchFilter || "all";
  const currentPage = parseInt(page || "1", 10);

  // Build the query to fetch questions
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
      qna_comments ( count )
    `,
    { count: "exact" }
  );

  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  // Add pagination
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;
  query = query.range(start, end).order("created_at", { ascending: false });

  const { data: questions, error, count } = await query;

  if (error) {
    console.error("Error fetching questions:", error);
    // You could render a proper error component here
    return <p>Error loading questions.</p>;
  }

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.qnaMain}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>QnA 게시판</h1>
          <p className={styles.pageDescription}>
            궁금한 것이 있으시면 언제든지 질문해 주세요! 전문가들이 빠르게
            답변드립니다.
          </p>
        </div>

        {user && <QuestionForm />}

        <QnaControls />

        <section className={styles.questionList}>
          {questions &&
            questions.map((q: any) => {
              // Adapt the fetched data to match QuestionCardProps
              const questionForCard = {
                id: q.id,
                title: q.title,
                content: q.content,
                author_id: q.author_id,
                author_name: q.users?.name || "익명",
                is_private: q.is_private,
                status: q.status as "pending" | "answered",
                views: q.views,
                created_at: q.created_at,
                comment_count: q.qna_comments[0]?.count || 0,
              };
              const currentUserForCard = user
                ? {
                    id: user.id,
                    role: user.user_metadata.role as "user" | "admin",
                  }
                : null;

              return (
                <QuestionCard
                  key={q.id}
                  question={questionForCard}
                  currentUser={currentUserForCard}
                />
              );
            })}
        </section>

        {/* Pagination controls */}
        <section className={styles.pagination}>
          {currentPage > 1 && (
            <Link
              href={`/qna?page=${
                currentPage - 1
              }&filter=${filter}&q=${searchQuery}`}
            >
              <button className={styles.pageButton}>‹</button>
            </Link>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <Link
              key={i}
              href={`/qna?page=${i + 1}&filter=${filter}&q=${searchQuery}`}
            >
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
            <Link
              href={`/qna?page=${
                currentPage + 1
              }&filter=${filter}&q=${searchQuery}`}
            >
              <button className={styles.pageButton}>›</button>
            </Link>
          )}
        </section>
      </main>
    </div>
  );
};

export default QnAPage;
