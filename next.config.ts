import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  }
};

export default nextConfig;
