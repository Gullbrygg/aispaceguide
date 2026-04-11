"use client";

import { useState } from "react";

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs = [
    {
      category: "Grunnleggende",
      questions: [
        {
          q: "Hva er kunstig intelligens (AI)?",
          a: "AI er datafiler som er trent til å få til oppgaver som vanligvis krever menneskelig intelligens. Det inkluderer verktøy som ChatGPT, Microsoft Copilot, og Google AI som kan skrive tekst, analysere bilder, og svare på spørsmål.",
        },
        {
          q: "Er det illegalt å bruke AI-verktøy?",
          a: "Nei, det er ikke illegalt. Imidlertid måten du bruker AI på kan være det. Hvis du bruker det til å lage innhold som presenteres som ditt eget arbeid, kan det betraktes som fusk eller plagiat avhengig av institusjonen og oppgavebeskrivelsen.",
        },
        {
          q: "Hvilke AI-verktøy er mest populære?",
          a: "De mest populære inkluderer: ChatGPT (OpenAI), Microsoft Copilot, Google Gemini, Claude, og spesialiserte verktøy som Sikt.no for Norsk forskning.",
        },
      ],
    },
    {
      category: "Akademisk Integritet",
      questions: [
        {
          q: "Når er det OK å bruke AI i oppgaver?",
          a: "Se oppgavebeskrivelsen fra læreren. Generelt er det OK å bruke AI for brainstorming, å forstå konsepter, eller å sjekke grammatikk. Det er IKKE OK å kopiere innholdet direkte.",
        },
        {
          q: "Må jeg si at jeg brukte AI?",
          a: "Ja, ofte. Sjekk oppgavebeskrivelsen. Mange lærere forventer at du dokumenterer at du brukte AI-verktøy. Å ikke avslØre AI-bruk når det forventes er fusk.",
        },
        {
          q: "Hva er forskjellen på fusk og ansvarlig AI-bruk?",
          a: "Ansvarlig bruk: Bruke AI som verktøy for læring, parafrasering og integrering av innhold, og verifikasjon av fakta. Fusk: Kopiere direkte fra AI, presentere det som ditt eget arbeid, eller bruke AI for å unngå å gjøre oppgavene selv.",
        },
      ],
    },
    {
      category: "Personvern og Sikkerhet",
      questions: [
        {
          q: "Hva skjer med informasjonen jeg gir til AI?",
          a: "Det avhenger av verktøyet. Noen lagrer data for å forbedre modellene sine. Aldri dele personlig informasjon som personnummer, passord, eller sensitive akademiske data.",
        },
        {
          q: "Er mine innputs til ChatGPT private?",
          a: "Nei, ikke direkte. OpenAI kan bruke dine innputs til å forbedre tjenestene. Hvis du har en betalt konto (ChatGPT Plus) har du mer kontroll, men data kan fremdeles brukes.",
        },
        {
          q: "Hva bør jeg unngå å dele med AI?",
          a: "Unngå: personnummer, navn på lærere/klassekamrater uten grunn, studentportaler, e-postadresser, telefonummer, eller sensitiv akademisk informasjon.",
        },
      ],
    },
    {
      category: "AI-hallusinasioner og nøyaktighet",
      questions: [
        {
          q: "Hva er en AI-hallusinasion?",
          a: "Det er når AI genererer informasjon som høres sannsynlig ut, men som faktisk er falsk eller oppfunnet. AI kan helt oppfante kilder, statistikk, eller sitater som ikke finnes.",
        },
        {
          q: "Hvordan vet jeg om AI har hallusinert?",
          a: "Du kan aldri være sikker bare ved å spørre AI. Verifiser alltid informasjon ved å: søke på Google Scholar, sjekke opprinnelseskildene, og bruke autentiske kilder. Hvis noe høres rart ut, undersøk videre.",
        },
        {
          q: "Kan jeg stole på AI for statistikk og sitater?",
          a: "Nei. AI kan oppdiktet statistikk og sitater som høres autentiske ut. ALLTID be AI om kilder, og verifiser dem selv før du bruker informasjonen.",
        },
      ],
    },
    {
      category: "Bias og Etikk",
      questions: [
        {
          q: "Kan AI være forutinntatt?",
          a: "Ja. AI-modeller trenes på mennesker, så de kan ærve bias basert på kjønn, rase, eller annen identitet. AI kan gi ensidig informasjon eller gjøre feilrike forutsetninger.",
        },
        {
          q: "Hvordan kan jeg få mer balansert informasjon fra AI?",
          a: "Spør AI om forskellige perspektiver på et tema. Be det presentere motstridende synspunkter. Kombiner AI-svar med tradisjonelle kilder. Vær skeptisk til ensidig informasjon.",
        },
        {
          q: "Er det etisk å bruke AI til å skrive artikler som mennesker har skrevet?",
          a: "Det er komplisert. Hvis du presenterer AI-innhold som menneskelaget arbeid uten å si det, er det ikke etisk og potensielt bedragerisk. Transparens er nøkkel.",
        },
      ],
    },
    {
      category: "Praktisk Bruk",
      questions: [
        {
          q: "Hvordan bruker jeg AI best for hjemmearbeid?",
          a: "Bruk det som Et brainstorming-verktøy først, så skriv ditt eget arbeid. Be AI om å forklare konsepter du ikke forstår. Sjekk grammatikk og stavning. Verifiser alle fakta. Parafrasér og gjør det ditt eget.",
        },
        {
          q: "Kan jeg bruke AI til eksamensforberedelse?",
          a: "Ja! Lag quizer, spørsmål om eksamen, og be AI forklare vanskelige emner. Under selve eksamen, er bruken av AI vanligvis ikke tillatt med mindre læreren tillater det.",
        },
        {
          q: "Hvordan dokumenterer jeg AI-bruk i oppgaver?",
          a: "Legg til en notat eller fotnoter som sier: 'Jeg brukte ChatGPT/Copilot for å... [spesifikk isteek]'. List opp verktøyet og hva du brukte det til. Noen institusjoner har spesifikke format for dette.",
        },
      ],
    },
    {
      category: "Teknisk og Best Practices",
      questions: [
        {
          q: "Hvilket AI-verktøy bør jeg bruke?",
          a: "ChatGPT og Microsoft Copilot er de mest populære. Sikt.no er godt for norsk forskning. Google Gemini er også solid. Velg basert på dine behov og hva som er tillatt av læreren.",
        },
        {
          q: "Er gratis versjoner av AI-verktøy like gode som betalte?",
          a: "Gratis versjoner er ok for de fleste oppgaver, men betalte versjoner gir ofte bedre ytelse og mer data-privat. Prøv gratis først, oppgrader hvis du trenger det.",
        },
        {
          q: "Hvordan kan jeg få bedre svar fra AI?",
          a: "Vær spesifikk: i stedet for 'Forklar klima', spør 'Forklar hvordan drivhusgasser påvirker jordens klima i enfoldige termer'. Du får bedre svar med bedre spørsmål.",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Spørsmål & Svar</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Svarene på de vanligste spørsmålene om AI og ansvarlig bruk
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        {faqs.map((category, catIdx) => (
          <div key={catIdx} className="mb-16">
            <h2 className="text-apple-md text-gray-900 mb-8">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, idx) => {
                const globalIdx = catIdx * 100 + idx;
                return (
                  <div
                    key={idx}
                    className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpanded(expanded === globalIdx ? null : globalIdx)}
                      className="w-full p-6 flex items-center justify-between hover:bg-white/50 transition-colors"
                    >
                      <h3 className="text-apple-sm text-gray-900 text-left font-bold">
                        {faq.q}
                      </h3>
                      <span className={`text-2xl transition-transform duration-300 flex-shrink-0 ml-4 ${expanded === globalIdx ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>

                    {expanded === globalIdx && (
                      <div className="px-6 pb-6 border-t border-gray-200/30 bg-white/50">
                        <p className="text-gray-700 font-light leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <div className="glass p-12 rounded-2xl text-center">
          <h2 className="text-apple-sm text-gray-900 mb-4">Har du flere spørsmål?</h2>
          <p className="text-gray-700 mb-8 font-light">
            Kontakt læreren din eller sjekk institusjonen din AI-retningslinjer
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/guidelines" className="text-blue-600 font-semibold hover:text-blue-700">
              Les retningslinjene →
            </a>
            <a href="/quiz" className="text-blue-600 font-semibold hover:text-blue-700">
              Ta quizen →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
