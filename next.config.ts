import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // These settings help prevent 503 crashes on low-resource hosting like Hostinger
    // by reducing memory usage and concurrent work.
  },
  // Ensure we don't try to use features that Hostinger might block
  output: 'standalone',
};

export default nextConfig;
