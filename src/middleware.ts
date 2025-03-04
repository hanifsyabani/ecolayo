import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/:path*",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  if (!isPublicRoute(req)) {
    if (!userId) {
      return Response.redirect("/sign-in");
    }

    // Cek apakah sesi masih berlaku berdasarkan waktu kedaluwarsa (exp)
    const sessionExpiry = sessionClaims?.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik

    if (sessionExpiry && sessionExpiry < currentTime) {
      return Response.redirect("/sign-in");
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
