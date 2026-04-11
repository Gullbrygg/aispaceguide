"use client";

import { useState } from "react";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Hva er ikke akseptabel bruk av ChatGPT i akademiske oppgaver?",
      options: [
        "Bruke det for å sjekke grammatikken din",
        "Kopiere hele svaret direkte inn i oppgaven",
        "Få hjelp til å forklare et konsept",
        "Bruke det til å generere en outline",
      ],
      correct: 1,
    },
    {
      question: "Hva er en AI-hallusinasjon?",
      options: [
        "Når AI bruker for mye RAM",
        "Når AI genererer sannlytende, men falske informasjon",
        "Når du hallusinerer mens du bruker AI",
        "En sikkerhetsbrist i AI-systemer",
      ],
      correct: 1,
    },
    {
      question: "Hvilken informasjon bør du ALDRI dele med AI-verktøy?",
      options: [
        "Spørsmål om akademiske emner",
        "Personlig identifiseringsinformasjon eller sensitive data",
        "Generelle spørsmål om verden",
        "Alt er greit å delø",
      ],
      correct: 1,
    },
    {
      question: "Hva bør du gjøre hvis AI gir deg et sitat eller tall?",
      options: [
        "Bruke det direkte uten verifikasjon",
        "Spørre AI om kilder og deretter verifisere selv",
        "Anta at det er riktig hvis det høres bra ut",
        "Ikke bruke AI til statistikk i det hele tatt",
      ],
      correct: 1,
    },
    {
      question: "Hva er algoritmeisk bias?",
      options: [
        "En positiv fordel av AI",
        "Når AI favoriserer visse perspektiver basert på treningsdata",
        "Når brukeren er forutinntatt",
        "En form for sikkerhetsfeil",
      ],
      correct: 1,
    },
    {
      question: "Hva er det viktigste å gjøre før du bruker AI til oppgaver?",
      options: [
        "Sjekk personvernpolicyen",
        "Lese oppgavebeskrivelsen og retningslinjene fra læreren",
        "Dele din klassekode",
        "Kjøpe premium-versjonen",
      ],
      correct: 1,
    },
    {
      question: "Hvordan burde du håndtere AI-genrert innhold i oppgaven din?",
      options: [
        "Presentere det som ditt eget arbeid",
        "Parafrasere det og integrere det med ditt eget arbeid og kildekritikk",
        "Ikke bruke AI i det hele tatt",
        "Kopiere det og sitere ChatGPT som forfatter",
      ],
      correct: 1,
    },
    {
      question: "Hva betyr det at AI-modeller trenes på mennesker?",
      options: [
        "AI er bare så smart som mennesker",
        "AI kan arve bias og fordommer fra treningsdataene",
        "Mennesker må kontrollere AI en gang i timen",
        "AI og mennesker er identiske",
      ],
      correct: 1,
    },
    {
      question: "Hvilken av disse er en god grunn til å bruke AI?",
      options: [
        "Unngå å gjøre ditt eget arbeid",
        "Få inspirasjon som utgangspunkt for videre tenking",
        "Bedra karakterer garantert",
        "Lure læreren",
      ],
      correct: 1,
    },
    {
      question: "Hvis du er usikker på om en AI-bruk er tillatt, hva bør du gjøre?",
      options: [
        "Bruke AI likevel fordi det er sannsynlig greit",
        "Spørre læreren din direkte",
        "Ikke bruke AI i det hele tatt",
        "Håpe på det beste",
      ],
      correct: 1,
    },
  ];

  const handleAnswer = (index: number) => {
    const newAnswers = { ...selectedAnswers, [currentQuestion]: index };
    setSelectedAnswers(newAnswers);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="w-full">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
            <h1 className="text-apple-lg text-gray-900 mb-6">Quizresultat</h1>
          </div>
        </section>

        <section className="py-20 px-6 sm:px-8 max-w-2xl mx-auto">
          <div className="glass p-12 rounded-3xl text-center">
            <div className="inline-block text-7xl mb-6">
              {score >= 8 ? "🎉" : score >= 6 ? "👍" : "📚"}
            </div>
            <h2 className="text-apple-md text-gray-900 mb-6">
              Du fikk {score} av {questions.length} riktig!
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-500"
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>

            <div className="space-y-4 mb-8">
              {score >= 8 && (
                <p className="text-lg text-gray-700">
                  Utmerket arbeid! Du har solid forståelse for ansvarlig AI-bruk. 🌟
                </p>
              )}
              {score >= 6 && score < 8 && (
                <p className="text-lg text-gray-700">
                  Bra jobba! Du forstår de fleste konseptene. Les gjerne på nytt noen seksjoner. 💡
                </p>
              )}
              {score < 6 && (
                <p className="text-lg text-gray-700">
                  Det er greit! Gå tilbake til retningslinjene og test igjen senere. 📖
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswers({});
                setShowResults(false);
              }}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            >
              Ta quizen igjen
            </button>
          </div>

          {/* Review */}
          <div className="mt-20">
            <h3 className="text-apple-md text-gray-900 mb-12">Gjennomgang av svar</h3>
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAnswer = selectedAnswers[idx];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div
                    key={idx}
                    className={`glass p-6 rounded-2xl border-l-4 ${
                      isCorrect ? "border-green-500 bg-green-50/50" : "border-red-500 bg-red-50/50"
                    }`}
                  >
                    <p className="font-bold text-gray-900 mb-3">{q.question}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Ditt svar:</span> {q.options[userAnswer]}
                      <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                        {" "}
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-green-600">Riktig svar:</span> {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">AI-etikk Quiz</h1>
          <p className="text-xl text-gray-700 font-light">
            Test din kunnskap om ansvarlig AI-bruk
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-20 px-6 sm:px-8 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-900">
              Spørsmål {currentQuestion + 1} av {questions.length}
            </span>
            <span className="text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="glass p-8 rounded-2xl mb-8">
          <h2 className="text-apple-sm text-gray-900 mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left glass p-4 rounded-xl hover:bg-blue-100/50 hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-100 transition-all flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </div>
                  <span className="text-gray-900 group-hover:font-semibold transition-all">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

