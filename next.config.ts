import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
    ],
  },
};

export default nextConfig;
