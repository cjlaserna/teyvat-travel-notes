/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.wanderer.moe",
        port: "",
        pathname: "/genshin-impact/**",
      },
    ],
  },
};

module.exports = nextConfig;
