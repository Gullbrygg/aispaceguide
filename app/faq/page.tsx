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
          a: "AI er datasystemer som er trent til å utføre oppgaver som vanligvis krever menneskelig intelligens. Det inkluderer verktøy som ChatGPT, Microsoft Copilot og Google Gemini, som kan skrive tekst, analysere bilder og svare på spørsmål.",
        },
        {
          q: "Er det ulovlig å bruke AI-verktøy?",
          a: "Nei, det er ikke ulovlig. Men måten du bruker AI på, kan være det. Hvis du bruker det til å lage innhold som presenteres som ditt eget arbeid, kan det regnes som fusk eller plagiat, avhengig av institusjonen og oppgavebeskrivelsen.",
        },
        {
          q: "Hvilke AI-verktøy er mest populære?",
          a: "De mest populære er ChatGPT (OpenAI), Microsoft Copilot, Google Gemini og Claude, samt spesialiserte verktøy som Sikt.no for norsk forskning.",
        },
      ],
    },
    {
      category: "Akademisk Integritet",
      questions: [
        {
          q: "Når er det OK å bruke AI i oppgaver?",
          a: "Se oppgavebeskrivelsen fra læreren. Generelt er det greit å bruke AI til idémyldring, til å forstå konsepter eller til å sjekke grammatikk. Det er IKKE greit å kopiere innholdet direkte.",
        },
        {
          q: "Må jeg si fra om at jeg brukte AI?",
          a: "Ja, som oftest. Sjekk oppgavebeskrivelsen. Mange lærere forventer at du dokumenterer at du har brukt AI-verktøy. Å ikke avsløre AI-bruk når det forventes, regnes som fusk.",
        },
        {
          q: "Hva er forskjellen på fusk og ansvarlig AI-bruk?",
          a: "Ansvarlig bruk: å bruke AI som verktøy for læring, til å omformulere og bearbeide innhold, og til å verifisere fakta. Fusk: å kopiere direkte fra AI, å presentere det som ditt eget arbeid, eller å bruke AI for å slippe å gjøre oppgavene selv.",
        },
      ],
    },
    {
      category: "Personvern og Sikkerhet",
      questions: [
        {
          q: "Hva skjer med informasjonen jeg gir til AI?",
          a: "Det kommer an på verktøyet. Noen lagrer data for å forbedre modellene sine. Du må aldri dele personlig informasjon som personnummer, passord eller sensitive akademiske data.",
        },
        {
          q: "Er det jeg skriver inn i ChatGPT privat?",
          a: "Nei, ikke uten videre. OpenAI kan bruke det du skriver inn, til å forbedre tjenestene. Hvis du har en betalt konto (ChatGPT Plus), har du mer kontroll, men dataene kan fortsatt brukes.",
        },
        {
          q: "Hva bør jeg unngå å dele med AI?",
          a: "Unngå: personnummer, navn på lærere eller klassekamerater uten grunn, innloggingsinformasjon til studentportaler, e-postadresser, telefonnumre og sensitiv akademisk informasjon.",
        },
      ],
    },
    {
      category: "AI-hallusinasjoner og nøyaktighet",
      questions: [
        {
          q: "Hva er en AI-hallusinasjon?",
          a: "Det er når AI genererer informasjon som høres troverdig ut, men som faktisk er feil eller oppdiktet. AI kan finne på kilder, statistikk og sitater som ikke finnes.",
        },
        {
          q: "Hvordan vet jeg om AI har hallusinert?",
          a: "Du kan aldri være sikker bare ved å spørre AI. Verifiser alltid informasjonen ved å søke på Google Scholar, sjekke originalkildene og bruke pålitelige kilder. Hvis noe høres rart ut, må du undersøke videre.",
        },
        {
          q: "Kan jeg stole på AI når det gjelder statistikk og sitater?",
          a: "Nei. AI kan dikte opp statistikk og sitater som høres ekte ut. Be ALLTID AI om kilder, og verifiser dem selv før du bruker informasjonen.",
        },
      ],
    },
    {
      category: "Bias og Etikk",
      questions: [
        {
          q: "Kan AI være forutinntatt?",
          a: "Ja. AI-modeller trenes på data laget av mennesker, og kan derfor arve fordommer knyttet til kjønn, etnisitet eller annen identitet. AI kan gi ensidig informasjon eller bygge på feilaktige antakelser.",
        },
        {
          q: "Hvordan kan jeg få mer balansert informasjon fra AI?",
          a: "Spør AI om forskjellige perspektiver på et tema. Be den presentere motstridende synspunkter. Kombiner AI-svar med tradisjonelle kilder. Vær skeptisk til ensidig informasjon.",
        },
        {
          q: "Er det etisk å bruke AI til å skrive tekster som om de var skrevet av mennesker?",
          a: "Det er komplisert. Hvis du presenterer AI-innhold som menneskeskapt arbeid uten å oppgi det, er det ikke etisk, og kan være villedende. Åpenhet er nøkkelen.",
        },
      ],
    },
    {
      category: "Praktisk Bruk",
      questions: [
        {
          q: "Hvordan bruker jeg AI best til lekser?",
          a: "Bruk det først som et idémyldringsverktøy, og skriv deretter ditt eget arbeid. Be AI om å forklare konsepter du ikke forstår. Sjekk grammatikk og stavemåte. Verifiser alle fakta. Omformuler innholdet og gjør det til ditt eget.",
        },
        {
          q: "Kan jeg bruke AI til eksamensforberedelse?",
          a: "Ja! Lag quizer og øvingsspørsmål, og be AI forklare vanskelige temaer. Under selve eksamen er bruk av AI vanligvis ikke tillatt, med mindre læreren har sagt at det er greit.",
        },
        {
          q: "Hvordan dokumenterer jeg AI-bruk i oppgaver?",
          a: "Legg til en kommentar eller fotnote som sier: «Jeg brukte ChatGPT/Copilot til å... [konkret oppgave]». Oppgi hvilket verktøy du brukte og hva du brukte det til. Noen institusjoner har egne formater for dette.",
        },
      ],
    },
    {
      category: "Teknisk og Best Practices",
      questions: [
        {
          q: "Hvilket AI-verktøy bør jeg bruke?",
          a: "ChatGPT og Microsoft Copilot er de mest populære. Sikt.no er bra for norsk forskning. Google Gemini er også et solid alternativ. Velg ut fra dine behov og hva læreren tillater.",
        },
        {
          q: "Er gratisversjonene av AI-verktøy like gode som de betalte?",
          a: "Gratisversjonene er greie nok til de fleste oppgaver, men betalte versjoner gir ofte bedre ytelse og bedre personvern. Prøv gratisversjonen først, og oppgrader hvis du trenger det.",
        },
        {
          q: "Hvordan kan jeg få bedre svar fra AI?",
          a: "Vær spesifikk: i stedet for «Forklar klima», kan du spørre «Forklar hvordan drivhusgasser påvirker jordas klima, med enkle ord». Du får bedre svar med bedre spørsmål.",
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
            Kontakt læreren din eller sjekk institusjonens AI-retningslinjer
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
