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
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.youtube.com;
      img-src 'self' blob: data: https:;
      font-src 'self' data: https://fonts.gstatic.com;
      connect-src 'self' https://akwisehgtrmytjhcilby.supabase.co wss://akwisehgtrmytjhcilby.supabase.co https://*.supabase.co wss://*.supabase.co;
      media-src 'self' https://recoverix.com;
      object-src 'none';
      frame-src https://www.youtube.com;
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
          {
            key: 'Permissions-Policy',
            value: 'storage-access=(self)',
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
