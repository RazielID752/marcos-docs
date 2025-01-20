import path from "path";
import type { NextConfig } from "next";
import type { Configuration } from "webpack"; // Importa os tipos do Webpack

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  webpack: (config: Configuration) => { // Adiciona o tipo explícito
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(__dirname), // Configuração de alias
      },
    };
    return config;
  },
};

export default nextConfig;
