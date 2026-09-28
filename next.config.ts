import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/maplibre/:file*",
        headers: [{ key: "Content-Type", value: "text/javascript; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
