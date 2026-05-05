"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ChatConsentNotice, useChatConsent } from "@/app/Components/ChatConsent";

type Message = { role: "user" | "assistant"; content: string };

export default function FloatingChat() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { accepted: consentAccepted, accept: acceptConsent, hydrated: consentHydrated } = useChatConsent();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Don't render on the full chat page
  if (pathname.startsWith("/chat")) return null;

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          stream: true,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      // Add empty assistant message to stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Beklager, noe gikk galt. Prøv igjen." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Lukk chat" : "Åpne AI-assistent"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-950 text-white shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        {open ? (
          /* X icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* Chat bubble icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-gray-100 bg-white flex flex-col overflow-hidden"
          style={{ maxHeight: "min(520px, calc(100vh - 8rem))" }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-950 text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-semibold text-sm">AIGuidebook-assistent</span>
            </div>
            <button
              onClick={() => router.push("/chat")}
              title="Åpne full chat"
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Åpne full chat
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          {/* Body — not logged in */}
          <SignedOut>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">🤖</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Logg inn for å chatte med AI-assistenten og få hjelp med ansvarlig AI-bruk i studiene.
              </p>
              <SignInButton>
                <button className="px-5 py-2.5 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer">
                  Logg inn for å chatte
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          {/* Body — logged in */}
          <SignedIn>
            {consentHydrated && !consentAccepted ? (
              <div className="flex-1 overflow-y-auto bg-white">
                <ChatConsentNotice onAccept={acceptConsent} compact />
              </div>
            ) : (
            <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50 min-h-0">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-400">Hei! Spør meg om ansvarlig AI-bruk, personvern, akademisk integritet eller andre emner på AIGuidebook.</p>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {[
                      "Hva er AI-hallusinasjoner?",
                      "Når er AI-bruk fusk?",
                      "Hva bør jeg ikke dele med AI?",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setInput(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "ml-auto bg-gray-950 text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              {pending && messages[messages.length - 1]?.role === "user" && (
                <div className="max-w-[85%] rounded-2xl px-3 py-2 bg-white border border-gray-200 text-gray-400 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                  </span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-gray-100 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv et spørsmål..."
                className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-colors"
                disabled={pending}
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="px-3 py-2 rounded-xl bg-gray-950 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
            </>
            )}
          </SignedIn>
        </div>
      )}
    </>
  );
}
