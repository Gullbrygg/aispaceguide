import { NextResponse } from "next/server";

export default function middleware(request: Request) {
  return NextResponse.next();
}

// Middleware is currently a no-op. Re-enable authentication logic when needed.
