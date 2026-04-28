import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-bg flex flex-col items-center justify-center">
      <div className="text-center px-6 max-w-4xl mx-auto py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-fg mb-6 tracking-tight">For Studenter</h1>
        <p className="text-xl text-muted mb-12">
          Bli med i studiegrupper, samarbeid med medstudenter og oppnå akademisk fremgang.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Studiegrupper</h3>
            <p className="text-muted text-sm">Finn og bli med i studiegrupper for fagene dine. Samarbeid i sanntid med medstudenter.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Læring med andre</h3>
            <p className="text-muted text-sm">Del kunnskap, still spørsmål og hjelp andre med å vokse gjennom samarbeidslæring.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 text-left shadow-sm">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-fg font-semibold text-lg mb-2">Følg fremgangen din</h3>
            <p className="text-muted text-sm">Følg med på din akademiske reise og feir milepæler sammen med studiefellesskapet.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-accent text-accent-fg px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-accent-hover transition-colors duration-200 shadow-sm"
          >
            Kom i gang
          </Link>
          <Link
            href="/"
            className="bg-surface border border-border text-fg px-8 py-3.5 rounded-lg font-semibold text-base hover:border-accent hover:text-accent-text transition-all duration-200 shadow-sm"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
