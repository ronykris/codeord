/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'd1muf25xaso8hp.cloudfront.net',
    }, ],
  },
  swcMinify: true,
}

module.exports = nextConfig
