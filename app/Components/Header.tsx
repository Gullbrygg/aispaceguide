"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/guidelines", label: "Retningslinjer" },
    { href: "/faq", label: "Spørsmål & Svar" },
    { href: "/quiz", label: "Quiz" },
    { href: "/dashboard", label: "Læringssti" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="text-3xl">✨</div>
            <span className="text-2xl font-semibold text-slate-950 group-hover:text-slate-700 transition-colors">
              AIGuidebook
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
                  pathname === item.href
                    ? "text-slate-950 bg-slate-100"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl text-slate-700 hover:text-slate-950 transition-colors">☰</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
