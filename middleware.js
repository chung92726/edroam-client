import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

let locales = ['en', 'zh', 'cn']

// Get the preferred locale, similar to above or using a library
function getLocale(request) {
  // 1. From cookies
  const queryLocale = request.nextUrl.searchParams.get('lang')
  console.log('queryLocale', queryLocale)
  if (queryLocale && locales.includes(queryLocale)) {
    return queryLocale
  }
  try {
    const cookieLocale = request.cookies.get('locale').value
    console.log('cookieLocale', cookieLocale)
    if (cookieLocale && locales.includes(cookieLocale)) {
      return cookieLocale
    }
  } catch (err) {
    console.log(err)
  }
  // 1. From query parameters

  // 2. From headers
  const headerLocale = request.headers['accept-language']?.split(',')[0]
  if (headerLocale && locales.includes(headerLocale)) {
    return headerLocale
  }

  // 3. From domain
  const domainMapping = {
    'example.hk': 'zh',
    'example.tw': 'zh',
    'example.cn': 'cn',
    // ... add more domain mappings here
  }
  if (domainMapping[request.nextUrl.hostname]) {
    return domainMapping[request.nextUrl.hostname]
  }

  // 4. From subdomain
  const subdomain = request.nextUrl.hostname?.split('.')[0]
  const subdomainMapping = {
    tw: 'zh',
    hk: 'zh',
    cn: 'cn',
    // ... add more subdomain mappings here
  }
  if (subdomainMapping[subdomain]) {
    return subdomainMapping[subdomain]
  }

  // Default locale
  return 'en'
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
  if (imageExtensions.some((ext) => pathname.endsWith(ext))) {
    return NextResponse.next() // Bypass middleware processing for images
  }
  const extractedLocale = pathname.split('/')[1] // Get the potential locale from the path

  // Check if the URL has an explicit locale (e.g., /cn)
  if (locales.includes(extractedLocale)) {
    const response = NextResponse.next()

    // Update the cookie with the new locale
    const cookieValue = `locale=${extractedLocale}; Path=/; Max-Age=${
      60 * 60 * 24 * 30
    }; HttpOnly`
    response.headers.set('Set-Cookie', cookieValue)

    return response
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    console.log('is missing')

    const response = NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )

    // Set cookie for subsequent requests
    const cookieValue = `locale=${locale}; Path=/; Max-Age=${
      60 * 60 * 24 * 30
    }; HttpOnly`
    response.headers.set('Set-Cookie', cookieValue)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return response
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.svg|\\.webp).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
