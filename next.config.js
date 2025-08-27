const nextConfig = {
  trailingSlash: false,
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