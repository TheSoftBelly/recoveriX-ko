import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ) | recoveriX Korea - 뇌졸중 재활 치료 안내",
  description:
    "recoveriX 치료에 대해 자주 묻는 질문과 답변을 확인하세요. 치료 방법, 치료 기간, 치료 효과, 비용, 보험 적용, 대상 환자 등 recoveriX BCI 재활치료에 대한 모든 궁금증을 해결해드립니다.",
  keywords:
    "recoveriX FAQ, 뇌졸중 재활 질문, BCI 치료 안내, 재활 치료 비용, 재활 보험 적용, 파킨슨 치료 문의, 다발성 경화증 재활, 뇌재활 치료 기간",
  openGraph: {
    title: "자주 묻는 질문 (FAQ) | recoveriX Korea",
    description:
      "recoveriX 치료에 대해 자주 묻는 질문과 답변을 확인하세요. 치료 방법, 기간, 효과, 비용 등에 대한 모든 궁금증을 해결해드립니다.",
    url: "https://www.recoverix.co.kr/faq",
    type: "website",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
