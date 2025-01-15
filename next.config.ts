import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["static.nike.com", "localhost"],
  },

  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api-backend/:path*",
        destination: `http://127.0.0.1:8000/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
