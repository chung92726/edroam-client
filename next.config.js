/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    const apiRewrites = [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
      },
    ]
    return [...apiRewrites]
  },
}
