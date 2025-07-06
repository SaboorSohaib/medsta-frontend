// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// // Middleware function
// export async function middleware(req: NextRequest) {
//   const localToken = req.cookies.get("token");
//   // const vercelToken = req.cookies.get("_vercel_jwt");

//   const token = localToken;
//   const url = req.nextUrl.clone();
//   if (!token) {
//     if (
//       url.pathname.startsWith("/admin") ||
//       url.pathname.startsWith("/user-profile")
//     ) {
//       url.pathname = "/signin";
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token.value, secret);

//     const role = payload.role;

//     if (url.pathname.startsWith("/admin")) {
//       if (role === "admin") {
//         return NextResponse.next();
//       } else {
//         url.pathname = "/user-profile";
//         return NextResponse.redirect(url);
//       }
//     }
//   } catch (error: any) {
//     url.pathname = "/signin";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Only block protected routes if token is missing
  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/admin") ||
      req.nextUrl.pathname.startsWith("/user-profile") ||
      req.nextUrl.pathname.startsWith("/check-out"))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
