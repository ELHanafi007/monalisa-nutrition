import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Reverting to standard output for Hostinger compatibility
};

export default nextConfig;
