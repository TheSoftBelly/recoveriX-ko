'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Lock, Eye, MessageCircle, User } from 'lucide-react'

interface QuestionCardProps {
  question: {
    id: number
    title: string
    content: string
    author_id: string
    author_name: string
    is_private: boolean
    status: 'pending' | 'answered'
    views: number
    created_at: string
    comment_count: number
  }
  currentUser?: {
    id: string
    role: 'user' | 'admin'
  } | null
}

export default function QuestionCard({ question, currentUser }: QuestionCardProps) {
  const isPrivate = question.is_private
  const canViewPrivate = currentUser && (
    currentUser.id === question.author_id || 
    currentUser.role === 'admin'
  )
  
  const shouldShowContent = !isPrivate || canViewPrivate

  return (
    <Link href={`/qna/${question.id}`}>
      <div className={`
        bg-white border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer
        ${isPrivate ? 'bg-orange-50 border-orange-200' : 'border-gray-200 hover:border-emerald-200'}
      `}>
        {/* 질문 헤더 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 flex-1">
            {isPrivate && (
              <Lock className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
            )}
            <h3 className={`
              text-lg font-semibold line-clamp-2
              ${shouldShowContent ? 'text-gray-900' : 'text-orange-700'}
            `}>
              {shouldShowContent ? question.title : '비밀글입니다 (관리자만 열람 가능)'}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            {isPrivate && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                비밀글
              </span>
            )}
            <span className={`
              text-xs px-2 py-1 rounded-full whitespace-nowrap
              ${question.status === 'answered' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-yellow-100 text-yellow-800'
              }
            `}>
              {question.status === 'answered' ? '답변완료' : '답변대기'}
            </span>
          </div>
        </div>

        {/* 질문 내용 */}
        <p className={`
          text-gray-600 line-clamp-2 mb-4
          ${!shouldShowContent ? 'text-orange-600' : ''}
        `}>
          {shouldShowContent 
            ? question.content 
            : '이 질문은 작성자와 관리자만 볼 수 있습니다.'
          }
        </p>

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{shouldShowContent ? question.author_name : '익명'}</span>
            </div>
            <span>
              {formatDistanceToNow(new Date(question.created_at), { 
                addSuffix: true, 
                locale: ko 
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{question.views}</span>
            </div>
            {question.comment_count > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{question.comment_count}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
