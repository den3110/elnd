/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me", "hvg.edu.vn"],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
  "presets": ["next/babel"]
};

module.exports = nextConfig;
