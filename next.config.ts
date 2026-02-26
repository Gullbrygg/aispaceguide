import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Note: Use port 3001 (via npm scripts) to avoid conflict with SpacetimeDB on port 3000
  // Cloudflare Workers does not support server-side image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
