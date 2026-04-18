import Link from "next/link";

export default function University() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-bg flex flex-col items-center justify-center">
      <div className="text-center px-6 max-w-4xl mx-auto py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-fg mb-6 tracking-tight">For Universities</h1>
        <p className="text-xl text-muted mb-12">
          Partner with us to bring collaborative learning tools to your entire institution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Institution-Wide</h3>
            <p className="text-muted text-sm">Deploy GullBrygg across your entire university with centralized management and oversight.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-muted text-sm">Gain insights into student engagement, collaboration patterns, and academic outcomes.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Secure & Compliant</h3>
            <p className="text-muted text-sm">Built with privacy and data security in mind, meeting academic institution requirements.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-accent text-accent-fg px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-accent-hover transition-colors duration-200 shadow-sm"
          >
            Get Started
          </Link>
          <Link
            href="/"
            className="bg-surface border border-border text-fg px-8 py-3.5 rounded-lg font-semibold text-base hover:border-accent hover:text-accent-text transition-all duration-200 shadow-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}