import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Wine/vineyard photography is pulled from Unsplash's stable photo-id CDN
    // (verified 200 IDs; see data/productData.ts). Everything else is
    // self-hosted, so this is the full allow-list of remote image hosts.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
