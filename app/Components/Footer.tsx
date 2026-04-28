import Link from "next/link";

const SECTIONS = [
  {
    heading: "Lær",
    links: [
      { href: "/guidelines", label: "Retningslinjer" },
      { href: "/guidelines#integritet", label: "Akademisk integritet" },
      { href: "/guidelines#personvern", label: "Personvern" },
      { href: "/guidelines#hallusinasjoner", label: "AI-hallusinasjoner" },
    ],
  },
  {
    heading: "Verktøy",
    links: [
      { href: "/quiz", label: "Quiz" },
      { href: "/faq", label: "Spørsmål & Svar" },
      { href: "/chat", label: "AI-assistent" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    heading: "Om",
    links: [
      { href: "/about", label: "Om AIGuidebook" },
      { href: "/about/student", label: "For studenter" },
      { href: "/about/teacher", label: "For lærere" },
      { href: "/about/university", label: "For institusjoner" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main footer grid */}
      <div className="width-limit py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="text-xl font-semibold text-white hover:text-blue-400 transition-colors duration-200 mb-4 inline-block"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              AIGuidebook
            </Link>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs mt-3">
              En gratis veiledningsplattform for ansvarlig og akademisk ærlig bruk av AI i høyere utdanning.
            </p>
            {/* AI badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              AI-assistent tilgjengelig
            </div>
          </div>

          {/* Link columns */}
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="width-limit py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} AIGuidebook. Laget med omsorg for studenter.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Om oss
            </Link>
            <span className="text-xs text-gray-700">USN · PRO1000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
