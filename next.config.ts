import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/simucorp-os",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
