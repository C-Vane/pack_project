/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
};

module.exports = nextConfig;
