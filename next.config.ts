import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Food photography is pulled from Unsplash's stable photo-id CDN. Everything
    // else is self-hosted, so this is the full allow-list of remote image hosts.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
