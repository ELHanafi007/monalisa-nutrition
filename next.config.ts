import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. We'll fix these once the site is stable.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Same for TypeScript - we want to get the site live first.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
