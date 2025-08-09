import { createSupabaseServerClient } from '@/lib/supabase'
import Header from '@/components/layout/Header'
import Link from 'next/link'
import { ArrowRight, Brain, Users, Award, MessageCircle } from 'lucide-react'

export default async function HomePage() {
  const supabase = createSupabaseServerClient()
  
  // 현재 사용자 정보 가져오기
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let user = null
  if (session?.user) {
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()
    user = userData
  }

  // 최근 QnA 게시글 가져오기
  const { data: recentQuestions } = await supabase
    .from('qna_posts')
    .select(`
      id,
      title,
      status,
      created_at,
      is_private,
      users:author_id (name)
    `)
    .eq('is_private', false) // 공개글만
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              recoveriX와 함께<br />
              <span className="text-emerald-200">새로운 회복의 길</span>을 걸어보세요
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              recoveriX는 완전히 새롭고 혁신적인 치료법입니다. 
              뇌-컴퓨터 인터페이스 기술을 통해 재활의 새로운 가능성을 제시합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/qna"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center"
              >
                질문하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                더 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 특징 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 recoveriX인가요?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              혁신적인 기술과 입증된 효과로 재활치료의 새로운 표준을 제시합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">혁신적인 기술</h3>
              <p className="text-gray-600">
                뇌-컴퓨터 인터페이스(BCI) 기술을 활용한 
                차세대 재활치료 시스템
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">입증된 효과</h3>
              <p className="text-gray-600">
                임상시험을 통해 검증된 안전하고 
                효과적인 치료 결과
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">전문가 지원</h3>
              <p className="text-gray-600">
                숙련된 의료진과 함께하는 
                체계적이고 개인화된 치료 과정
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 최근 QnA 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">최근 질문과 답변</h2>
              <p className="text-gray-600">사용자들의 궁금증을 확인해보세요</p>
            </div>
            <Link
              href="/qna"
              className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center"
            >
              전체보기
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {recentQuestions && recentQuestions.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recentQuestions.map((question) => (
                <Link
                  key={question.id}
                  href={`/qna/${question.id}`}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`
                      text-xs px-2 py-1 rounded-full
                      ${question.status === 'answered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }
                    `}>
                      {question.status === 'answered' ? '답변완료' : '답변대기'}
                    </span>
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {question.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {question.users?.name || '익명'} • {
                      new Date(question.created_at).toLocaleDateString('ko-KR')
                    }
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">아직 질문이 없습니다</h3>
              <p className="text-gray-600 mb-4">첫 번째 질문을 올려보세요!</p>
              <Link
                href="/qna"
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                질문하러 가기
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            recoveriX에 대해 더 궁금하신가요?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            전문가들이 여러분의 질문에 성심껏 답변해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/qna"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center justify-center"
            >
              질문하기
              <MessageCircle className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              직접 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="w-32 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded text-white flex items-center justify-center font-bold text-sm mb-4">
                recoveriX
              </div>
              <p className="text-gray-400 text-sm">
                recoveriX는 g.tec medical engineering GmbH의 제품입니다.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">회사소개</Link></li>
                <li><Link href="/results" className="hover:text-white transition-colors">치료결과</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
                <li><Link href="/qna" className="hover:text-white transition-colors">QnA 게시판</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">연락처</h3>
              <p className="text-sm text-gray-400">
                더 자세한 정보가 필요하시면<br />
                언제든지 문의해 주세요.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 recoveriX Korea. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}