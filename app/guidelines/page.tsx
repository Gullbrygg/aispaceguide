export default function Guidelines() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-bg flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-fg mb-4 text-center tracking-tight">Guidelines</h1>
        <p className="text-xl text-muted mb-12 text-center">
          Learn about responsible use, risks, privacy, and academic integrity.
        </p>

        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-fg font-semibold text-xl mb-3">✅ Responsible Use</h2>
            <p className="text-muted">Use AI tools as a learning aid to understand concepts better, not to replace your own work and learning process. Always ensure your submissions reflect your own understanding.</p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-fg font-semibold text-xl mb-3">⚠️ Risks &amp; Limitations</h2>
            <p className="text-muted">AI can make mistakes and produce biased or incorrect information. Always apply critical thinking and verify information from authoritative sources before relying on it.</p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-fg font-semibold text-xl mb-3">🔒 Privacy</h2>
            <p className="text-muted">Be mindful of what personal or sensitive information you share with AI tools. Avoid sharing confidential data, exam content, or private information about others.</p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-fg font-semibold text-xl mb-3">🎓 Academic Integrity</h2>
            <p className="text-muted">Transparency is key. Always disclose AI assistance and cite it appropriately. Using AI honestly and ethically means ensuring it supports rather than replaces your learning.</p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-fg font-semibold text-xl mb-3">❓ FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="text-fg font-medium">Can I use AI for grammar correction?</p>
                <p className="text-muted text-sm mt-1">Yes, but you should cite the AI tool and explain how you used it.</p>
              </div>
              <div>
                <p className="text-fg font-medium">Is AI allowed during exams?</p>
                <p className="text-muted text-sm mt-1">Only when explicitly permitted by the instructor. When in doubt, ask first.</p>
              </div>
              <div>
                <p className="text-fg font-medium">How should I cite AI assistance?</p>
                <p className="text-muted text-sm mt-1">Follow your institution&apos;s citation guidelines and clearly describe how the AI was used in your work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
