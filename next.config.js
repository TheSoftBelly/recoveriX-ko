const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  // 👇 경고 방지용 루트 경로 설정 (추론 오류 방지)
  outputFileTracingRoot: path.join(__dirname),

  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "recoverix.com",
        pathname: "/**",
      },
    ],
  },

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
