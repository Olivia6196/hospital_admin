import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function proxy(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  if (!currentPath.startsWith("/dashboard")) return NextResponse.next();

  const token = await getToken({ req, secret });
  const authUrl = new URL("/login", req.url);

  if (!token) return NextResponse.redirect(authUrl);
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
