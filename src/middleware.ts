import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    // Get the pathname from the URL
    const { pathname } = req.nextUrl;

    // If the user is logged in and trying to access login or register page, redirect them
    if (token && (pathname === '/login' || pathname === '/register')) {
        // Redirect to home or any other page you want
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && pathname.startsWith("/protected")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If the user is not logged in and trying to access any other page, allow them
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/register'],
}