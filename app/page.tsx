"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useReveal();

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="mesh-blob w-[700px] h-[700px]"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)", top: "-200px", right: "-200px", animationDelay: "0s" }} />
        <div className="mesh-blob w-[500px] h-[500px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", bottom: "-100px", left: "-100px", animationDelay: "5s" }} />
        {/* Fade to ticker */}
        <div className="hero-fade-bottom" />

        <div className="relative z-10 width-limit pt-20 pb-20">
          {/* Eyebrow */}
          <div className="reveal delay-1 mb-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
              For universitetsstudenter i Norge
            </span>
          </div>

          {/* Headline */}
          <div className="reveal delay-2">
            <h1 className="font-display mb-6" style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              lineHeight: 0.95,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#0a0a0a",
            }}>
              Bruk AI
              <br />
              <span style={{ color: "#2563eb" }}>ansvarlig.</span>
              <br />
              Lær riktig.
            </h1>
          </div>

          {/* Subtext */}
          <div className="reveal delay-3">
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl font-light">
              AIGuidebook gir deg klare svar om hva som er tillatt, hvordan du beskytter dataene dine, og hvordan du ivaretar akademisk integritet.
            </p>
          </div>

          {/* CTAs */}
          <div className="reveal delay-4">
            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/guidelines"
                className="group relative overflow-hidden bg-gray-950 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-gray-950/20 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span className="relative z-10">Start læringsløpet</span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              </Link>
              <Link
                href="/quiz"
                className="border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-semibold text-base hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
              >
                Test kunnskapen →
              </Link>
            </div>
          </div>

          {/* Pillars */}
          <div className="reveal delay-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-100">
              {[
                { icon: "📚", label: "Akademisk integritet" },
                { icon: "🔐", label: "Personvern" },
                { icon: "🌀", label: "Hallusinasjoner" },
                { icon: "🧠", label: "Kritisk tenkning" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 min-w-0">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm text-gray-500 font-light truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ───────────────────────────────────── */}
      <div className="bg-blue-600 py-4 overflow-hidden border-y border-blue-700">
        <div className="ticker-track flex gap-16 whitespace-nowrap" style={{ animation: "ticker 25s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex gap-16 flex-shrink-0">
              {["Akademisk integritet", "Personvern", "AI-hallusinasjoner", "Algoritmisk bias", "Etisk AI-bruk", "Kritisk tenkning", "Kildebruk", "Datasikkerhet"].map((item, i) => (
                <span key={i} className="text-white font-semibold text-sm uppercase tracking-widest flex-shrink-0 flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── TOOLS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="width-limit">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 mb-4">Ressurser</p>
              <h2 className="text-apple-md text-gray-950">Anbefalte verktøy</h2>
            </div>
            <p className="hidden md:block text-slate-400 font-light max-w-xs text-right text-sm">
              Verktøy som fungerer godt i akademisk sammenheng
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { name: "ChatGPT", url: "openai.com", desc: "Tekstgenerering og forklaringer", badge: "Mest brukt" },
              { name: "Microsoft Copilot", url: "copilot.microsoft.com", desc: "Integrert i Office 365", badge: "For studenter" },
              { name: "Sikt.no", url: "sikt.no", desc: "Norsk IT-sikkerhet og forskning", badge: "Norsk" },
              { name: "Google AI", url: "google.com/ai", desc: "Søk og Gemini-modeller", badge: "Gratis" },
            ].map((tool, i) => (
              <a
                key={tool.name}
                href={`https://${tool.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal delay-${i + 1} group relative border border-gray-100 p-6 rounded-2xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1.5 bg-white overflow-hidden`}
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{tool.badge}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <span className="text-white text-sm font-bold">{tool.name[0]}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-400 font-light mb-3">{tool.desc}</p>
                <p className="text-xs text-blue-500 group-hover:text-blue-600 transition-colors">{tool.url} →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VELG DIN VEI ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="mesh-blob w-[600px] h-[600px]"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", top: "-200px", right: "-200px", animationDelay: "2s" }} />
        <div className="width-limit relative z-10">
          <div className="text-center mb-14 reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400 mb-4">Hvem er du?</p>
            <h2 className="text-apple-md text-white">Velg din vei</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "For Studenter", description: "Sjekklister, eksempler og klare regler for hva du kan og ikke kan bruke AI til.", href: "/about/student", accent: "#3b82f6" },
              { num: "02", title: "For Lærere", description: "Ferdige oppgavemaler, diskusjonsspørsmål og forklaringer du kan bruke i undervisningen.", href: "/about/teacher", accent: "#10b981" },
              { num: "03", title: "For Institusjoner", description: "Implementeringsrammeverk og policymaler for konsistente AI-retningslinjer.", href: "/about/university", accent: "#a78bfa" },
            ].map((path, idx) => (
              <Link key={idx} href={path.href}
                className={`reveal delay-${idx + 1} group block p-8 rounded-2xl border border-white/8 hover:border-white/20 bg-white/4 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden`}
              >
                <span className="absolute top-4 right-6 font-display text-6xl font-light text-white/5 select-none"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{path.num}</span>
                <div className="relative z-10">
                  <div className="w-1 h-12 rounded-full mb-6 transition-all duration-300 group-hover:h-16" style={{ backgroundColor: path.accent }} />
                  <h3 className="font-bold text-xl text-white mb-3">{path.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">{path.description}</p>
                  <span className="text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-200 group-hover:gap-3" style={{ color: path.accent }}>
                    Utforsk <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="width-limit">
          <div className="mb-14 reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 mb-4">Læringssti</p>
            <div className="flex items-end justify-between">
              <h2 className="text-apple-md text-gray-950 max-w-sm">Slik fungerer AIGuidebook</h2>
              <p className="hidden md:block text-slate-400 font-light max-w-xs text-right text-sm">
                Tre steg fra usikker til trygg AI-bruker
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { step: "01", title: "Lær det grunnleggende", description: "Forstå hva som er akseptabelt og hvordan AI kan brukes som støtte, ikke som snarvei.", link: "/guidelines" },
              { step: "02", title: "Bruk det trygt", description: "Få klare regler for personvern, kildekritikk og digital etikk for hver oppgave.", link: "/guidelines" },
              { step: "03", title: "Vis at du kan det", description: "Fullfør quizen og dokumenter at du jobber ansvarlig.", link: "/quiz" },
            ].map((item, idx) => (
              <Link key={idx} href={item.link}
                className={`reveal delay-${idx + 1} group block p-10 hover:bg-gray-50 transition-all duration-300`}
              >
                <div className="font-display text-8xl font-light mb-6 leading-none"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "rgba(37,99,235,0.10)", lineHeight: 1 }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm mb-6">{item.description}</p>
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                  Les mer <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KEY TOPICS ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="width-limit">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 mb-4">Innhold</p>
              <h2 className="text-apple-md text-gray-950">Viktige emner</h2>
            </div>
            <Link href="/guidelines" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2 hover:gap-3 transition-all duration-200">
              Se alle emner →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Akademisk integritet", emoji: "📚", desc: "Hva er grensen mellom hjelp og fusk?", color: "#eff6ff" },
              { title: "Personvern og sikkerhet", emoji: "🔐", desc: "Hva skjer med data du gir til AI?", color: "#f0fdf4" },
              { title: "AI-hallusinasjoner", emoji: "🌀", desc: "Når AI finner på troverdige løgner.", color: "#fff7ed" },
              { title: "Algoritmisk bias", emoji: "⚖️", desc: "Fordommer bakt inn i treningsdata.", color: "#fdf4ff" },
              { title: "Etisk AI-bruk", emoji: "✨", desc: "Prinsipper for forsvarlig bruk.", color: "#fefce8" },
              { title: "Kritisk tenkning", emoji: "🧠", desc: "Aldri slå av hodet, selv med AI.", color: "#f0f9ff" },
            ].map((topic, idx) => (
              <Link key={idx} href="/guidelines"
                className={`reveal delay-${(idx % 3) + 1} group flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1`}
                style={{ backgroundColor: topic.color }}
              >
                <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{topic.emoji}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-500 font-light">{topic.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="width-limit">
          <div className="relative rounded-3xl overflow-hidden reveal"
            style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #0a0a0a 100%)" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
            <div className="mesh-blob w-[500px] h-[500px]"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)", top: "-200px", right: "-100px", animationDelay: "1s" }} />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
            <div className="relative z-10 px-8 md:px-16 py-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-6">Ta første steg</p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
                Bygg trygghet rundt
                <br />
                <span style={{ color: "#60a5fa" }}>AI i studiene dine.</span>
              </h2>
              <p className="text-gray-400 font-light max-w-lg mx-auto mb-10 leading-relaxed">
                Ferdige retningslinjer, konkrete eksempler og en interaktiv quiz som hjelper deg å bruke AI på en akademisk forsvarlig måte.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/guidelines"
                  className="group relative overflow-hidden bg-white text-gray-950 px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Start nå</span>
                  <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                </Link>
                <Link href="/quiz"
                  className="border border-white/15 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/8 hover:border-white/30 transition-all duration-300"
                >
                  Ta quizen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
