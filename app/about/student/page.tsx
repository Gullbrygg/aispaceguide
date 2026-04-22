import Link from "next/link";

export default function StudentPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Retningslinjer for Studenter</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Lær hvordan du bruker AI verktøy på en måte som opprettholder akademisk integritet
          </p>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Eksempler fra virkeligheten</h2>
        <div className="space-y-8">
          {[
            {
              scenario: "Du sliter med forståelsen av et vanskelig konsept fra forelesningen",
              good: [
                "Spørre AI om en forklaring av konseptet",
                "Bruke AI-forklaringen som startpunkt, deretter lese læreboken",
                "Notere ned egne forståelser etter AI-hjelpen",
              ],
              bad: ["Kopiere hele AI-forklaringen inn i notatene dine", "Presentere den som ditt eget arbeid"],
            },
            {
              scenario: "Du må skrive ett essay på 5 sider. Du vet ikke hvordan du skal begynne",
              good: [
                "Be AI om hjelp til å strukturere en outline",
                "Skrive essayet selv basert på outlin-en",
                "Bruke AI kun som kvalitetskontroll for grammatikk",
              ],
              bad: ["Bruke AI til å skrive hele essayet", "Kopiere og lime inn AI-tekst", "Ikke tilpasse AI-innholdet"],
            },
            {
              scenario: "Du finner interessant statistikk fra AI-verktøyet og vil bruke det i oppgaven",
              good: [
                "Spørre AI om originalkilde til statistikken",
                "Finne den originale kilden og verifisere informasjonen",
                "Sitere den originale kilden, ikke AI-verktøyet",
              ],
              bad: ["Bruke statistikken uten verifisering", "Sitere AI som kilde direkteheh"],
            },
          ].map((item, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Scenario {idx + 1}: {item.scenario}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <span className="text-green-700 font-bold text-lg">✓ Gjør dette</span>
                  <ul className="mt-4 space-y-2">
                    {item.good.map((g, i) => (
                      <li key={i} className="text-gray-700 text-sm">{g}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <span className="text-red-700 font-bold text-lg">✗ Ikke gjør dette</span>
                  <ul className="mt-4 space-y-2">
                    {item.bad.map((b, i) => (
                      <li key={i} className="text-gray-700 text-sm">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <h2 className="text-apple-md text-gray-900 mb-12">Sjekkliste for oppgaver</h2>
        <div className="glass p-8 rounded-2xl space-y-4">
          {[
            "Jeg har lest oppgavebeskrivelsen for AI-retningslinjer",
            "Jeg forstår hva som er akseptabel bruk av AI for denne oppgaven",
            "Jeg har brukt AI som verktøy, ikke som erstatning",
            "Jeg kan forklare alt innholdet jeg gjorde",
            "Jeg har verifisert alle fakta med kilder",
            "Jeg har parafrasert AI-innholdet og gjort det mitt eget",
            "Læreren ville vært glad over hvordan jeg brukte AI",
          ].map((check, idx) => (
            <label key={idx} className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded accent-blue-600"
              />
              <span className="text-gray-700 group-hover:text-gray-900 font-light">{check}</span>
            </label>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <div className="glass p-12 rounded-2xl text-center">
          <h2 className="text-apple-sm text-gray-900 mb-6">Klar til å teste kunnskapen?</h2>
          <Link
            href="/quiz"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all hover:shadow-lg"
          >
            Ta quizen
          </Link>
        </div>
      </section>
    </div>
  );
}
