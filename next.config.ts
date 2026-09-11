import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match Vite behavior: `import img from './x.jpg'` → URL string
  images: {
    disableStaticImages: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
