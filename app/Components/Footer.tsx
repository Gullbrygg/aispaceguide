import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

function Footer() {
  return (
    <footer className="bg-gradient-to-l from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl border-t border-white/10">
      <div className="width-limit py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-bold bg-gradient-to-r from-purple-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
        >
          AIGuidebook
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-wrap justify-center">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Gullbrygg
        </p>

      </div>
    </footer>
  );
}

export default Footer;