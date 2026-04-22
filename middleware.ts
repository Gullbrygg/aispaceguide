import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const TEMP_BAN_DURATION_MS = 15 * 60 * 1000;

// In-memory and process-local by design. This resets on deploy/restart.
const tempBannedIps = new Map<string, number>();

const suspiciousPathMatchers: RegExp[] = [
  /^\/wp-login\.php$/i,
  /^\/wp-admin(?:\/|$)/i,
  /^\/xmlrpc\.php$/i,
  /^\/phpmyadmin(?:\/|$)/i,
  /^\/node_modules(?:\/|$)/i,
  /^\/chunks(?:\/|$)/i,
  /^\/dist(?:\/|$)/i,
  /^\/components(?:\/|$)/i,
  /^\/\.git\/config$/i,
  /^\/\.env(?:$|\.)/i,
  /^\/boaform\/admin\/formlogin$/i,
  /^\/vendor\/phpunit(?:\/|$)/i,
  /^\/(?:wordpress|wp-content|wp-includes)(?:\/|$)/i,
];

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  return null;
}

function isSuspiciousPath(pathname: string): boolean {
  return suspiciousPathMatchers.some((matcher) => matcher.test(pathname));
}

function isIpTemporarilyBanned(ip: string): boolean {
  const now = Date.now();
  const bannedUntil = tempBannedIps.get(ip);

  if (!bannedUntil) return false;
  if (bannedUntil <= now) {
    tempBannedIps.delete(ip);
    return false;
  }

  return true;
}

function banIp(ip: string): void {
  tempBannedIps.set(ip, Date.now() + TEMP_BAN_DURATION_MS);
}

const isPublicRoute = createRouteMatcher([
  '/(.*)',
  '/about',
  '/about/(.*)',
  '/guidelines',
  '/quiz',
  '/contact',

]);

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;
  const ip = getClientIp(request);

  if (ip && isIpTemporarilyBanned(ip)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (isSuspiciousPath(pathname)) {
    if (ip) {
      banIp(ip);
    }

    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};