import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Permite que o build continue mesmo com warnings do ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Permite que o build continue mesmo com warnings do TypeScript
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
