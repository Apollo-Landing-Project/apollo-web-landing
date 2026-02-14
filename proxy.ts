import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define supported locales
const locales = ['id', 'en']

// Define assets and public files to ignore
const publicFiles = [
    '/favicon.ico',
    '/logo.png',
    '/logo-new.png',
    '/next.svg',
    '/vercel.svg',
    '/file.svg',
    '/globe.svg',
    '/window.svg',
    '/site.webmanifest'
]

function isPublicFile(pathname: string) {
    if (publicFiles.includes(pathname)) return true
    if (pathname.startsWith('/assets/')) return true
    return false
}

export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 1. Skip middleware for API routes, Next.js internals, and public files
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        isPublicFile(pathname)
    ) {
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
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
    ],
}
