import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.scss";

export const metadata = {
  title: "recoveriX | 첨단 뇌재활 장비 · 뇌졸중 재활 전문",
  description:
    "recoveriX는 GTEC 재활기기와 뉴로솔루션즈의 첨단 BCI 재활치료 솔루션을 제공합니다. 뇌졸중, 중풍, 편마비, 파킨슨병 환자의 재활과 뇌신경 회복을 돕습니다.",
  keywords:
    "recoveriX, GTEC 재활기기, 뉴로솔루션즈, 첨단 뇌재활 장비, BCI 재활치료, 뇌졸중 재활, 중풍 재활, 편마비 재활, 파킨슨 재활, 뇌신경 회복, 뇌졸중 환자 재활, 뇌-컴퓨터 인터페이스",
  authors: [{ name: "g.tec medical engineering GmbH" }],
  creator: "g.tec medical engineering GmbH",
  publisher: "g.tec medical engineering GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.recoverix.co.kr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "recoveriX | 첨단 뇌재활 장비 · 뇌졸중 재활 전문",
    description:
      "recoveriX는 GTEC 재활기기와 뉴로솔루션즈의 첨단 BCI 재활치료 솔루션을 제공합니다. 뇌졸중 환자의 재활과 뇌신경 회복을 돕습니다.",
    url: "https://www.recoverix.co.kr",
    siteName: "recoveriX Korea",
    images: [
      {
        url: "https://recoverix.com/wp-content/uploads/2022/05/recoverix-logo.png",
        width: 1200,
        height: 630,
        alt: "recoveriX Korea - 첨단 뇌재활 장비",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "recoveriX Korea - 뇌졸중 및 다발성 경화증 신경 재활",
    description:
      "recoveriX는 뇌가 스스로 재구성하여 잃어버린 운동 기능을 다시 학습하도록 돕는 뇌-컴퓨터 인터페이스 기술입니다.",
    images: [
      "https://recoverix.com/wp-content/uploads/2022/05/recoverix-logo.png",
    ],
  },
  other: {
    "naver-site-verification": "ad8173a349b644bbb3a043eaabc75f26b44c8599",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "zuLNlJ5PF07-5XTogsN9812Qa-paNTrs_FEpFof5SXk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
