import Link from "next/link";

export default function UniversityPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Institusjonsrettleiding</h1>
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
                "Gjennomfør befaring blant lærere og studenter",
                "Samle inn eksisterende AI-retningslinjer fra fagene",
                "Identifiser beste praksis allerede i bruk",
              ],
            },
            {
              phase: "2",
              title: "Utvikle institusjonale standarder",
              description: "Lag ett sett av normer for hele institusjonen",
              actions: [
                "Danne arbeidsgruppe med læreere, studenter og administrasjon",
                "Diskuter etiske retningslinjer for AI-bruk",
                "Lag omfattende AI-retningslinjer",
              ],
            },
            {
              phase: "3",
              title: "Implementer og kommuniser",
              description: "Roll ut retningslinjer til alle fakulteter",
              actions: [
                "Organiser workshops for fagpersonale",
                "Publiser retningslinjer på institusjonets nettsted",
                "Lag kampanjer for studenter",
              ],
            },
            {
              phase: "4",
              title: "Samarbeid og monitorering",
              description: "Følg opp implementeringen og gjør justeringer",
              actions: [
                "Samle tilbakemeldinger fra lærere og studenter",
                "Monitorering av etterfølging av retningslinjene",
                "Gjøre nødvendige oppdateringer og forbedringer",
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
              <li><span className="font-semibold">Akseptabel bruk:</span> Bruke AI som læremiddel, hjelpemiddel for forståelse, redaktørstötte</li>
              <li><span className="font-semibold">Uakseptabel bruk:</span> Kopiere innhold, presentere AI-arbeid som eget arbeid, juksing</li>
              <li><span className="font-semibold">Dokumentering:</span> Studenter må dokumentere AI-bruk i oppgavearbeid</li>
              <li><span className="font-semibold">Verifisering:</span> All informasjon fra AI må verifiseres før bruk</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Ansvar</h3>
            <div className="space-y-2 ml-4">
              <p><span className="font-semibold">Ledelse:</span> Sette standard, gi ressurser for opplæring</p>
              <p><span className="font-semibold">Lærere:</span> Integrere AI-etikk i undervisning, presisere bruk per oppgave</p>
              <p><span className="font-semibold">Studenter:</span> Følge retningslinjer, bruke AI ansvarlig</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Konsekvenser</h3>
            <p>Brudd på denne policyen kan resultere i disiplинære tiltak i henhold til institusjonens disiplinkode.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Implementeringstidslinje (3 måneder)</h2>
        <div className="space-y-4">
          {[
            { month: "Måned 1", activities: ["Danne arbeidsgruppe", "Kartlegge nåværende praksis", "Begynne policydeveloping"] },
            { month: "Måned 2", activities: ["Finalisere policy", "Planlegge implementering", "Forberede fagpersonallkurs"] },
            { month: "Måned 3", activities: ["Gjennomføre workshops", "Offentliggjøre retningslinjer", "Starte kommuniseringskampanje"] },
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
            { title: "Guidelines for all", url: "/guidelines" },
            { title: "Teacher Resources", url: "/about/teacher" },
            { title: "AI Ethics Quiz", url: "/quiz" },
            { title: "Student Guidance", url: "/about/student" },
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
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">For Institutions</h1>
          <p className="text-lg opacity-90">
            Comprehensive guidance for implementing consistent AI policies across your organization
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Welcome Section */}
        <div className="mb-12 bg-green-50 border-2 border-green-200 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome, Leadership & Administration</h2>
          <p className="text-gray-700 text-lg mb-4">
            As AI rapidly evolves, institutions need clear, consistent policies to guide students, faculty, and staff. This resource helps you establish institutional standards that promote learning, protect integrity, and ensure fairness.
          </p>
        </div>

        {/* Implementation Framework */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Implementation Framework</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Assess Current State",
                tasks: [
                  "Survey faculty: What AI policies exist currently?",
                  "Interview students: Understanding of AI ethics?",
                  "Identify gaps in guidance and consistency",
                  "Review accreditation requirements related to academic integrity",
                ],
              },
              {
                step: 2,
                title: "Develop Institutional AI Guidelines",
                tasks: [
                  "Create a university-wide AI ethics statement",
                  "Define acceptable vs. unacceptable uses by context",
                  "Establish privacy and data protection standards",
                  "Create templates for individual course policies",
                ],
              },
              {
                step: 3,
                title: "Train Faculty & Staff",
                tasks: [
                  "Offer professional development workshops",
                  "Share assessment strategies for the AI era",
                  "Provide ready-to-use classroom materials",
                  "Create peer learning communities",
                ],
              },
              {
                step: 4,
                title: "Communicate to Students",
                tasks: [
                  "Include AI ethics in orientation",
                  "Distribute accessible guidebooks and resources",
                  "Promote through student channels and platforms",
                  "Create FAQs addressing common concerns",
                ],
              },
              {
                step: 5,
                title: "Monitor & Evolve",
                tasks: [
                  "Collect feedback from students and faculty",
                  "Stay updated on AI developments and best practices",
                  "Revise policies as needed annually",
                  "Share successes and lessons learned",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="border-2 border-gray-200 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                    {section.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <div className="ml-16 space-y-2">
                  {section.tasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Template */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sample Institutional Policy Template</h2>
          <div className="bg-gray-50 border-2 border-gray-300 p-8 rounded-lg space-y-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">University AI Ethics Policy</h3>
              <p className="text-gray-600 mt-2 italic">[University Name] is committed to fostering responsible AI use that supports learning, maintains academic integrity, and protects individual rights.</p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-800">Principles</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
                <li>Transparency: Disclose AI use clearly and honestly</li>
                <li>Integrity: Maintain academic and professional standards</li>
                <li>Privacy: Protect personal and sensitive information</li>
                <li>Fairness: Recognize and mitigate AI bias</li>
                <li>Learning: Use AI to enhance, not replace, human development</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-800">Guidelines for Students</h4>
              <p className="text-gray-700 text-sm mt-2">
                Students may use approved AI tools to brainstorm, learn, and improve their work. Individual courses may have specific policies. Students must disclose significant AI use and maintain academic integrity. Unauthorized AI use during exams or assessments violates the academic integrity code.
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-800">Enforcement</h4>
              <p className="text-gray-700 text-sm mt-2">
                Violations of this policy follow the same procedures as other academic integrity violations. Faculty should clearly communicate expectations. The Dean of Students office will handle reported violations.
              </p>
            </div>
          </div>
        </div>

        {/* Key Areas to Address */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Key Considerations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "📋",
                title: "Academic Integrity",
                desc: "Clear definitions of acceptable AI use, disclosure requirements, and consequences for violations.",
              },
              {
                icon: "🔐",
                title: "Data Privacy & Security",
                desc: "Ensure compliance with GDPR, FERPA, and institutional data protection standards.",
              },
              {
                icon: "½⚖️",
                title: "Bias & Fairness",
                desc: "Address potential biases in AI systems, especially in admissions, grading, and support services.",
              },
              {
                icon: "🛡️",
                title: "Technology Access",
                desc: "Ensure all students have equitable access to approved AI tools and training.",
              },
              {
                icon: "📚",
                title: "Faculty Development",
                desc: "Support faculty in understanding AI capabilities and updating their pedagogy.",
              },
              {
                icon: "❓",
                title: "Transparent Communication",
                desc: "Create accessible resources explaining policies to all stakeholders.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border-l-4 border-green-600 p-6 rounded">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rollout Timeline */}
        <div className="bg-emerald-50 border-2 border-emerald-300 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold text-emerald-700 mb-6">Suggested Implementation Timeline</h3>
          <div className="space-y-4">
            {[
              { phase: "Month 1-2", task: "Stakeholder assessment & policy draft" },
              { phase: "Month 3", task: "Leadership approval & faculty consultation" },
              { phase: "Month 4-5", task: "Faculty training & resource preparation" },
              { phase: "Month 6", task: "Launch & communicate to campus community" },
              { phase: "Ongoing", task: "Monitor, collect feedback, refine annually" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white px-4 py-2 rounded font-bold whitespace-nowrap">
                  {item.phase}
                </div>
                <p className="text-gray-700 pt-2">{item.task}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-green-50 border-2 border-green-200 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to build institutional AI literacy?</h3>
          <p className="text-gray-700 mb-6">
            Share these resources across your institution to create a culture of responsible AI use.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/guidelines" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              View Complete Guidelines
            </Link>
            <Link href="/about/teacher" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
              Faculty Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}