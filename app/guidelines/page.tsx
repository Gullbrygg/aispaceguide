"use client";

import { useState } from "react";

export default function Guidelines() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const sections = [
    {
      title: "Akseptabel bruk",
      emoji: "✅",
      content: [
        "Bruke AI til å forklare vanskelige konsepter",
        "Generere innledninger som et utgangspunkt for egen skriving",
        "Bruke AI som verktøy for sjekking av grammatikk",
        "Lage sammendrag av tekster du har lest",
        "Få hjelp til å stille bedre spørsmål om stoffet",
      ],
      tools: ["ChatGPT", "Microsoft Copilot", "Google AI"],
    },
    {
      title: "Uakseptabel bruk",
      emoji: "❌",
      content: [
        "Kopiere hele oppgaver som AI har skrevet",
        "Putte hele essays fra AI direkte inn i arbeid",
        "Bruke AI til å skaffe svar på eksamener",
        "Presentere AI-generert innhold som ditt eget arbeid",
        "Lure på vurderingen ved å bruke AI ukritisk",
      ],
      tools: ["Ikke bruk AI på disse måtene"],
    },
    {
      title: "Personvern og sikkerhet",
      emoji: "🔐",
      content: [
        "Aldri dele personlig identifiseringsinformasjon",
        "Vær forsiktig med sensitive data fra dine kurser",
        "Sjekk personvernpolicyen til AI-verktøyet",
        "Vit at AI-verktøy kan lagre og bruke ditt innput",
        "Bruk sterke passord og aktivert tofaktorgodkjenning",
      ],
      tools: ["Sikt.no - Norsk IT-sikkerhet", "Microsoft Security"],
    },
    {
      title: "AI-hallusinasioner",
      emoji: "🌀",
      content: [
        "AI kan finne på sannlytende, men falske fakta",
        "Alltid verifiser informasjon fra AI med kilder",
        "Spør AI om kilder når det gir tall eller sitater",
        "Vær skeptisk til detaljer som virker svært spesifikke",
        "Bruk AI som inspirasjon, ikke som endelig svar",
      ],
      tools: ["ChatGPT", "Copilot", "Verificer med Google Scholar"],
    },
    {
      title: "Algoritmeisk bias",
      emoji: "⚖️",
      content: [
        "AI-modeller trenes på mennesker, så de kan ha bias",
        "Bias kan oppstå basert på kjønn, rase, eller annen identitet",
        "Være klar over når AI gir ensidig informasjon",
        "Spør AI om forskjellige perspektiver på et tema",
        "Kombiner AI-svar med kritisk tenking og diverse kilder",
      ],
      tools: ["Microsoft Responsible AI", "Google AI Principles"],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Retningslinjer for AI</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Lær hvordan du bruker AI på en ansvarlig og etisk måte
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{section.emoji}</span>
                  <h2 className="text-apple-sm text-gray-900 text-left">{section.title}</h2>
                </div>
                <span className={`text-2xl transition-transform duration-300 ${expanded === idx ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {expanded === idx && (
                <div className="px-6 pb-6 border-t border-gray-200/30 bg-white/50">
                  <ul className="space-y-3 mb-6">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-700">
                        <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {section.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 sm:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-apple-md text-gray-900 mb-12">Sjekkliste før en oppgave</h2>
          <div className="glass p-8 rounded-2xl space-y-4">
            {[
              "Har jeg lest oppgavebeskrivelsen nøye for retningslinjer om AI?",
              "Har jeg brukt AI som verktøy, ikke som erstatning for mitt eget arbeid?",
              "Kan jeg forklare og forsvare all innholdet jeg har med fra AI?",
              "Har jeg verifisert faktaer fra AI med troverdige kilder?",
              "Har jeg parafrasert og integrert AI-innhold med mit eget språk?",
              "Har jeg sitert eller kreditert AI-verktøyet hvis nødvendig?",
              "Ville læreren min godtatt denne bruken av AI?",
            ].map((item, idx) => (
              <label key={idx} className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 rounded accent-blue-600"
                />
                <span className="text-gray-700 group-hover:text-gray-900">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

