import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

function Footer() {
  return (
    <footer className="bg-chrome border-t border-border-chrome">
      <div className="width-limit py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <Link
          href="/"
          className="text-base font-semibold text-accent-fg hover:text-accent-hover transition-colors duration-200"
        >
          AIGuidebook
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-wrap justify-center">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 text-sm text-muted hover:text-accent-fg transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm text-subtle">
          &copy; {new Date().getFullYear()} Gullbrygg
        </p>

      </div>
    </footer>
  );
}

export default Footer;