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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">For Teachers</h1>
          <p className="text-lg opacity-90">
            Resources and guidance to help your students use AI responsibly and ethically
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Welcome Section */}
        <div className="mb-12 bg-blue-50 border-2 border-blue-200 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome, Educators!</h2>
          <p className="text-gray-700 text-lg mb-4">
            The rise of AI in education is reshaping how we teach, assess, and learn. This resource package provides you with ready-to-use materials, discussion prompts, and assessment strategies to help your students navigate the ethical complexities of AI.
          </p>
        </div>

        {/* Teaching Strategies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Teaching Strategies</h2>
          <div className="space-y-6">
            {[
              {
                title: "Be Clear About Your Policy",
                desc: "Include explicit AI use guidelines in your syllabus. Don't assume students understand what's acceptable.",
                tips: [
                  "Specify whether AI use is allowed, prohibited, or conditional",
                  "Explain what disclosure or citation is required",
                  "Define what constitutes academic dishonesty with AI",
                  "Remind students that policies may vary by course and assignment",
                ],
              },
              {
                title: "Facilitate Critical Discussions",
                desc: "Create space for students to grapple with AI ethics questions.",
                tips: [
                  "Use discussion prompts: 'When is AI use helpful vs. harmful?'",
                  "Bring in real-world case studies and current AI news",
                  "Encourage students to test AI systems themselves",
                  "Discuss potential biases and limitations of specific tools",
                ],
              },
              {
                title: "Design AI-Aware Assignments",
                desc: "Structure assignments that leverage AI's strengths while requiring genuine learning.",
                tips: [
                  "Ask for AI use disclosures: 'Did you use AI? How? What did you learn?'",
                  "Require students to defend their thinking and choices",
                  "Include assignments that can't be easily automated",
                  "Build in reflective components about AI's role",
                ],
              },
              {
                title: "Use AI as a Teaching Tool",
                desc: "Integrate AI into your teaching to model responsible use.",
                tips: [
                  "Use AI in class to demonstrate capabilities and limitations",
                  "Show students how to evaluate AI outputs critically",
                  "Discuss hallucinations and biases with live examples",
                  "Model best practices for transparency and accuracy checking",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                <p className="text-gray-600 mb-4">{section.desc}</p>
                <div>
                  <p className="font-semibold text-gray-700 mb-3">Key Points:</p>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold">→</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Syllabus Language */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sample Syllabus Language</h2>
          <div className="bg-gray-50 border-2 border-gray-300 p-8 rounded-lg">
            <h3 className="font-bold text-lg mb-4 text-gray-800">AI and Academic Integrity Policy</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Acceptable Uses:</strong> Students may use AI tools to brainstorm ideas, understand difficult concepts, or get feedback on writing structure. However, the work submitted must be substantially your own.
              </p>
              <p>
                <strong>Required Disclosure:</strong> If you use AI tools significantly in completing an assignment, please note this in a comment or footnote explaining what you used and how (e.g., "I used ChatGPT to help brainstorm essay ideas").
              </p>
              <p>
                <strong>Unacceptable Uses:</strong> Submitting AI-generated work as your own, using AI during exams without permission, or copying code without understanding it violates academic integrity standards.
              </p>
              <p>
                <strong>Questions?</strong> If you're unsure whether your AI use is appropriate, ask me before submitting your work. It's better to be transparent than face consequences.
              </p>
            </div>
          </div>
        </div>

        {/* Discussion Prompts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Discussion & Essay Prompts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "What does academic integrity mean in an age of AI? Has the definition changed?",
              "Can AI ever be used unethically in your field of study? Give specific examples.",
              "How might AI bias affect research or decision-making in your discipline?",
              "If AI can write a better essay than you, should students focus on different skills?",
              "What responsibilities do AI companies have to protect user privacy?",
              "How might overreliance on AI affect human learning and critical thinking?",
              "In what careers will AI literacy be essential in the next 10 years?",
              "How should universities update their academic integrity policies for the AI era?",
            ].map((prompt, idx) => (
              <div key={idx} className="bg-white border-l-4 border-teal-500 p-4 rounded">
                <p className="text-gray-700 font-medium">{prompt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Tips */}
        <div className="bg-teal-50 border-2 border-teal-300 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold text-teal-700 mb-6">Assessing AI-Era Learning</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Emphasize Process Over Product",
                desc: "Ask students to document their thinking, choices, and revisions.",
              },
              {
                title: "Test Deep Understanding",
                desc: "Include oral exams, live coding sessions, or in-class discussions.",
              },
              {
                title: "Require Critical Analysis",
                desc: "Ask students to evaluate and critique AI outputs, not just use them.",
              },
              {
                title: "Check for Authenticity",
                desc: "Listen for the student's own voice and perspective in their work.",
              },
              {
                title: "Use Multiple Assessment Methods",
                desc: "Combine exams, projects, presentations, and reflective writing.",
              },
              {
                title: "Build in AI Experience",
                desc: "Let students work with AI tools in class so you understand their learning.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded border border-teal-300">
                <p className="font-semibold text-gray-800 mb-2">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to engage your students?</h3>
          <p className="text-gray-700 mb-6">
            Share these resources with your class and facilitate meaningful conversations about responsible AI use.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/guidelines" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View Guidelines
            </Link>
            <Link href="/quiz" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              Use Quiz in Class
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}