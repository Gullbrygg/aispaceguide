"use client";

import { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "aiguide-chat-consent-v1";
const CONSENT_EVENT = "aiguide-chat-consent-changed";

export function useChatConsent() {
  const [accepted, setAccepted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setAccepted(localStorage.getItem(CONSENT_KEY) === "true");
      } catch {
        setAccepted(false);
      }
    };
    read();
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) read();
    };
    const onCustom = () => read();

    window.addEventListener("storage", onStorage);
    window.addEventListener(CONSENT_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CONSENT_EVENT, onCustom);
    };
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
    } catch {
      // ignore storage errors (private mode, quota)
    }
    setAccepted(true);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  return { accepted, accept, hydrated };
}

type ChatConsentNoticeProps = {
  onAccept: () => void;
  compact?: boolean;
};

export function ChatConsentNotice({ onAccept, compact }: ChatConsentNoticeProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className={`flex flex-col ${compact ? "gap-3 p-5" : "gap-4 p-6"}`}>
      <div className="flex items-center gap-2">
        <span className={compact ? "text-xl" : "text-2xl"} aria-hidden="true">
          ⚠️
        </span>
        <h2 className={`font-semibold text-gray-900 ${compact ? "text-base" : "text-xl"}`}>
          Før du bruker AI-chatten
        </h2>
      </div>

      <div className={`text-gray-700 leading-relaxed ${compact ? "text-xs" : "text-sm"}`}>
        <p className="mb-2">For å bruke AI-assistenten må du være klar over følgende:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Meldingene du sender behandles av <strong>tredjeparts AI-leverandører</strong> (OpenRouter og deres
            underleverandører som OpenAI, Anthropic m.fl.) for å generere svar.
          </li>
          <li>
            Samtaler og metadata kan lagres i vår database (SpacetimeDB) for å støtte historikk, deling med
            invitasjonskoder og videre bruk i AIGuidebook.
          </li>
          <li>
            Ikke del sensitive personopplysninger, passord, helseopplysninger, eksamenssvar eller annet
            konfidensielt innhold.
          </li>
          <li>
            Du er selv ansvarlig for innholdet du sender inn og hvordan du bruker svarene fra AI.
          </li>
        </ul>
      </div>

      <label className={`flex items-start gap-2 cursor-pointer text-gray-800 ${compact ? "text-xs" : "text-sm"}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer accent-blue-600"
        />
        <span>
          Jeg har lest informasjonen ovenfor og samtykker til at meldingene mine sendes til tredjeparter og
          kan lagres.
        </span>
      </label>

      <button
        type="button"
        onClick={onAccept}
        disabled={!checked}
        className={`px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700 transition-colors ${
          compact ? "w-full text-sm" : "self-start"
        }`}
      >
        Jeg forstår og godtar
      </button>
    </div>
  );
}
