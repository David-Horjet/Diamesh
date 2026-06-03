import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@diamesh/shared"],
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
