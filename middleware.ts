import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Middleware function
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const url = req.nextUrl.clone();
  if (!token) {
    if (
      url.pathname.startsWith('/admin') ||
      url.pathname.startsWith('/user-profile')
    ) {
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);

    const role = payload.role;

    if (url.pathname.startsWith('/admin')) {
      if (role === 'admin') {
        return NextResponse.next();
      } else {
        url.pathname = '/user-profile';
        return NextResponse.redirect(url);
      }
    }
  } catch (error: any) {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
