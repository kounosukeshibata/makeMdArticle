/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // App Routerを有効化
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://backend:8000",
  },
};

module.exports = nextConfig;
