import {
  createVanillaExtractPlugin
} from "@vanilla-extract/next-plugin";
import unimport from "unimport/unplugin";

const withVanillaExtract = createVanillaExtractPlugin();

const unimportConfig = {
  dts: true,

  imports: [
    {
      from: "@/env",
      name: "env",
    },
  ],
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
     useLightningcss: true
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.infrastructureLogging = {
      level: "error",
    };

    config?.plugins?.push(unimport.webpack(unimportConfig));
    return config;
  },
};

export default withVanillaExtract(nextConfig);