const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/public/:path*',
        destination: '/:path*', // Match any path
      },
    ]
  },
};

module.exports = withContentlayer(nextConfig);
