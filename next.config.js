/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent ChunkLoadErrors on every deploy by controlling caching correctly:
  // - HTML pages: never cache (no-store) so users always get the latest HTML with correct JS chunk names
  // - Static assets (_next/static): cache forever (immutable) because they use content-hash filenames
  async headers() {
    return [
      {
        // Never cache HTML pages — this is the root cause of ChunkLoadErrors
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        // Static assets have content-hash names, safe to cache forever
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
