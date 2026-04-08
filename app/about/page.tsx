import Link from "next/link";

export default function Student() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">For Students</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Join study groups, collaborate with peers, and achieve academic excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-left">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-white font-semibold text-lg mb-2">Study Groups</h3>
            <p className="text-gray-300 text-sm">Find and join study groups for your courses. Collaborate in real-time with classmates.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-left">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-white font-semibold text-lg mb-2">Peer Learning</h3>
            <p className="text-gray-300 text-sm">Share knowledge, ask questions, and help others grow through collaborative learning.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-left">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-white font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-300 text-sm">Monitor your academic journey and celebrate milestones with your study community.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/"
            className="bg-white/5 backdrop-blur-lg border border-white/10 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}