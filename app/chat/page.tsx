'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import type { ChatMessage, ChatSession } from '@/src/module_bindings/types';
import { useSpacetimeDB } from 'spacetimedb/react';

type ChatMessageInput = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

function formatTimestampMicros(micros: bigint): string {
  const date = new Date(Number(micros / 1000n));
  return date.toLocaleString('nb-NO');
}

export default function ChatPage() {
  const conn = useSpacetimeDB();
  const myIdentityHex = conn.identity?.toHexString() ?? null;

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [latestInviteCode, setLatestInviteCode] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [streamingAssistantText, setStreamingAssistantText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastDroppedCount, setLastDroppedCount] = useState<number>(0);

  const sessionsRef = useRef(chatSessions);
  sessionsRef.current = chatSessions;

  const mySessions = useMemo(() => {
    return [...chatSessions]
      .sort((a, b) => Number(b.updatedAt.microsSinceUnixEpoch - a.updatedAt.microsSinceUnixEpoch));
  }, [chatSessions]);

  const myMessages = useMemo(() => {
    return [...chatMessages].sort((a, b) => Number(a.createdAt.microsSinceUnixEpoch - b.createdAt.microsSinceUnixEpoch));
  }, [chatMessages]);

  const selectedSession = useMemo(() => {
    if (!selectedSessionId) return null;
    return mySessions.find((session) => session.id.toString() === selectedSessionId) ?? null;
  }, [mySessions, selectedSessionId]);

  function getConnectionOrThrow() {
    const liveConnection = conn.getConnection() as any;
    if (!liveConnection) {
      throw new Error('SpacetimeDB is not connected yet');
    }
    return liveConnection;
  }

  function callReducer(camelName: string, snakeName: string, args: Record<string, unknown>) {
    const liveConnection = getConnectionOrThrow();
    const reducerMap = liveConnection.reducers as Record<string, (payload: Record<string, unknown>) => void> | undefined;
    if (!reducerMap) {
      throw new Error('Reducers are unavailable on the current connection');
    }

    const call = reducerMap[camelName] ?? reducerMap[snakeName];
    if (!call) {
      throw new Error(`Reducer not found: ${camelName}`);
    }

    call(args);
  }

  async function callProcedure<Result>(camelName: string, snakeName: string, args: Record<string, unknown>): Promise<Result> {
    const liveConnection = getConnectionOrThrow();
    const procedures = liveConnection.procedures as Record<string, (payload: Record<string, unknown>) => Promise<Result>> | undefined;
    if (!procedures) {
      throw new Error('Procedures are unavailable on the current connection');
    }

    const call = procedures[camelName] ?? procedures[snakeName];
    if (!call) {
      throw new Error(`Procedure not found: ${camelName}`);
    }

    return call(args);
  }

  async function loadSessions(showLoading = true) {
    if (!conn.isActive) return [];
    if (showLoading) {
      setSessionsLoading(true);
    }
    try {
      const rows = await callProcedure<ChatSession[]>(
        'getAccessibleChatSessions',
        'get_accessible_chat_sessions',
        {}
      );
      setChatSessions(rows);
      return rows;
    } finally {
      if (showLoading) {
        setSessionsLoading(false);
      }
    }
  }

  async function loadMessages(sessionId: bigint, showLoading = true) {
    if (!conn.isActive) return [];
    if (showLoading) {
      setMessagesLoading(true);
    }
    try {
      const rows = await callProcedure<ChatMessage[]>(
        'getAccessibleChatMessages',
        'get_accessible_chat_messages',
        { sessionId }
      );
      setChatMessages(rows);
      return rows;
    } finally {
      if (showLoading) {
        setMessagesLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!conn.isActive) return;
    loadSessions().catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load chat sessions');
    });
  }, [conn.isActive]);

  useEffect(() => {
    if (!selectedSessionId && mySessions.length > 0) {
      setSelectedSessionId(mySessions[0].id.toString());
    }
  }, [mySessions, selectedSessionId]);

  useEffect(() => {
    if (!selectedSessionId || !conn.isActive) {
      setChatMessages([]);
      return;
    }

    loadMessages(BigInt(selectedSessionId)).catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load chat messages');
    });
  }, [selectedSessionId, conn.isActive]);

  useEffect(() => {
    if (!selectedSessionId || !conn.isActive) return;

    const sessionId = BigInt(selectedSessionId);
    const refreshInterval = window.setInterval(() => {
      loadMessages(sessionId, false).catch(() => {
        // keep refresh loop resilient
      });
      loadSessions(false).catch(() => {
        // keep refresh loop resilient
      });
    }, 1500);

    return () => window.clearInterval(refreshInterval);
  }, [selectedSessionId, conn.isActive]);

  async function createSessionAndWait(firstTitle?: string): Promise<bigint> {
    const ownedSessionIds = mySessions
      .filter((session) => myIdentityHex != null && session.ownerId.toHexString() === myIdentityHex)
      .map((session) => session.id);

    for (const ownedSessionId of ownedSessionIds) {
      const existingMessages = await callProcedure<ChatMessage[]>(
        'getAccessibleChatMessages',
        'get_accessible_chat_messages',
        { sessionId: ownedSessionId }
      );

      if (existingMessages.length === 0) {
        setSelectedSessionId(ownedSessionId.toString());
        throw new Error('You already have an empty chat. Use it or remove it before creating a new one.');
      }
    }

    const clientRequestId = crypto.randomUUID();
    callReducer('createChatSession', 'create_chat_session', {
      title: firstTitle,
      clientRequestId,
    });

    const timeoutMs = 5000;
    const pollMs = 125;
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
      const currentSessions = await loadSessions();
      sessionsRef.current = currentSessions;

      const found = currentSessions.find((s) => s.clientRequestId === clientRequestId);
      if (found) {
        setSelectedSessionId(found.id.toString());
        return found.id;
      }
      await new Promise((resolve) => setTimeout(resolve, pollMs));
    }

    throw new Error('Timed out while creating chat session');
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || !conn.isActive || pending) return;

    setPending(true);
    setStreamingAssistantText('');
    setError(null);

    try {
      const currentSessionId = selectedSessionId
        ? BigInt(selectedSessionId)
        : await createSessionAndWait(text.slice(0, 72));

      callReducer('saveChatMessage', 'save_chat_message', {
        sessionId: currentSessionId,
        role: 'user',
        content: text,
        inputTokens: undefined,
        outputTokens: undefined,
      });

      const historyForRequest: ChatMessageInput[] = [
        ...myMessages.map((m) => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
        { role: 'user', content: text },
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForRequest, stream: true }),
      });

      if (!response.ok) {
        let errorMessage = 'Chat request failed';
        try {
          const errData = (await response.json()) as { error?: string };
          errorMessage = errData.error ?? errorMessage;
        } catch {
          // Ignore response parsing failures.
        }
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Streaming body is missing');
      }

      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk.length > 0) {
          assistantMessage += chunk;
          setStreamingAssistantText(assistantMessage);
        }
      }

      const finalAssistant = assistantMessage.trim();
      if (!finalAssistant) {
        throw new Error('OpenRouter returned an empty response');
      }

      callReducer('saveChatMessage', 'save_chat_message', {
        sessionId: currentSessionId,
        role: 'assistant',
        content: finalAssistant,
        inputTokens: undefined,
        outputTokens: undefined,
      });

      setInput('');
      setStreamingAssistantText('');
      setLastDroppedCount(0);
      await loadSessions();
      await loadMessages(currentSessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error while sending message');
      setStreamingAssistantText('');
    } finally {
      setPending(false);
    }
  }

  async function handleCreateInviteCode() {
    if (!selectedSessionId || pending) return;
    setPending(true);
    setError(null);

    try {
      const generatedCode = crypto.randomUUID().replace(/-/g, '');
      callReducer('createChatInvite', 'create_chat_invite', {
        sessionId: BigInt(selectedSessionId),
        code: generatedCode,
      });
      setLatestInviteCode(generatedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create invite code');
    } finally {
      setPending(false);
    }
  }

  async function handleJoinWithCode() {
    if (!inviteCodeInput.trim() || pending) return;
    setPending(true);
    setError(null);

    try {
      callReducer('joinChatWithInviteCode', 'join_chat_with_invite_code', {
        code: inviteCodeInput.trim(),
      });
      setInviteCodeInput('');
      await loadSessions();
      if (!selectedSessionId && sessionsRef.current.length > 0) {
        setSelectedSessionId(sessionsRef.current[0].id.toString());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join chat with code');
    } finally {
      setPending(false);
    }
  }

  async function refreshAfterSessionRemovedOrLeft(previousSessionId: string) {
    const updatedSessions = await loadSessions();

    if (updatedSessions.some((session) => session.id.toString() === previousSessionId)) {
      setSelectedSessionId(previousSessionId);
      await loadMessages(BigInt(previousSessionId));
      return;
    }

    if (updatedSessions.length > 0) {
      const fallback = updatedSessions[0];
      setSelectedSessionId(fallback.id.toString());
      await loadMessages(fallback.id);
      return;
    }

    setSelectedSessionId(null);
    setChatMessages([]);
  }

  async function handleRemoveSession(sessionIdText: string) {
    if (!sessionIdText || pending) return;

    setPending(true);
    setError(null);

    try {
      callReducer('removeChatSession', 'remove_chat_session', {
        sessionId: BigInt(sessionIdText),
      });
      setLatestInviteCode(null);
      await refreshAfterSessionRemovedOrLeft(sessionIdText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove chat session');
    } finally {
      setPending(false);
    }
  }

  async function handleLeaveSession(sessionIdText: string) {
    if (!sessionIdText || pending) return;

    setPending(true);
    setError(null);

    try {
      callReducer('leaveChatSession', 'leave_chat_session', {
        sessionId: BigInt(sessionIdText),
      });
      setLatestInviteCode(null);
      await refreshAfterSessionRemovedOrLeft(sessionIdText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave chat session');
    } finally {
      setPending(false);
    }
  }

  function handleNewChat() {
    if (pending) return;
    createSessionAndWait('Ny chat').catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to create chat');
    });
  }

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-900">Chatter</h2>
        <button
          type="button"
          onClick={handleNewChat}
          className="px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
        >
          New
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <input
          value={inviteCodeInput}
          onChange={(e) => setInviteCodeInput(e.target.value)}
          placeholder="Lim inn invitasjonskode for å bli med"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={pending}
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleJoinWithCode}
            disabled={!inviteCodeInput.trim() || pending}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Join
          </button>
          <button
            type="button"
            onClick={handleCreateInviteCode}
            disabled={!selectedSessionId || pending}
            className="px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Invite
          </button>
        </div>
      </div>

      {latestInviteCode && (
        <p className="text-xs text-blue-800 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3 break-all">
          Invitasjonskode: {latestInviteCode}
        </p>
      )}

      <div className="overflow-auto space-y-2 min-h-0 flex-1">
        {(sessionsLoading || messagesLoading) && mySessions.length === 0 ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : mySessions.length === 0 ? (
          <p className="text-sm text-gray-500">Ingen chatter ennå.</p>
        ) : (
          mySessions.map((session) => {
            const selected = selectedSessionId === session.id.toString();
            const isOwner = myIdentityHex != null && session.ownerId.toHexString() === myIdentityHex;
            const sessionIdText = session.id.toString();
            return (
              <div
                key={sessionIdText}
                className={`group relative w-full p-3 rounded-xl border transition-colors ${
                  selected
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSessionId(sessionIdText);
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full pr-10 text-left cursor-pointer"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">{session.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestampMicros(session.updatedAt.microsSinceUnixEpoch)}
                  </p>
                </button>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity group-hover:opacity-50 group-hover:pointer-events-auto hover:opacity-100 focus-within:opacity-100">
                  {isOwner ? (
                    <button
                      type="button"
                      onClick={() => void handleRemoveSession(sessionIdText)}
                      disabled={pending}
                      aria-label="Slett chat"
                      title="Slett chat"
                      className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void handleLeaveSession(sessionIdText)}
                      disabled={pending}
                      aria-label="Forlat chat"
                      title="Forlat chat"
                      className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="M16 17l5-5-5-5" />
                        <path d="M21 12H9" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-8rem)]">
      <SignedOut>
        <div className="glass rounded-2xl p-8 text-center max-w-xl mx-auto mt-12">
          <h1 className="text-apple-md mb-4">AI Chat</h1>
          <p className="text-gray-600 mb-6">Logg inn for å starte en samtale og fortsette der du slapp.</p>
          <SignInButton>
            <button className="px-5 py-2 rounded-full bg-gray-950 text-white font-semibold cursor-pointer">Logg inn</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="relative grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 h-full">
          <aside className="hidden md:flex glass rounded-2xl p-4 flex-col min-h-0">
            {sidebarContent}
          </aside>

          <div
            className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${
              mobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside
            className={`md:hidden fixed left-0 top-0 z-50 h-full w-[85vw] max-w-[320px] glass rounded-r-2xl p-4 flex flex-col min-h-0 transition-transform ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            aria-hidden={!mobileSidebarOpen}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Chatter & invitasjoner</h2>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700"
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>
            {sidebarContent}
          </aside>

          <section className="glass rounded-2xl p-4 flex flex-col min-h-0">
            <div className="mb-3 flex items-center justify-between md:hidden">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm font-medium cursor-pointer"
              >
                Chatter & invitasjoner
              </button>
              <button
                type="button"
                onClick={handleNewChat}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium cursor-pointer"
              >
                Ny chat
              </button>
            </div>

            {selectedSession && (
              <p className="text-xs text-gray-500 mb-3 truncate hidden">
                Session owner: {selectedSession.ownerId.toHexString()}
              </p>
            )}

            <div className="flex-1 overflow-auto space-y-3 pr-1">
              {myMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-gray-500 px-8">
                  Start en ny samtale. Meldinger lagres og er tilgjengelige neste gang du logger inn.
                </div>
              ) : (
                myMessages.map((message) => {
                  const fromUser = message.role === 'user';
                  return (
                    <div
                      key={message.id.toString()}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        fromUser
                          ? 'ml-auto bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-[11px] mt-2 ${fromUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTimestampMicros(message.createdAt.microsSinceUnixEpoch)}
                      </p>
                    </div>
                  );
                })
              )}

              {streamingAssistantText.length > 0 && (
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white border border-gray-200 text-gray-900">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{streamingAssistantText}</p>
                  <p className="text-[11px] mt-2 text-gray-500">Laster inn...</p>
                </div>
              )}
            </div>

            {lastDroppedCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
                Kontekstvindu nådd: {lastDroppedCount} eldre melding(er) ble utelatt for dette svaret.
              </p>
            )}

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">{error}</p>
            )}

            <form onSubmit={handleSend} className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={conn.isActive ? 'Spør om hva som helst...' : 'Kobler til...'}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={!conn.isActive || pending}
              />
              <button
                type="submit"
                disabled={!conn.isActive || pending || input.trim().length === 0}
                className="px-5 py-3 rounded-xl bg-gray-950 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {pending ? 'Sender...' : 'Send'}
              </button>
            </form>
          </section>
        </div>
      </SignedIn>
    </div>
  );
}
