// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgs.crazygames.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig