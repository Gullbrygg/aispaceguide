import Link from "next/link";

export default function TeacherPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Ressurser for Lærere</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Verktøy og strategier for å veilede elever om ansvarlig AI-use
          </p>
        </div>
      </section>

      {/* Strategies */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Undervisningsstrategier</h2>
        <div className="space-y-6">
          {[
            {
              title: "Introduser AI-etikk i klasserommet",
              tips: [
                "Begynn med diskusjon om akseptabel vs. uakseptabel bruk",
                "Del eksempler på både korrekt og feil AI-bruk",
                "Be elevene diskutere scenarioer i grupper",
              ],
            },
            {
              title: "Lag tydelige retningslinjer for oppgaver",
              tips: [
                "Spesifiser hva som er tillatt AI-bruk for hver oppgave",
                "Gi eksempler på hvordan elever kan bruke AI ansvarlig",
                "Forklare konsekvensene av uakseptabel bruk",
              ],
            },
            {
              title: "Vurder elevenes AI-bruk",
              tips: [
                "Be elevene dokumentere hvordan de brukte AI",
                "Spør om kilder og verifikasjonsmetoder",
                "Vurder tanken bak AI-bruken, ikke bare resultatet",
              ],
            },
            {
              title: "Faglig dialog om AI",
              tips: [
                "Oppfordring til elevene til å dele erfaringer",
                "Diskuter nyere AI-trender og konsekvenser",
                "Forbind AI-etikk med bredere samfunnsdebatten",
              ],
            },
          ].map((strategy, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg text-gray-900 mb-4">{strategy.title}</h3>
              <ul className="space-y-2">
                {strategy.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Template */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <h2 className="text-apple-md text-gray-900 mb-12">Mal for oppgavebeskrivelse</h2>
        <div className="glass p-8 rounded-2xl font-light text-gray-800 space-y-4 text-sm">
          <p className="font-bold">📋 AI OG DENNE OPPGAVEN</p>
          <p>
            For denne oppgaven har du lov til å bruke AI-verktøy som ChatGPT, Microsoft Copilot eller lignende på følgende måter:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>✓ Bruke AI som brainstorming-verktøy</li>
            <li>✓ Få hjelp til å forstå konsepter</li>
            <li>✓ Sjekke grammatikk og stavning</li>
          </ul>
          <p className="font-bold mt-4">Du er IKKE tillatt til:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>✗ Kopiere hele eller store deler fra AI</li>
            <li>✗ Presentere AI-generert innhold som ditt eget</li>
            <li>✗ Bruke AI til å unngå å gjøre oppgavene selv</li>
          </ul>
          <p className="font-bold mt-4">Hvis du bruker AI, må du:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Dokumentere hvordan du brukte AI</li>
            <li>Forklare hva du lærte av å bruke det</li>
            <li>Verifisere all informasjon fra AI med kilder</li>
          </ul>
        </div>
      </section>

      {/* Discussion Prompts */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Diskusjonsspørsmål</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Hvordan påvirker AI akademisk integritet i høyere utdanning?",
            "Er det etisk å bruke AI til å lage innhold som presenteres som menneskelaget?",
            "Hvilke jobber eller ferdigheter blir mindre relevante med AI?",
            "Hvordan kan vi sikre at AI-bruk ikke forverrer ulikhet?",
            "Hva betyr 'kritisk tenking' i en verden med AI?",
            "Hvordan bør samfunnet regulere AI-teknologi?",
          ].map((prompt, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl hover:bg-white transition-all">
              <p className="text-gray-900 font-light">{prompt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <h2 className="text-apple-md text-gray-900 mb-12">Ressurser for lærere</h2>
        <div className="space-y-4">
          {[
            { title: "AIGuidebook Guidelines", url: "/guidelines" },
            { title: "AI Ethics Quiz for Students", url: "/quiz" },
            { title: "Student Scenarios", url: "/about/student" },
          ].map((resource, idx) => (
            <Link
              key={idx}
              href={resource.url}
              className="glass p-4 rounded-xl hover:bg-white transition-all flex items-center justify-between group"
            >
              <span className="font-semibold text-gray-900">{resource.title}</span>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
