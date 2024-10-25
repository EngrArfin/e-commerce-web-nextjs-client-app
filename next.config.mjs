/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "", // Optional
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Add another hostname
        port: "", // Optional
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
