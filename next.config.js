// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require('stylelint-webpack-plugin')

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

    config.plugins.push(new StylelintPlugin())

    return config
  },
}

module.exports = nextConfig
