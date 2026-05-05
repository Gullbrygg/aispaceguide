"use client";

import { useState, useRef, useEffect, useMemo, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useSpacetimeDB } from "spacetimedb/react";
import type { ChatMessage, ChatSession } from "@/src/module_bindings/types";
import { ChatConsentNotice, useChatConsent } from "@/app/Components/ChatConsent";
import { useClerkToken } from "@/app/ClerkTokenProvider";
import MarkdownContent from "@/app/Components/MarkdownContent";

const WIDGET_SESSION_KEY = "widget_chat_session_id";

type ChatMessageInput = { role: "user" | "assistant" | "system"; content: string };

export default function FloatingChat() {
  const pathname = usePathname();
  const router = useRouter();
  const { accepted: consentAccepted, accept: acceptConsent, hydrated: consentHydrated } = useChatConsent();
  const token = useClerkToken();

  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/chat")) return null;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Lukk chat" : "Åpne AI-assistent"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-950 text-white shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-gray-100 bg-white flex flex-col overflow-hidden"
          style={{ maxHeight: "min(520px, calc(100vh - 8rem))" }}>

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

          <SignedIn>
            {consentHydrated && !consentAccepted ? (
              <div className="flex-1 overflow-y-auto bg-white">
                <ChatConsentNotice onAccept={acceptConsent} compact />
              </div>
            ) : !token ? (
              <div className="flex-1 flex items-center justify-center p-6 text-sm text-gray-500">
                Kobler til...
              </div>
            ) : (
              <FloatingChatConnected />
            )}
          </SignedIn>
        </div>
      )}
    </>
  );
}

