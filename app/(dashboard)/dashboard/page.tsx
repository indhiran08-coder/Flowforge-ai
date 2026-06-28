import { auth, currentUser } from "@clerk/nextjs/server";
import { GitBranch, History, Zap, TrendingUp, CheckCircle2, XCircle, ArrowRight, Activity } from "lucide-react";
import { syncUser } from "@/features/auth/sync-user";
import { getDashboardStats } from "@/features/workflows/get-workflows";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (userId && user) {
    await syncUser({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    });
  }

  const stats = await getDashboardStats();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Find max trend value for bar scaling
  const maxTrend = Math.max(...stats.trend.map((d) => d.success + d.failed), 1);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {greeting}, {user?.firstName ?? "there"} 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Here&apos;s your automation overview for today.</p>
        </div>
        <Link
          href="/dashboard/workflows"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <GitBranch className="h-4 w-4" />
          My Workflows
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Workflows"
          value={stats.workflows}
          icon={<GitBranch className="h-5 w-5 text-violet-600" />}
          bg="bg-violet-50"
          href="/dashboard/workflows"
        />
        <StatCard
          label="Total Executions"
          value={stats.executions}
          icon={<Zap className="h-5 w-5 text-blue-600" />}
          bg="bg-blue-50"
          href="/dashboard/executions"
        />
        <StatCard
          label="Runs This Week"
          value={stats.recentRuns}
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
          bg="bg-emerald-50"
          sub={stats.recentRuns > 0 ? `+${stats.recentRuns} this week` : "No runs yet"}
        />
        <StatCard
          label="Success Rate"
          value={`${stats.successRate}%`}
          icon={<CheckCircle2 className="h-5 w-5 text-teal-600" />}
          bg="bg-teal-50"
          sub={`${stats.successCount} passed · ${stats.failedCount} failed`}
          highlight={stats.successRate >= 80 ? "good" : stats.successRate >= 50 ? "warn" : stats.executions > 0 ? "bad" : undefined}
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 30-day trend chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-800">Execution Trend</h2>
              <p className="text-xs text-slate-400 mt-0.5">Last 30 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />Success</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />Failed</span>
            </div>
          </div>
          {stats.executions === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-slate-300">
              <Activity className="h-8 w-8 mb-2" />
              <p className="text-sm">No executions yet — run a workflow to see data</p>
            </div>
          ) : (
            <div className="flex items-end gap-0.5 h-36 w-full">
              {stats.trend.map((d, i) => {
                const total = d.success + d.failed;
                const heightPct = total === 0 ? 0 : (total / maxTrend) * 100;
                const successPct = total > 0 ? (d.success / total) * 100 : 0;
                const label = i === 0 || i === 14 || i === 29
                  ? new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : "";
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="w-full flex flex-col-reverse" style={{ height: "120px" }}>
                      <div
                        className="w-full rounded-t-sm overflow-hidden transition-all"
                        style={{ height: `${heightPct}%` }}
                      >
                        <div className="w-full bg-indigo-500" style={{ height: `${successPct}%` }} />
                        <div className="w-full bg-red-400" style={{ height: `${100 - successPct}%` }} />
                      </div>
                    </div>
                    {/* Tooltip */}
                    {total > 0 && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                        <div className="bg-slate-800 text-white text-[10px] px-2 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                          <p className="font-semibold">{d.date}</p>
                          <p className="text-emerald-400">{d.success} success</p>
                          <p className="text-red-400">{d.failed} failed</p>
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
                      </div>
                    )}
                    {label && <span className="text-[9px] text-slate-400 truncate w-full text-center">{label}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top workflows */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4">Most Active Workflows</h2>
          {stats.topWorkflows.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-slate-300">
              <GitBranch className="h-8 w-8 mb-2" />
              <p className="text-sm text-center">Create and run workflows to see rankings</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.topWorkflows.map((wf, i) => {
                const maxCount = stats.topWorkflows[0]?.count ?? 1;
                const pct = Math.round((wf.count / maxCount) * 100);
                return (
                  <Link key={wf.id} href={`/dashboard/workflows/${wf.id}`} className="block group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-4">#{i + 1}</span>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors truncate max-w-[140px]">{wf.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{wf.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <Link href="/dashboard/workflows" className="flex items-center gap-1.5 mt-5 text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
            View all workflows <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Recent Activity</h2>
          <Link href="/dashboard/executions" className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {stats.recentExecutions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-300">
            <History className="h-8 w-8 mb-2" />
            <p className="text-sm">No executions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stats.recentExecutions.map((ex) => (
              <Link key={ex.id} href={`/dashboard/executions/${ex.id}`}
                className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  ex.status === "SUCCESS" ? "bg-emerald-50" : ex.status === "FAILED" ? "bg-red-50" : "bg-blue-50"
                }`}>
                  {ex.status === "SUCCESS"
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    : ex.status === "FAILED"
                    ? <XCircle className="h-4 w-4 text-red-500" />
                    : <Zap className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-700 transition-colors truncate">
                    {ex.workflowName}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(ex.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  ex.status === "SUCCESS"
                    ? "bg-emerald-50 text-emerald-700"
                    : ex.status === "FAILED"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-50 text-blue-700"
                }`}>
                  {ex.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { href: "/dashboard/workflows", icon: "✦", label: "Create Workflow", desc: "Build a new automation", bg: "from-indigo-600 to-violet-600" },
          { href: "/dashboard/executions", icon: "📋", label: "Execution Logs", desc: "Debug your last runs", bg: "from-slate-700 to-slate-800" },
          { href: "/dashboard/settings/credentials", icon: "🔑", label: "Manage Keys", desc: "Add API credentials", bg: "from-emerald-600 to-teal-600" },
        ].map((a) => (
          <Link key={a.href} href={a.href}
            className={`flex items-center gap-4 p-4 bg-gradient-to-br ${a.bg} rounded-2xl text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}>
            <span className="text-2xl">{a.icon}</span>
            <div>
              <p className="font-semibold text-sm">{a.label}</p>
              <p className="text-xs opacity-75 mt-0.5">{a.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Stat card component ──────────────────────────────────────────

function StatCard({
  label, value, icon, bg, href, sub, highlight,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bg: string;
  href?: string;
  sub?: string;
  highlight?: "good" | "warn" | "bad";
}) {
  const HIGHLIGHT_CLS: Record<"good" | "warn" | "bad", string> = {
    good: "text-emerald-600",
    warn: "text-amber-500",
    bad:  "text-red-500",
  };
  const highlightCls = highlight ? HIGHLIGHT_CLS[highlight] : "text-slate-400";

  const inner = (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        <div className={`${bg} p-2.5 rounded-xl`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      {sub && <p className={`text-xs mt-1.5 font-medium ${highlightCls}`}>{sub}</p>}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}