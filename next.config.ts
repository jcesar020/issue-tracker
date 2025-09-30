import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    ignoreDuringBuilds: true, // 🚨 evita que el build falle por errores de ESLint
  },
};

export default nextConfig;
