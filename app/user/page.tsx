export default function User() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">My Profile</h1>
        <p className="text-xl text-gray-300 mb-12 text-center">Manage your account and preferences.</p>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-white font-semibold text-xl">User</h2>
              <p className="text-gray-400">Member</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-300">Study Groups</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-300">Sessions Completed</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-300">Member Since</span>
              <span className="text-white font-medium">2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}