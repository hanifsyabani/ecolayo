import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const userRole = req.nextauth.token?.role;

    // Proteksi akses ke halaman admin
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Hanya lanjut jika token ada (user login)
    },
  }
);

// Terapkan middleware pada path yang butuh proteksi
export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
