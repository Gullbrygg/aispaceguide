import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type OpenRouterResponse = {
  choices?: Array<{ message?: { role?: string; content?: string } }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  error?: { message?: string };
};

type OpenRouterStreamChunk = {
  choices?: Array<{ delta?: { content?: string } }>;
};

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4o-mini';
const MAX_INPUT_TOKENS = Number(process.env.OPENROUTER_MAX_INPUT_TOKENS ?? '6000');
const MAX_OUTPUT_TOKENS = Number(process.env.OPENROUTER_MAX_OUTPUT_TOKENS ?? '700');

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function trimMessagesToBudget(messages: ChatMessage[], budgetTokens: number): { trimmed: ChatMessage[]; droppedCount: number } {
  let used = 0;
  const selected: ChatMessage[] = [];

  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    const msgTokens = estimateTokens(msg.content) + 6;
    if (used + msgTokens > budgetTokens) {
      continue;
    }
    used += msgTokens;
    selected.push(msg);
  }

  selected.reverse();
  return {
    trimmed: selected,
    droppedCount: Math.max(0, messages.length - selected.length),
  };
}

function createStreamedAssistantResponse(upstream: Response): Response {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body?.getReader();
      if (!reader) {
        controller.error(new Error('Streaming response body is missing'));
        return;
      }

      let buffer = '';

      const processLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) return;

        const payload = trimmed.slice(5).trim();
        if (!payload || payload === '[DONE]') return;

        try {
          const parsed = JSON.parse(payload) as OpenRouterStreamChunk;
          const delta = parsed.choices?.[0]?.delta?.content;
          if (typeof delta === 'string' && delta.length > 0) {
            controller.enqueue(encoder.encode(delta));
          }
        } catch {
          // Ignore malformed stream fragments.
        }
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            processLine(line);
          }
        }

        if (buffer.length > 0) {
          processLine(buffer);
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      } finally {
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY is not configured' },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[]; model?: string; stream?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const cleaned = rawMessages
    .filter((m): m is ChatMessage => Boolean(m?.role) && Boolean(m?.content))
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content.length > 0);

  if (cleaned.length === 0) {
    return NextResponse.json({ error: 'No messages to send' }, { status: 400 });
  }

  const systemPrompt: ChatMessage = {
    role: 'system',
    content: `Du er AIGuidebook-assistenten – en hjelpsom, presis og pedagogisk AI-assistent innebygd i AIGuidebook (gullbrygg.com), en norsk veiledningsplattform for universitets- og høyskolestudenter.

## Hva er AIGuidebook?
AIGuidebook er et gratis nettsted laget for å hjelpe studenter, lærere og utdanningsinstitusjoner i Norge med å bruke kunstig intelligens på en ansvarlig, akademisk ærlig og trygg måte. Nettsiden inneholder:
- **Retningslinjer** (/guidelines): Klare regler og eksempler på tillatt vs. uakseptabel AI-bruk
- **Viktige emner**: Akademisk integritet, personvern og datasikkerhet, AI-hallusinasjoner, algoritmisk bias, etisk AI-bruk, og kritisk tenkning
- **Quiz** (/quiz): Interaktiv kunnskapstest om ansvarlig AI-bruk
- **FAQ** (/faq): Svar på vanlige spørsmål
- **Dashboard** (/dashboard): Oversikt for innloggede brukere
- **Chat** (/chat): Denne AI-chatten – for å stille spørsmål og få hjelp

## Din rolle
- Svar alltid på det språket brukeren skriver på (norsk eller engelsk)
- Gi korte, konkrete og nyttige svar tilpasset studenter i høyere utdanning
- Hjelp med spørsmål om: ansvarlig AI-bruk, akademisk integritet, personvern, hallusinasjoner, kildebruk med AI, hva som er tillatt på eksamen/innlevering
- Henvis til relevante sider på AIGuidebook når det passer (f.eks. "Se /guidelines for mer info")
- Vær ærlig om usikkerhet – si fra når du ikke vet eller når regler varierer mellom institusjoner
- Ikke skriv studenters oppgaver for dem – hjelp dem heller å forstå og tenke selv
- Hold svarene konsise (maks 3–5 avsnitt med mindre brukeren ber om mer)

## Viktige temaer du kjenner godt
- Hva er AI-hallusinasjoner og hvordan gjenkjenner/unngår man dem?
- Grensen mellom lovlig AI-hjelp og akademisk fusk
- GDPR og personvern: hva du ikke bør dele med AI-verktøy
- Bias i AI-modeller og hvordan det påvirker resultater
- Hvordan sitere/referere til AI-generert innhold
- Hvilke AI-verktøy er vanlige i akademia (ChatGPT, Copilot, Claude, Gemini, Perplexity, Sikt.no)`,
  };

  const budget = Math.max(500, MAX_INPUT_TOKENS - MAX_OUTPUT_TOKENS);
  const { trimmed, droppedCount } = trimMessagesToBudget(cleaned, budget);
  const payloadMessages: ChatMessage[] = [systemPrompt, ...trimmed];

  const stream = body.stream === true;

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001',
      'X-Title': 'AI Guidebook Chat',
    },
    body: JSON.stringify({
      model: body.model ?? DEFAULT_MODEL,
      messages: payloadMessages,
      stream,
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
    }),
  });

  if (stream) {
    if (!response.ok) {
      let errorMessage = 'OpenRouter request failed';
      try {
        const data = (await response.json()) as OpenRouterResponse;
        errorMessage = data.error?.message ?? errorMessage;
      } catch {
        // ignore parsing error
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    return createStreamedAssistantResponse(response);
  }

  const data = (await response.json()) as OpenRouterResponse;

  if (!response.ok) {
    return NextResponse.json(
      {
        error: data.error?.message ?? 'OpenRouter request failed',
      },
      { status: response.status }
    );
  }

  const assistantMessage = data.choices?.[0]?.message?.content?.trim();
  if (!assistantMessage) {
    return NextResponse.json(
      { error: 'OpenRouter returned an empty response' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    assistantMessage,
    usage: {
      promptTokens: data.usage?.prompt_tokens ?? estimateTokens(payloadMessages.map((m) => m.content).join('\n')),
      completionTokens: data.usage?.completion_tokens ?? estimateTokens(assistantMessage),
      totalTokens: data.usage?.total_tokens,
    },
    context: {
      messagesSent: payloadMessages.length,
      droppedMessages: droppedCount,
    },
  });
}
