/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

module.exports = nextConfig;
