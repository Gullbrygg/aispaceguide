import Link from "next/link";

export default function Teacher() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-bg flex flex-col items-center justify-center">
      <div className="text-center px-6 max-w-4xl mx-auto py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-fg mb-6 tracking-tight">For Teachers</h1>
        <p className="text-xl text-muted mb-12">
          Empower your students, manage groups, and foster a culture of collaborative learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Manage Groups</h3>
            <p className="text-muted text-sm">Create and oversee study groups for your courses, keeping students organized and engaged.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Track Engagement</h3>
            <p className="text-muted text-sm">Monitor student participation and collaboration to identify who needs extra support.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Share Resources</h3>
            <p className="text-muted text-sm">Distribute learning materials and guidelines directly to your student groups.</p>
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