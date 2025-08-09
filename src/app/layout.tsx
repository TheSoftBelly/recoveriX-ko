import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/tailwind.css";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "recoveriX Korea - 혁신적인 뇌-컴퓨터 인터페이스 재활치료",
  description:
    "recoveriX는 뇌-컴퓨터 인터페이스 기술을 활용한 혁신적인 재활치료 시스템입니다. 안전하고 효과적인 치료로 새로운 회복의 길을 제시합니다.",
  keywords:
    "recoveriX, 재활치료, 뇌-컴퓨터 인터페이스, BCI, 뇌졸중 재활, 신경재활",
  authors: [{ name: "recoveriX Korea" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://recoverix-korea.vercel.app",
    title: "recoveriX Korea - 혁신적인 뇌-컴퓨터 인터페이스 재활치료",
    description:
      "recoveriX는 뇌-컴퓨터 인터페이스 기술을 활용한 혁신적인 재활치료 시스템입니다.",
    siteName: "recoveriX Korea",
  },
  twitter: {
    card: "summary_large_image",
    title: "recoveriX Korea - 혁신적인 뇌-컴퓨터 인터페이스 재활치료",
    description:
      "recoveriX는 뇌-컴퓨터 인터페이스 기술을 활용한 혁신적인 재활치료 시스템입니다.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
