"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Globe } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const questionSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 5자 이상 입력해주세요")
    .max(100, "제목은 100자 이하로 입력해주세요"),
  content: z
    .string()
    .min(10, "내용은 10자 이상 입력해주세요")
    .max(2000, "내용은 2000자 이하로 입력해주세요"),
  is_private: z.boolean(),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  user: {
    id: string;
    name: string;
  };
  onSuccess?: () => void;
}

export default function QuestionForm({ user, onSuccess }: QuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      is_private: false,
    },
  });

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("qna_posts").insert({
        title: data.title,
        content: data.content,
        author_id: user.id,
        is_private: data.is_private,
      });

      if (error) throw error;

      reset();
      setIsPrivate(false);
      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error("질문 등록 실패:", error);
      alert("질문 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">새 질문 작성</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 제목 입력 */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            질문 제목
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="질문 제목을 입력해주세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* 내용 입력 */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            질문 내용
          </label>
          <textarea
            id="content"
            rows={6}
            {...register("content")}
            placeholder="질문 내용을 자세히 작성해주세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-vertical"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* 공개 설정 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">공개 설정</span>
          </div>

          <div className="flex rounded-md overflow-hidden border border-gray-300">
            <button
              type="button"
              onClick={() => {
                setIsPrivate(false);
                register("is_private", { value: false });
              }}
              className={`
                flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors
                ${
                  !isPrivate
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Globe className="w-4 h-4" />
              <span>공개</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPrivate(true);
                register("is_private", { value: true });
              }}
              className={`
                flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors
                ${
                  isPrivate
                    ? "bg-orange-500 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Lock className="w-4 h-4" />
              <span>비밀</span>
            </button>
          </div>
        </div>

        {/* 설명 텍스트 */}
        <div className="text-sm text-gray-500">
          {isPrivate ? (
            <div className="flex items-center space-x-1 text-orange-600">
              <Lock className="w-4 h-4" />
              <span>비밀글로 설정하면 작성자와 관리자만 볼 수 있습니다.</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>공개글로 설정하면 모든 사용자가 볼 수 있습니다.</span>
            </div>
          )}
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "등록 중..." : "질문 등록"}
          </button>
        </div>

        <input type="hidden" {...register("is_private")} value={isPrivate} />
      </form>
    </div>
  );
}
