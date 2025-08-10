import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.scss";

export const metadata = {
  title: "recoveriX - 뇌졸중 및 다발성 경화증 신경 재활",
  description:
    "recoveriX는 뇌가 스스로 재구성하여 잃어버린 운동 기능을 다시 학습하도록 돕는 뇌-컴퓨터 인터페이스 기술입니다.",
  keywords: "뇌졸중, 다발성 경화증, 신경 재활, BCI, 뇌-컴퓨터 인터페이스",
  authors: [{ name: "g.tec medical engineering GmbH" }],
  creator: "g.tec medical engineering GmbH",
  publisher: "g.tec medical engineering GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://recoverix.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "recoveriX - 뇌졸중 및 다발성 경화증 신경 재활",
    description:
      "recoveriX는 뇌가 스스로 재구성하여 잃어버린 운동 기능을 다시 학습하도록 돕는 뇌-컴퓨터 인터페이스 기술입니다.",
    url: "https://recoverix.com",
    siteName: "recoveriX",
    images: [
      {
        url: "https://recoverix.com/wp-content/uploads/2022/05/recoverix-logo.png",
        width: 1200,
        height: 630,
        alt: "recoveriX Logo",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "recoveriX - 뇌졸중 및 다발성 경화증 신경 재활",
    description:
      "recoveriX는 뇌가 스스로 재구성하여 잃어버린 운동 기능을 다시 학습하도록 돕는 뇌-컴퓨터 인터페이스 기술입니다.",
    images: [
      "https://recoverix.com/wp-content/uploads/2022/05/recoverix-logo.png",
    ],
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
    google: "your-google-verification-code",
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
