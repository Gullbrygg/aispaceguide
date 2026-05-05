"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
  className?: string;
};

export default function MarkdownContent({ content, className = "" }: Props) {
  return (
    <div className={`text-sm leading-relaxed break-words ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-2 last:mb-0 space-y-0.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-2 last:mb-0 space-y-0.5">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
            >
              {children}
            </a>
          ),
          code: ({ className: cls, children }) => {
            const isBlock = /language-/.test(cls ?? "");
            if (isBlock) {
              return (
                <code className={`${cls ?? ""} font-mono text-[0.85em]`}>
                  {children}
                </code>
              );
            }
            return (
              <code className="font-mono text-[0.85em] bg-black/10 rounded px-1 py-0.5">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-black/10 rounded-lg p-2 mb-2 last:mb-0 overflow-x-auto text-[0.85em]">
              {children}
            </pre>
          ),
          h1: ({ children }) => (
            <h1 className="text-base font-semibold mb-2 last:mb-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold mb-2 last:mb-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold mb-2 last:mb-0">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-current/30 pl-3 italic mb-2 last:mb-0 opacity-90">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-3 border-current/20" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-2 last:mb-0">
              <table className="border-collapse text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-current/20 px-2 py-1 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-current/20 px-2 py-1">{children}</td>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
