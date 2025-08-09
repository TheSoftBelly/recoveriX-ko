import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import QuestionCard from "@/components/qna/QuestionCard";
import QuestionForm from "@/components/qna/QuestionForm";
import { Search, Filter } from "lucide-react";

export const metadata = {
  title: "QnA 게시판 | recoveriX",
  description: "recoveriX 관련 질문과 답변을 확인하세요",
};

export default async function QnAPage({
  searchParams,
}: {
  searchParams: { filter?: string; search?: string };
}) {
  const supabase = createSupabaseServerClient();

  // 현재 사용자 정보 가져오기
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let user = null;
  if (session?.user) {
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();
    user = userData;
  }

  // 필터 및 검색 조건 설정
  const filter = searchParams.filter || "all";
  const searchQuery = searchParams.search || "";

  // 질문 목록 쿼리 구성
  let query = supabase.from("qna_posts").select(`
      *,
      users:author_id (name),
      qna_comments (count)
    `);

  // 비밀글 필터링 (권한에 따라)
  if (!user || user.role !== "admin") {
    query = query.or(`is_private.eq.false,author_id.eq.${user?.id || "null"}`);
  }

  // 상태 필터
  if (filter === "pending") {
    query = query.eq("status", "pending");
  } else if (filter === "answered") {
    query = query.eq("status", "answered");
  }

  // 검색
  if (searchQuery) {
    query = query.or(
      `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`
    );
  }

  // 정렬
  query = query.order("created_at", { ascending: false });

  const { data: questions, error } = await query;

  if (error) {
    console.error("질문 목록 조회 실패:", error);
    return <div>질문 목록을 불러오는데 실패했습니다.</div>;
  }

  // 댓글 개수 계산을 위한 데이터 가공
  const questionsWithCommentCount =
    questions?.map((question) => ({
      ...question,
      author_name: question.users?.name || "익명",
      comment_count: question.qna_comments?.[0]?.count || 0,
    })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QnA 게시판</h1>
          <p className="text-gray-600">
            궁금한 것이 있으시면 언제든지 질문해 주세요! 전문가들이 빠르게
            답변드립니다.
          </p>
        </div>

        {/* 질문 작성 폼 (로그인 사용자만) */}
        {user && (
          <div className="mb-8">
            <QuestionForm user={user} />
          </div>
        )}

        {/* 검색 및 필터 */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* 검색 박스 */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="질문 검색..."
              defaultValue={searchQuery}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* 필터 버튼들 */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              <a
                href="/qna"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                전체
              </a>
              <a
                href="/qna?filter=pending"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                답변대기
              </a>
              <a
                href="/qna?filter=answered"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filter === "answered"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                답변완료
              </a>
            </div>
          </div>
        </div>

        {/* 질문 목록 */}
        <div className="space-y-4">
          {questionsWithCommentCount.length > 0 ? (
            questionsWithCommentCount.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                currentUser={user}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                {searchQuery
                  ? "검색 결과가 없습니다."
                  : "아직 질문이 없습니다."}
              </div>
              {!user && (
                <p className="text-sm text-gray-400 mb-4">
                  질문을 작성하려면 로그인이 필요합니다.
                </p>
              )}
              {searchQuery && (
                <a
                  href="/qna"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  전체 목록 보기
                </a>
              )}
            </div>
          )}
        </div>

        {/* 로그인 안내 (비로그인 사용자) */}
        {!user && (
          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-emerald-800 mb-2">
              질문을 작성하고 싶으신가요?
            </h3>
            <p className="text-emerald-600 mb-4">
              로그인하시면 질문을 작성하고 전문가의 답변을 받을 수 있습니다.
            </p>
            <div className="space-x-3">
              <a
                href="/login"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="bg-white text-emerald-600 px-4 py-2 rounded-md text-sm font-medium border border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                회원가입
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
