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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">For Students</h1>
          <p className="text-lg opacity-90">
            Learn how to use AI responsibly and ethically in your academic journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Welcome Section */}
        <div className="mb-12 bg-purple-50 border-2 border-purple-200 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome, Students!</h2>
          <p className="text-gray-700 text-lg mb-4">
            AI tools like ChatGPT, Claude, and Copilot can be powerful learning aids. But with great power comes great responsibility. This guide will help you understand how to use these tools ethically and effectively while maintaining academic integrity.
          </p>
        </div>

        {/* Key Topics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Your AI Learning Guide</h2>
          <div className="space-y-8">
            {[
              {
                icon: "✅",
                title: "Acceptable Uses",
                items: [
                  "Summarizing complex texts or concepts",
                  "Brainstorming ideas for essays and projects",
                  "Understanding difficult topics through AI explanations",
                  "Getting grammar and writing feedback",
                  "Debugging code and understanding programming concepts",
                  "Creating outlines and study guides",
                ],
              },
              {
                icon: "❌",
                title: "Unacceptable Uses",
                items: [
                  "Submitting AI-written essays as your own work",
                  "Copying code without understanding it",
                  "Using AI during exams without permission",
                  "Submitting AI-generated work without attribution",
                  "Sharing confidential or sensitive information",
                  "Using AI to violate course policies",
                ],
              },
              {
                icon: "🔒",
                title: "Privacy & Security",
                items: [
                  "Never paste personal identifying information",
                  "Avoid entering sensitive academic data",
                  "Be aware that public AI tools store your inputs",
                  "Use university-approved tools when available",
                  "Understand GDPR compliance when relevant",
                  "Assume your data is not private",
                ],
              },
              {
                icon: "🚨",
                title: "AI Limitations to Know",
                items: [
                  "AI can confidently provide false information (hallucinations)",
                  "Citations may be completely made up",
                  "AI has biases from its training data",
                  "Results may be outdated or incomplete",
                  "Always verify AI outputs with reliable sources",
                  "Don't blindly trust any AI recommendation",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  {section.title}
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Real Scenarios */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Real Scenarios - What Would You Do?</h2>
          <div className="space-y-6">
            {[
              {
                scenario: "Your professor assigns an essay on climate change. You use ChatGPT to brainstorm ideas and understand the topic better. Should you mention this?",
                answer: "Yes! It's good practice to mention that you used AI for brainstorming. However, check your syllabus first—policies vary.",
              },
              {
                scenario: "You ask ChatGPT for code help on a programming assignment. It gives you a working solution. Can you submit it?",
                answer: "Not directly. Use it to understand the logic, but write your own code. You should be able to explain every line.",
              },
              {
                scenario: "The night before your online exam, you wonder if you can use AI during the test. The syllabus doesn't mention it.",
                answer: "Don't assume! Email your professor to ask. Exams are usually off-limits unless explicitly allowed.",
              },
              {
                scenario: "AI gives you a perfect quote from a famous researcher to include in your essay. Should you verify it?",
                answer: "Absolutely! AI often hallucinates citations. Always verify quotes and citations independently.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">Scenario {idx + 1}:</h4>
                <p className="text-gray-700 mb-4 italic">{item.scenario}</p>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-green-600">
                  <p className="font-semibold text-green-700 mb-1">✓ Best Answer:</p>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Checklist */}
        <div className="bg-green-50 border-2 border-green-300 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold text-green-700 mb-6">Before You Use AI:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Check your course syllabus for AI policies",
              "Ask your professor if you're unsure",
              "Ensure you understand the work, not just copying it",
              "Never enter sensitive personal information",
              "Always verify facts and citations",
              "Disclose AI use if required",
              "Use it as a learning tool, not a shortcut",
              "Protect your academic integrity",
            ].map((item, idx) => (
              <label key={idx} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-purple-50 border-2 border-purple-200 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to learn more?</h3>
          <p className="text-gray-700 mb-6">
            Check out our comprehensive guidelines and take the interactive quiz to test your knowledge.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/guidelines" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Read Guidelines
            </Link>
            <Link href="/quiz" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Take Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
                      <Link href={"/about/university"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">Universitet LENKE</Link></div>
                    <p className="">¯\_(ツ)_/¯ Skriv tekst her eller noe : TEST...TEST...TEST...TEST...TEST...TEST...TEST...</p>
                </div>
            </div>
            <div className="w-full mt-5 min-h-[20vh] border-2 rounded-md">
              weeewooo
            </div>
            {/* </form> */}
        </div>
      </>  
    );
}