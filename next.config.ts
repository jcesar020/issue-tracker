import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 🚨 evita que el build falle por errores de ESLint
  },
  
  // Optimizaciones para Docker
  output: 'standalone', // Genera un build optimizado para contenedores
  
  // Optimizaciones de build
  experimental: {
    // Optimiza imports de dependencias
    optimizePackageImports: ['@radix-ui/themes', 'react-icons'],
  },
  
  // Compresión de assets
  compress: true,
  
  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
