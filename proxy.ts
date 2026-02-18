import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define supported locales
const locales = ['id', 'en']

export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 1. Tentukan file mana saja yang dilarang dicegat oleh Satpam
    const isPublicResource =
        pathname === '/sitemap.xml' ||
        pathname === '/sitemap' ||
        pathname === '/robots.txt' ||
        pathname === '/robots' ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname.includes('/sitemap') ||
        pathname.includes('/robots.txt') ||
        pathname.includes('/robots')

    // 2. Jika itu file publik, biarkan lewat tanpa redirect ke /en
    if (isPublicResource) {
        return NextResponse.next()
    }

    // 2. Check if the pathname starts with a valid locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // 3. Redirect logic
    if (pathnameIsMissingLocale) {
        // If it's strictly the root '/', redirect to '/id'
        if (pathname === '/') {
            const url = request.nextUrl.clone()
            url.pathname = '/id'
            return NextResponse.redirect(url)
        }

        // If it's a random path (e.g., '/ngaco' or '/fr/services'), redirect to defaults '/id'
        // This handles "not found" or invalid locale scenarios by resetting to homepage with valid locale
        const url = request.nextUrl.clone()
        url.pathname = '/id'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next (Next.js internals)
         * - assets (static assets)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next|assets|favicon.ico|sw.js|site.webmanifest).*)',
    ],
}
