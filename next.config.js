/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  async rewrites() {
    const apiRewrites = [
      {
        source: '/api/:path*',
        destination: 'http://192.168.0.147:8000/api/:path*', // Proxy to Backend
      },
    ];
    return [...apiRewrites];
  },

  i18n,
};
