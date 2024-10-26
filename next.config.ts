import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img1.wsimg.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
};

export default nextConfig;
