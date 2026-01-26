import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })

    const match = pathname.match(/^\/admin\/([^/]+)/)
    const usernamePath = match ? match[1] : null

    // Kalau belum login
    if (!token) {
        // Hanya blokir halaman admin
        if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
        return NextResponse.next()
    }

    // Kalau udah login
    const username = token.username

    // Kalau user coba akses admin milik dia sendiri → lanjut
    if (pathname.startsWith('/admin') && usernamePath === username) {
        return NextResponse.next()
    }

    // Kalau user login tapi buka /login atau /register → lempar ke admin page-nya
    if (pathname === '/login' || pathname === '/register') {
        return NextResponse.redirect(new URL(`/admin/${username}/links`, req.url))
    }

    // Kalau user login tapi buka /admin milik orang lain → lempar ke login (atau bisa ke 403)
    if (pathname.startsWith('/admin') && usernamePath !== username) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/register', '/admin/:path*'],
}
