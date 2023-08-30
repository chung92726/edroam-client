/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
    // localeDetection: true,
    domains: [
      {
        domain: 'localhost:3000',
        defaultLocale: 'en',
      },
      {
        domain: 'zh-cn.localhost:3000',
        defaultLocale: 'zh-CN',
      },
      {
        domain: 'zh-tw.localhost:3000',
        defaultLocale: 'zh-TW',
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },
}
