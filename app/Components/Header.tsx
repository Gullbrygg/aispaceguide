"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";


const NAV_LINKS = [
    { href: "/guidelines", label: "Retningslinjer" },
    { href: "/faq", label: "Spørsmål & Svar" },
    { href: "/quiz", label: "Quiz" }
];

const AUTH_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
];

function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-chrome border-b border-border-chrome shadow-sm">
      <div className="flex items-center h-18 width-limit">

        {/* Logo — flex-1 so it takes equal space to the auth section */}
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-accent-fg
             hover:text-accent-hover transition-colors duration-200 text-center md:text-left"
          >
            AIGuidebook
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
                  "px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-accent-fg border-b-2 border-accent"
                    : "text-muted hover:text-accent-fg",
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
                    "px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-accent-fg border-b-2 border-accent"
                      : "text-muted hover:text-accent-fg",
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
                <button className="px-4 py-2 rounded-md text-sm font-medium text-muted hover:text-accent-fg border border-border-chrome hover:border-muted transition-all duration-200 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 rounded-md text-sm font-semibold text-accent-fg bg-accent hover:bg-accent-hover transition-colors duration-200 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "ring-2 ring-border-chrome hover:ring-accent transition-all duration-200",
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
                    avatarBox: "ring-2 ring-border-chrome hover:ring-accent transition-all duration-200",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-muted hover:text-accent-fg hover:bg-chrome-muted transition-all duration-200"
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
        <div className="md:hidden border-t border-border-chrome bg-chrome">
          <nav className="flex flex-col gap-1 px-4 py-3 text-center">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-chrome-muted text-accent-fg"
                      : "text-muted hover:text-accent-fg hover:bg-chrome-muted",
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
                      "px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-chrome-muted text-accent-fg"
                        : "text-muted hover:text-accent-fg hover:bg-chrome-muted",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                );
              })}
            </SignedIn>
          </nav>

          {/* Mobile Auth */}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-border-chrome">
            <SignedOut>
              <SignInButton>
                <button className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-muted hover:text-accent-fg border border-border-chrome hover:border-muted transition-all duration-200 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="flex-1 px-4 py-2 rounded-md text-sm font-semibold text-accent-fg bg-accent hover:bg-accent-hover transition-colors duration-200 cursor-pointer">
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