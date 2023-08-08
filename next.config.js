/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8000/api/:path*', // Proxy to Backend
        },
      ]
    }
  },
}
