export default function Guidelines() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">Guidelines</h1>
        <p className="text-xl text-gray-300 mb-12 text-center">
          Learn about responsible use, risks, privacy, and academic integrity.
        </p>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">✅ Responsible Use</h2>
            <p className="text-gray-300">Use AI tools as a learning aid to understand concepts better, not to replace your own work and learning process. Always ensure your submissions reflect your own understanding.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">⚠️ Risks &amp; Limitations</h2>
            <p className="text-gray-300">AI can make mistakes and produce biased or incorrect information. Always apply critical thinking and verify information from authoritative sources before relying on it.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">🔒 Privacy</h2>
            <p className="text-gray-300">Be mindful of what personal or sensitive information you share with AI tools. Avoid sharing confidential data, exam content, or private information about others.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">🎓 Academic Integrity</h2>
            <p className="text-gray-300">Transparency is key. Always disclose AI assistance and cite it appropriately. Using AI honestly and ethically means ensuring it supports rather than replaces your learning.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-white font-semibold text-xl mb-3">❓ FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium">Can I use AI for grammar correction?</p>
                <p className="text-gray-300 text-sm mt-1">Yes, but you should cite the AI tool and explain how you used it.</p>
              </div>
              <div>
                <p className="text-white font-medium">Is AI allowed during exams?</p>
                <p className="text-gray-300 text-sm mt-1">Only when explicitly permitted by the instructor. When in doubt, ask first.</p>
              </div>
              <div>
                <p className="text-white font-medium">How should I cite AI assistance?</p>
                <p className="text-gray-300 text-sm mt-1">Follow your institution&apos;s citation guidelines and clearly describe how the AI was used in your work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
