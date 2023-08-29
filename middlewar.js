// import { i18n } from '@/next-i18next.config';

// import { NextRequest, NextResponse } from 'next/server';
// import { match as matchLocale } from '@formatjs/intl-localematcher';
// import Negotiator from 'negotiator';

// const locales = ['en', 'zh-CN', 'zh-TW'];
// const defaultLocale = 'en';

// export function getLocale(request) {
//   const headers = new Headers(request.headers);
//   const acceptLanguage = headers.get('accept-language');
//   console.log('AcceptLanguage:', acceptLanguage);
//   if (acceptLanguage) {
//     headers.set('accept-language', acceptLanguage.replace(/_/g, '-'));
//   }

//   const headersObject = Object.fromEntries(headers.entries());
//   const negotiator = new Negotiator({ headers: headersObject });
//   const languages = negotiator.languages();
//   console.log('Languages:', languages);
//   console.log('Locales:', locales);
//   console.log('Default Locale:', defaultLocale);
//   let detectedLocale = matchLocale(languages, locales, defaultLocale);

//   detectedLocale = detectedLocale.replace(/-/g, '_');
//   return detectedLocale;
// }

// export function middleware(request) {
//   let locale = getLocale(request) || defaultLocale;
//   const pathname = request.nextUrl.pathname;

//   console.log(`Request path: ${pathname}`); // Logging the initial request path
//   console.log(`Determined locale: ${locale}`); // Logging the determined locale based on headers

//   // Debugging: Check specifically for '/zh' path
//   // if (pathname === '/zh') {
//   //   console.log('Explicitly rewriting for /zh');
//   //   return NextResponse.rewrite('/zh');
//   // }

//   // Check if pathname already starts with a locale
//   if (locales.some((l) => pathname.endsWith(`?lang=${l}`))) {
//     console.log('language detected');
//     return NextResponse.next(); // Continue without rewriting
//   }

//   // const newUrl = new URL(`/${locale}/${pathname}`, request.nextUrl);
//   // console.log(newUrl);
//   // return NextResponse.rewrite(newUrl);
// }

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     '/((?!_next|api|favicon.ico).*)',
//     // Optional: only run on root (/) URL
//     '/',
//   ],
// };
