export default function Dashboard() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">Dashboard</h1>
        <p className="text-xl text-gray-300 mb-12 text-center">Welcome back! Here&apos;s what&apos;s happening.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-1">Study Groups</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm mt-1">Active groups</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-1">Members</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm mt-1">Connected peers</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-1">Sessions</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm mt-1">Study sessions</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8">
          <h2 className="text-white font-semibold text-xl mb-4">Recent Activity</h2>
          <p className="text-gray-400">No recent activity yet. Join or create a study group to get started!</p>
        </div>
      </div>
    </div>
  );
}
