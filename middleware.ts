import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configure your canonical host here or leave empty to disable redirect
const CANONICAL_HOST = process.env.CANONICAL_HOST || "";

export function middleware(request: NextRequest) {
  // Skip redirect if no canonical host is configured
  if (!CANONICAL_HOST) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto || request.nextUrl.protocol.replace(":", "");

  if (host !== CANONICAL_HOST || protocol !== "https") {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
