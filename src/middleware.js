import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Helper to get secret
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // Not logged in, redirect to login page or home
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Verify token
      const { payload } = await jwtVerify(token, getJwtSecretKey());

      // Authorization Check
      if (payload.role !== 'admin') {
        // Logged in but not an admin -> 403 Forbidden effectively, or redirect to home
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Valid admin, allow request to proceed
      return NextResponse.next();
      
    } catch (error) {
      // Token invalid or expired
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware only to admin routes
  matcher: ['/admin/:path*'],
};
