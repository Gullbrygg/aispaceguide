import Link from "next/link";

export default function UniversityPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Veiledning for Institusjoner</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Implementeringsrammeverk for AI-retningslinjer på institusjonen din
          </p>
        </div>
      </section>

      {/* Implementation Steps */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Implementeringsfaser</h2>
        <div className="space-y-6">
          {[
            {
              phase: "1",
              title: "Kartlegge nåværende praksis",
              description: "Undersøk hvordan studenter og lærere bruker AI-verktøy i dag",
              actions: [
                "Gjennomfør spørreundersøkelse blant lærere og studenter",
                "Samle inn eksisterende AI-retningslinjer fra fagene",
                "Identifiser beste praksis som allerede er i bruk",
              ],
            },
            {
              phase: "2",
              title: "Utvikle institusjonelle standarder",
              description: "Lag ett sett med normer for hele institusjonen",
              actions: [
                "Danne arbeidsgruppe med lærere, studenter og administrasjon",
                "Diskuter etiske retningslinjer for AI-bruk",
                "Utarbeid helhetlige AI-retningslinjer",
              ],
            },
            {
              phase: "3",
              title: "Implementer og kommuniser",
              description: "Rull ut retningslinjer til alle fakulteter",
              actions: [
                "Organiser workshops for fagpersonalet",
                "Publiser retningslinjer på institusjonens nettsted",
                "Lag informasjonskampanjer rettet mot studenter",
              ],
            },
            {
              phase: "4",
              title: "Oppfølging og evaluering",
              description: "Følg opp implementeringen og gjør justeringer",
              actions: [
                "Samle tilbakemeldinger fra lærere og studenter",
                "Overvåk etterlevelse av retningslinjene",
                "Gjør nødvendige oppdateringer og forbedringer",
              ],
            },
          ].map((step, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl flex items-center justify-center flex-shrink-0">
                  {step.phase}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 mb-4 font-light">{step.description}</p>
                  <ul className="space-y-2">
                    {step.actions.map((action, i) => (
                      <li key={i} className="flex gap-3 text-gray-700 text-sm">
                        <span className="text-blue-600 flex-shrink-0">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Template */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <h2 className="text-apple-md text-gray-900 mb-12">Mal for institusjonell policy</h2>
        <div className="glass p-8 rounded-2xl space-y-6 font-light text-gray-800 text-sm">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">📋 POLICY FOR ANSVARLIG AI-BRUK</h3>
            <p className="mb-4">
              [Institusjonens navn] er forpliktet til å fremme ansvarlig og etisk bruk av kunstig intelligens (AI) blant studenter, lærere og ansatte.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Retningslinjer for AI-bruk</h3>
            <ul className="space-y-2 ml-4">
              <li><span className="font-semibold">Akseptabel bruk:</span> Bruke AI som læremiddel, hjelpemiddel for forståelse og redigeringsstøtte</li>
              <li><span className="font-semibold">Uakseptabel bruk:</span> Kopiere innhold, presentere AI-arbeid som eget, juks</li>
              <li><span className="font-semibold">Dokumentering:</span> Studenter må dokumentere AI-bruk i oppgavearbeid</li>
              <li><span className="font-semibold">Verifisering:</span> All informasjon fra AI må verifiseres før bruk</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Ansvar</h3>
            <div className="space-y-2 ml-4">
              <p><span className="font-semibold">Ledelse:</span> Sette standard og gi ressurser for opplæring</p>
              <p><span className="font-semibold">Lærere:</span> Integrere AI-etikk i undervisning og presisere bruk per oppgave</p>
              <p><span className="font-semibold">Studenter:</span> Følge retningslinjer og bruke AI ansvarlig</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Konsekvenser</h3>
            <p>Brudd på denne policyen kan resultere i disiplinære tiltak i henhold til institusjonens disiplinkode.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Implementeringstidslinje (3 måneder)</h2>
        <div className="space-y-4">
          {[
            { month: "Måned 1", activities: ["Danne arbeidsgruppe", "Kartlegge nåværende praksis", "Begynne policyutvikling"] },
            { month: "Måned 2", activities: ["Ferdigstille policy", "Planlegge implementering", "Forberede kurs for fagpersonalet"] },
            { month: "Måned 3", activities: ["Gjennomføre workshops", "Offentliggjøre retningslinjer", "Starte informasjonskampanje"] },
          ].map((step, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl hover:bg-white transition-all">
              <h3 className="font-bold text-gray-900 mb-3">{step.month}</h3>
              <ul className="space-y-2">
                {step.activities.map((activity, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 text-sm">
                    <span className="text-blue-600 flex-shrink-0">→</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <h2 className="text-apple-md text-gray-900 mb-12">Ressurser for institusjoner</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Retningslinjer for alle", url: "/guidelines" },
            { title: "Ressurser for lærere", url: "/about/teacher" },
            { title: "AI-etikk quiz", url: "/quiz" },
            { title: "Veiledning for studenter", url: "/about/student" },
          ].map((resource, idx) => (
            <Link
              key={idx}
              href={resource.url}
              className="glass p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all group text-center"
            >
              <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{resource.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
