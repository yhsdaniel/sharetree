import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    // Get the pathname from the URL
    const { pathname } = req.nextUrl;

    const secret = process.env.NEXTAUTH_SECRET

    const token = await getToken({ req, secret });

    if(token){
        const username = token.username
        console.log('username', username)
        // If the user is logged in and trying to access login or register page, redirect them
        if (username && (pathname.startsWith(`/${username}/admin`))) {
            const redirectUrl = `/${username}/admin`

            // Redirect to home or any other page you want
            return NextResponse.redirect(new URL(redirectUrl, req.url));
        }
    }

    // If the user is not logged in and trying to access any other page, allow them
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/register', '/'],
}