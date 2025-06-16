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
      },{
        protocol: 'https',
        hostname: 'img.gamemonetize.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig