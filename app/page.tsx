import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-24 px-6 sm:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="accent-pill mb-6">Premium AI-veiledning</div>
          <h1 className="text-apple-lg text-gray-900 mb-6">
            Din guide til ansvarlig bruk av AI
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-10 font-light leading-relaxed">
            Lær hvordan du bruker AI-verktøy effektivt samtidig som du opprettholder akademisk integritet, beskytter personvernet ditt og bygger tillit i studiearbeidet.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Link href="/guidelines" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-950 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200">
              Start læringsløpet
            </Link>
            <Link href="/quiz" className="border border-slate-300 bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition duration-300 focus:outline-none focus:ring-4 focus:ring-slate-200">
              Test kunnskapen →
            </Link>
          </div>
          <div className="text-sm text-muted">
            En moderne og norsk læringsopplevelse for studenter, lærere og utdanningsinstitusjoner som ønsker tydelige regler, klar veiledning og gode eksempler.
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-6 sm:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-apple-md text-gray-900">
                Anbefalte verktøy
              </h2>
              <p className="max-w-2xl text-muted mt-3">
                Vi viser hvilke AI-verktøy som løfter læringsarbeidet uten å ofre kvalitet eller akademisk integritet.
              </p>
            </div>
            <span className="accent-pill">Lett å sammenligne · Sikkert å bruke · Akseptabelt i utdanning</span>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "ChatGPT", url: "openai.com", icon: "🤖" },
              { name: "Microsoft Copilot", url: "copilot.microsoft.com", icon: "🚀" },
              { name: "Sikt.no", url: "sikt.no", icon: "🔬" },
              { name: "Google AI", url: "google.com/ai", icon: "🔍" },
            ].map((tool) => (
              <a
                key={tool.name}
                href={`https://${tool.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-soft text-3xl mb-4 transition-transform group-hover:scale-105">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-sm text-muted">{tool.url}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="py-20 px-6 sm:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-apple-md text-center text-gray-900 mb-16">
            Velg din vei
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍🎓",
                title: "For Studenter",
                description: "Lær hvordan du bruker AI ansvarlig i studiene dine.",
                href: "/about/student",
              },
              {
                icon: "👩‍🏫",
                title: "For Lærere",
                description: "Ressurser for å veilede elever om ansvarlig AI-bruk.",
                href: "/about/teacher",
              },
              {
                icon: "🏫",
                title: "For Institusjoner",
                description: "Rammeverk for implementering av AI-retningslinjer.",
                href: "/about/university",
              },
            ].map((path, idx) => (
              <Link
                key={idx}
                href={path.href}
                className="glass group p-8 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-soft text-4xl transition-transform group-hover:scale-110">
                  {path.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{path.title}</h3>
                <p className="text-gray-700 mb-4 font-light">{path.description}</p>
                <span className="text-accent font-semibold">Utforsk →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 sm:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-apple-md text-gray-900">Slik fungerer AIGuidebook</h2>
            <p className="max-w-2xl mx-auto text-muted mt-3">
              En strukturert læringssti som kombinerer veiledning, kontrollspørsmål, og praktiske råd for å gi deg tillit til å bruke AI på riktig måte.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Lær det grunnleggende",
                description: "Forstå hva som er akseptabelt og hvordan AI kan brukes som støtte, ikke som snarvei.",
              },
              {
                title: "Bruk det trygt",
                description: "Få klare regler for personvern, kilder og digital etikk i hver oppgave.",
              },
              {
                title: "Vis at du kan det",
                description: "Fullfør quizen og bruk de smarte ressursene for å vise at du jobber ansvarlig.",
              },
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-soft text-xl mb-4">{idx + 1}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Topics */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-16">
            <div>
              <h2 className="text-apple-md text-gray-900">Viktige emner</h2>
              <p className="text-muted mt-3 max-w-xl">
                De sentrale temaene hver student og lærer bør kunne før de bruker AI i faglige oppgaver.
              </p>
            </div>
            <span className="accent-pill">Klar, relevant, norsk</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Akademisk integritet", emoji: "📚" },
              { title: "Personvern og sikkerhet", emoji: "🔐" },
              { title: "AI-hallusinasioner", emoji: "🌀" },
              { title: "Algoritmeisk bias", emoji: "⚖️" },
              { title: "Etisk AI-bruk", emoji: "✨" },
              { title: "Kritisk tenking", emoji: "🧠" },
            ].map((topic, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-xl border border-slate-200 hover:bg-white transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-warm-accent text-2xl transition-transform group-hover:scale-110">
                  {topic.emoji}
                </div>
                <h3 className="font-bold text-gray-900">{topic.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto glass p-16 rounded-[2rem] border border-slate-200 shadow-2xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-4">Ta steget videre</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Bygg trygghet rundt AI i studiene dine.
            </h2>
            <p className="max-w-2xl mx-auto text-slate-700 mb-10 leading-relaxed">
              Få ferdige retningslinjer, konkrete eksempler og en interaktiv quiz som hjelper deg å bruke AI på en akademisk forsvarlig måte.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/guidelines" className="bg-slate-900 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-slate-950 transition-all duration-300">
                Start nå
              </Link>
              <Link href="/quiz" className="border border-slate-300 text-slate-900 px-10 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300">
                Ta quizen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
