"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";


const NAV_LINKS = [
  { href: "/guidelines", label: "Guidelines" },
  { href: "/quiz", label: "Quiz" },
];

const AUTH_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
];

function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
      <div className="flex items-center h-18 width-limit">

        {/* Logo — flex-1 so it takes equal space to the auth section */}
        <div className="flex-1 flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white hover:text-purple-200 transition-colors duration-300"
          >
            <span className="bg-gradient-to-r from-purple-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300">
              AIGuidebook
            </span>
          </Link>
        </div>

        {/* Desktop Nav — perfectly centered */}
        <nav className="hidden md:flex items-center gap-1">
          <SignedOut>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive
                    ? "bg-white/15 text-white border border-white/25 shadow-md shadow-black/20"
                    : "text-gray-300 border border-transparent hover:text-white hover:bg-white/10 hover:border-white/15",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
          </SignedOut>
          <SignedIn>
            {AUTH_NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "bg-white/15 text-white border border-white/25 shadow-md shadow-black/20"
                      : "text-gray-300 border border-transparent hover:text-white hover:bg-white/10 hover:border-white/15",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </SignedIn>
        </nav>

        {/* Auth + mobile toggle — flex-1 so it mirrors the logo width */}
        <div className="flex-1 flex items-center justify-end gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 shadow-md shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "ring-2 ring-white/30 hover:ring-white/60 transition-all duration-300",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile: show UserButton when signed in, hamburger always */}
          <div className="flex md:hidden items-center gap-3">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "ring-2 ring-white/30 hover:ring-white/60 transition-all duration-300",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {mobileOpen ? (
                /* X icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-gradient-to-b from-purple-900/95 to-indigo-900/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/15 text-white border border-white/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
            <SignedIn>
              {AUTH_NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-white/15 text-white border border-white/25"
                        : "text-gray-300 hover:text-white hover:bg-white/10",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                );
              })}
            </SignedIn>
          </nav>

          {/* Mobile Auth */}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10">
            <SignedOut>
              <SignInButton>
                <button className="flex-1 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="flex-1 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 transition-all duration-200 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;