/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your Next.js configuration options here, for example:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
