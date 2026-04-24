"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/guidelines", label: "Retningslinjer" },
  { href: "/faq", label: "Spørsmål & Svar" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
];

const AUTH_NAV_LINKS = [
  { href: "/chat", label: "Chat" },
  { href: "/tasks", label: "Tasks" },
];

function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-white transition-all duration-300",
        scrolled
          ? "border-b border-gray-100 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
          : "border-b border-gray-100",
      ].join(" ")}
    >
      <div className="flex justify-center items-center h-16 width-limit">

        {/* Logo */}
        <div className="flex-1 items-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-gray-950 hover:text-blue-600 transition-colors duration-200"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            AIGuidebook
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "text-gray-950 bg-gray-100"
                    : "text-gray-500 hover:text-gray-950 hover:bg-gray-50",
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
                  className={[
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    isActive
                      ? "text-gray-950 bg-gray-100"
                      : "text-gray-500 hover:text-gray-950 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </SignedIn>
        </nav>

        {/* Auth buttons */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  Logg inn
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-gray-950 hover:bg-gray-800 transition-all duration-200 cursor-pointer shadow-sm">
                  Kom i gang
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-gray-200 hover:ring-blue-400 transition-all duration-200",
                    userButtonPopoverCard: "shadow-xl border border-gray-100",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-gray-200",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="p-2 rounded-full text-gray-500 hover:text-gray-950 hover:bg-gray-100 transition-all duration-200"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-2">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-500 hover:text-gray-950 hover:bg-gray-50",
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
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-gray-100 text-gray-950"
                        : "text-gray-500 hover:text-gray-950 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                );
              })}
            </SignedIn>
          </nav>
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
            <SignedOut>
              <SignInButton>
                <button className="flex-1 px-4 py-2 rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer">
                  Logg inn
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="flex-1 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gray-950 hover:bg-gray-800 transition-all cursor-pointer">
                  Kom i gang
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
