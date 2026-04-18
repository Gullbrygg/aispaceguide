export default function Dashboard() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-bg flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-fg mb-4 text-center tracking-tight">Dashboard</h1>
        <p className="text-xl text-muted mb-12 text-center">Welcome back! Here&apos;s what&apos;s happening.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-fg font-semibold text-lg mb-1">Study Groups</h3>
            <p className="text-4xl font-bold text-fg">0</p>
            <p className="text-subtle text-sm mt-1">Active groups</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-fg font-semibold text-lg mb-1">Members</h3>
            <p className="text-4xl font-bold text-fg">0</p>
            <p className="text-subtle text-sm mt-1">Connected peers</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-fg font-semibold text-lg mb-1">Sessions</h3>
            <p className="text-4xl font-bold text-fg">0</p>
            <p className="text-subtle text-sm mt-1">Study sessions</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
          <h2 className="text-fg font-semibold text-xl mb-4">Recent Activity</h2>
          <p className="text-muted">No recent activity yet. Join or create a study group to get started!</p>
        </div>
      </div>
    </div>
  );
}