function FloatingChatConnected() {
  const conn = useSpacetimeDB();

  const [widgetSessionId, setWidgetSessionId] = useState<bigint | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [streamingAssistantText, setStreamingAssistantText] = useState("");
  const [pendingUserText, setPendingUserText] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(WIDGET_SESSION_KEY);
    if (!stored) return;
    try {
      setWidgetSessionId(BigInt(stored));
    } catch {
      localStorage.removeItem(WIDGET_SESSION_KEY);
    }
  }, []);

  function persistWidgetSessionId(id: bigint | null) {
    setWidgetSessionId(id);
    if (typeof window === "undefined") return;
    if (id == null) localStorage.removeItem(WIDGET_SESSION_KEY);
    else localStorage.setItem(WIDGET_SESSION_KEY, id.toString());
  }

  function getConnectionOrThrow() {
    const liveConnection = conn.getConnection() as any;
    if (!liveConnection) throw new Error("SpacetimeDB is not connected yet");
    return liveConnection;
  }

  function callReducer(camelName: string, snakeName: string, args: Record<string, unknown>) {
    const liveConnection = getConnectionOrThrow();
    const reducerMap = liveConnection.reducers as Record<string, (payload: Record<string, unknown>) => void> | undefined;
    if (!reducerMap) throw new Error("Reducers are unavailable on the current connection");
    const call = reducerMap[camelName] ?? reducerMap[snakeName];
    if (!call) throw new Error(`Reducer not found: ${camelName}`);
    call(args);
  }

  async function callProcedure<Result>(
    camelName: string,
    snakeName: string,
    args: Record<string, unknown>,
  ): Promise<Result> {
    const liveConnection = getConnectionOrThrow();
    const procedures = liveConnection.procedures as
      | Record<string, (payload: Record<string, unknown>) => Promise<Result>>
      | undefined;
    if (!procedures) throw new Error("Procedures are unavailable on the current connection");
    const call = procedures[camelName] ?? procedures[snakeName];
    if (!call) throw new Error(`Procedure not found: ${camelName}`);
    return call(args);
  }

  const sortedMessages = useMemo(() => {
    return [...chatMessages].sort((a, b) =>
      Number(a.createdAt.microsSinceUnixEpoch - b.createdAt.microsSinceUnixEpoch),
    );
  }, [chatMessages]);

  const showPendingUserText =
    pendingUserText != null &&
    !sortedMessages.some((m) => m.role === "user" && m.content === pendingUserText);

  function handleNewChat() {
    if (pending) return;
    setChatMessages([]);
    setStreamingAssistantText("");
    setPendingUserText(null);
    setError(null);
    setInput("");
    persistWidgetSessionId(null);
  }

  async function loadMessages(sessionId: bigint) {
    if (!conn.isActive) return;
    try {
      const rows = await callProcedure<ChatMessage[]>(
        "getAccessibleChatMessages",
        "get_accessible_chat_messages",
        { sessionId },
      );
      setChatMessages(rows);
    } catch {
      persistWidgetSessionId(null);
      setChatMessages([]);
    }
  }

  useEffect(() => {
    if (!conn.isActive) return;
    if (widgetSessionId == null) {
      setChatMessages([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const sessions = await callProcedure<ChatSession[]>(
          "getAccessibleChatSessions",
          "get_accessible_chat_sessions",
          {},
        );
        if (cancelled) return;
        const stillExists = sessions.some((s) => s.id === widgetSessionId);
        if (!stillExists) {
          persistWidgetSessionId(null);
          setChatMessages([]);
          return;
        }
        await loadMessages(widgetSessionId);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [widgetSessionId, conn.isActive]);

  async function createWidgetSession(firstTitle: string): Promise<bigint> {
    const myIdentityHex = conn.identity?.toHexString() ?? null;

    if (myIdentityHex) {
      const sessions = await callProcedure<ChatSession[]>(
        "getAccessibleChatSessions",
        "get_accessible_chat_sessions",
        {},
      );
      const ownedSessions = sessions.filter(
        (s) => s.ownerId.toHexString() === myIdentityHex,
      );
      for (const session of ownedSessions) {
        const messages = await callProcedure<ChatMessage[]>(
          "getAccessibleChatMessages",
          "get_accessible_chat_messages",
          { sessionId: session.id },
        );
        if (messages.length === 0) {
          callReducer("removeChatSession", "remove_chat_session", { sessionId: session.id });
        }
      }
    }

    const clientRequestId = crypto.randomUUID();
    callReducer("createChatSession", "create_chat_session", {
      title: firstTitle,
      clientRequestId,
    });

    const timeoutMs = 5000;
    const pollMs = 125;
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
      const sessions = await callProcedure<ChatSession[]>(
        "getAccessibleChatSessions",
        "get_accessible_chat_sessions",
        {},
      );
      const found = sessions.find((s) => s.clientRequestId === clientRequestId);
      if (found) {
        persistWidgetSessionId(found.id);
        return found.id;
      }
      await new Promise((r) => setTimeout(r, pollMs));
    }
    throw new Error("Klarte ikke opprette chat-økt");
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages, streamingAssistantText, pendingUserText]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;
    if (!conn.isActive) {
      setError("Kobler til... prøv igjen om et øyeblikk.");
      return;
    }

    setPending(true);
    setStreamingAssistantText("");
    setPendingUserText(text);
    setError(null);
    setInput("");

    try {
      let sessionId = widgetSessionId;
      if (sessionId == null) {
        sessionId = await createWidgetSession(text.slice(0, 72));
      }

      callReducer("saveChatMessage", "save_chat_message", {
        sessionId,
        role: "user",
        content: text,
        inputTokens: undefined,
        outputTokens: undefined,
      });

      const historyForRequest: ChatMessageInput[] = [
        ...sortedMessages.map((m) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
        { role: "user", content: text },
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForRequest, stream: true }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setStreamingAssistantText(assistantText);
      }

      const finalAssistant = assistantText.trim();
      if (!finalAssistant) throw new Error("Tomt svar fra modellen");

      callReducer("saveChatMessage", "save_chat_message", {
        sessionId,
        role: "assistant",
        content: finalAssistant,
        inputTokens: undefined,
        outputTokens: undefined,
      });

      setStreamingAssistantText("");
      await loadMessages(sessionId);
      setPendingUserText(null);
    } catch (err) {
      setStreamingAssistantText("");
      setPendingUserText(null);
      setError(err instanceof Error ? err.message : "Beklager, noe gikk galt. Prøv igjen.");
    } finally {
      setPending(false);
    }
  }

  const hasContent =
    sortedMessages.length > 0 || streamingAssistantText.length > 0 || showPendingUserText || widgetSessionId != null;

  return (
    <>
      {hasContent && (
        <div className="flex justify-end px-3 pt-2 pb-1 bg-gray-50 border-b border-gray-100">
          <button
            type="button"
            onClick={handleNewChat}
            disabled={pending}
            title="Start ny chat"
            className="text-xs px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Ny chat
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50 min-h-0">
        {sortedMessages.length === 0 && streamingAssistantText.length === 0 && !showPendingUserText && (
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
        {sortedMessages.map((msg) => {
          const fromUser = msg.role === "user";
          return (
            <div
              key={msg.id.toString()}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                fromUser
                  ? "ml-auto bg-gray-950 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              {fromUser ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <MarkdownContent content={msg.content} />
              )}
            </div>
          );
        })}
        {showPendingUserText && (
          <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ml-auto bg-gray-950 text-white">
            <p className="whitespace-pre-wrap">{pendingUserText}</p>
          </div>
        )}
        {streamingAssistantText.length > 0 && (
          <div className="max-w-[85%] rounded-2xl px-3 py-2 bg-white border border-gray-200 text-gray-900">
            <MarkdownContent content={streamingAssistantText} />
          </div>
        )}
        {pending && streamingAssistantText.length === 0 && (
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

      {error && (
        <p className="text-xs text-red-700 bg-red-50 border-t border-red-200 px-3 py-2">{error}</p>
      )}

      <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-gray-100 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={conn.isActive ? "Skriv et spørsmål..." : "Kobler til..."}
          className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-colors"
          disabled={pending || !conn.isActive}
        />
        <button
          type="submit"
          disabled={pending || !input.trim() || !conn.isActive}
          className="px-3 py-2 rounded-xl bg-gray-950 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </>
  );
}
