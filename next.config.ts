import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 이미지 최적화 완전 비활성화로 호환성 확보
    unoptimized: true,
    // 기본 로더 설정
    loader: "default",
    // 외부 도메인 허용
    domains: ["recoverix.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "recoverix.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
  // 정적 파일 서빙 최적화
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  trailingSlash: false,
};

export default nextConfig;
