"use client";

import Link from "next/link";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const navButton = (path: string) =>
    `header-button ${pathname === path
      ? "header-button-active"
      : "header-button-default"
    }`;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-20 width-limit">
        <div className="grid grid-cols-5 w-full items-center justify-center">


          <Link
            href="/" // Linker tilbake til hjemmesiden
            className="text-3xl font-semibold tracking-tight text-gray-800"
          >
            AIGuidebook
          </Link>

          <nav className="flex items-center gap-4 col-span-3">

            <Link href="/dashboard" className={navButton("/dashboard")}>
              Dashboard
            </Link>

            <Link href="/guidelines" className={navButton("/guidelines")}>
              Guidelines
            </Link>

            <Link href="/quiz" className={navButton("/quiz")}>
              Quiz
            </Link>

            <Link href="/contact" className={navButton("/contact")}>
              Contact
            </Link>

            <Link href="/about" className={navButton("/about")}>
              About
            </Link>

          </nav>
          <div className="flex items-center justify-center text-center">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            {/* Show the user button when the user is signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;