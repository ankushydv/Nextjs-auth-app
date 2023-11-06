/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'tecdn.b-cdn.net',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
}

module.exports = nextConfig
