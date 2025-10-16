const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  outputFileTracingRoot: path.join(__dirname),

  eslint: {
    // 빌드 중 ESLint 에러 무시 (임시방편)
    ignoreDuringBuilds: true,
  },

  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https:;
      font-src 'self' data:;
      connect-src 'self' https://akwisehgtrmytjhcilby.supabase.co wss://akwisehgtrmytjhcilby.supabase.co;
      object-src 'none';
      frame-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ]
  },

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
