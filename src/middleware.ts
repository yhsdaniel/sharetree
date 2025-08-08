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
        const match = pathname.match(/^\/admin\/([^/]+)/); //check if the path starts with /admin/username/links
        const usernamePath = match ? match[1] : null; // Extract the username from the path

        // If the user is logged in and trying to access admin links, allow them
        if(pathname.startsWith('/admin') && usernamePath === username){
            return NextResponse.next();
        }
        // If the user is logged in and trying to access login or register page, redirect them
        if(pathname === '/login' || pathname === '/register'){
            return NextResponse.redirect(new URL(`/admin/${username}/links`, req.url))
        }
        // If the user is logged in and trying to access wrong username in the path, redirect them
        if(usernamePath !== username){
            return NextResponse.redirect(new URL(`/login`, req.url))
        }
    } else {
        if(pathname.startsWith('/admin')){
            return NextResponse.redirect(new URL(`/login`, req.url))
        }
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/register', '/', '/admin/:path*'],
}