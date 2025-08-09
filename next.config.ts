import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // SVG와 PNG 파일들을 위한 추가 설정
    remotePatterns: [],
    unoptimized: false, // 개별 컴포넌트에서 unoptimized 속성으로 제어
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
  // 정적 파일 서빙 최적화
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  trailingSlash: false,
  // 정적 파일 export 설정
  output: undefined, // Vercel에서는 기본값 사용
};

export default nextConfig;
