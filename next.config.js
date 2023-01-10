/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.punkapi.com',
        port: '',
        pathname: '/v2/**',
      },
    ],
  },
  webpack: (config) => {
    if (process.env.DOCKER) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    return config
  },
}

module.exports = nextConfig
