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
  const url = req.nextUrl.clone();

  // Check if path is inside the (Admin) folder
  const protectedPaths = [
    "/admin",
    "/admin/blogs",
    "/admin/categories",
    "/admin/customers",
    "/admin/orders",
    "/admin/products",
    "/admin/productReviews",
  ];

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    const token = req.cookies.get("token");

    if (!token) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin/blogs/:path*",
    "/admin/categories/:path*",
    "/admin/customers/:path*",
    "/admin/orders/:path*",
    "/admin/products/:path*",
    "/admin/productReviews/:path*",
  ],
};
