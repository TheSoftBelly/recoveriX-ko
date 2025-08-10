/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
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
        pathname: "/**",
      },
    ],
  },
  // 정적 파일 서빙 최적화
  trailingSlash: false,
  // CSS preload 경고 해결
  experimental: {
    optimizeCss: false,
  },
  // CSS 최적화 비활성화
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      styles: {
        name: "styles",
        test: /\.(css|scss)$/,
        chunks: "all",
        enforce: true,
      },
    };
    return config;
  },
};

module.exports = nextConfig;
