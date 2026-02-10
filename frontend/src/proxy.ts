import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken");

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/products/cart") ||
      request.nextUrl.pathname.startsWith("/messages") ||
      request.nextUrl.pathname.startsWith("/profile"))
  ) {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  return NextResponse.next();
}
