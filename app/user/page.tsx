export default function User() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-bg flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-fg mb-4 text-center tracking-tight">My Profile</h1>
        <p className="text-xl text-muted mb-12 text-center">Manage your account and preferences.</p>

        <div className="bg-surface border border-border rounded-xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent-tint border border-accent-border flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-fg font-semibold text-xl">User</h2>
              <p className="text-muted">Member</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">Study Groups</span>
              <span className="text-fg font-medium">0</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">Sessions Completed</span>
              <span className="text-fg font-medium">0</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted">Member Since</span>
              <span className="text-fg font-medium">2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}