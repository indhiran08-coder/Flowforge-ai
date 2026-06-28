import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Clock, Loader2, AlertCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

type LogStatus = "SUCCESS" | "ERROR" | "skipped";

const LOG_STYLES: Record<LogStatus | string, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
  SUCCESS: { icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  ERROR:   { icon: <XCircle className="h-4 w-4 text-red-600" />,          bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200"     },
  skipped: { icon: <AlertCircle className="h-4 w-4 text-slate-400" />,    bg: "bg-slate-50",   text: "text-slate-500",   border: "border-slate-200"   },
  RUNNING: { icon: <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};

export default async function ExecutionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const { id: executionId } = await params;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return null;

  const execution = await prisma.execution.findFirst({
    where: {
      id: executionId,
      workflow: { userId: dbUser.id },
    },
    include: {
      logs: { orderBy: { createdAt: "asc" } },
      workflow: { select: { id: true, name: true } },
    },
  });

  if (!execution) notFound();

  const duration =
    execution.finishedAt && execution.startedAt
      ? ((execution.finishedAt.getTime() - execution.startedAt.getTime()) / 1000).toFixed(1)
      : null;

  const statusStyle = LOG_STYLES[execution.status] ?? LOG_STYLES.skipped;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + header */}
      <div>
        <Link
          href="/dashboard/executions"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          All Executions
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {(execution.workflow as { name: string }).name}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Execution · <code className="font-mono text-xs bg-slate-100 px-1 rounded">{execution.id.slice(0, 8)}…</code>
              · {formatDistanceToNow(new Date(execution.createdAt), { addSuffix: true })}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusStyle.bg} ${statusStyle.border}`}>
            {statusStyle.icon}
            <span className={`text-sm font-semibold ${statusStyle.text}`}>{execution.status}</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Started", value: execution.startedAt ? format(new Date(execution.startedAt), "HH:mm:ss") : "—" },
          { label: "Duration", value: duration ? `${duration}s` : "In progress…" },
          { label: "Nodes Run", value: `${execution.logs.length}` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{s.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Execution log timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Node Execution Timeline</h2>
        </div>

        {execution.logs.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Waiting for execution logs…
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {execution.logs.map((log, idx) => {
              const style = LOG_STYLES[log.status] ?? LOG_STYLES.skipped;
              const output = log.output as Record<string, unknown> | null;
              return (
                <details key={log.id} className="group">
                  <summary className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors list-none`}>
                    {/* Step number */}
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    {/* Status icon */}
                    <div className={`${style.bg} p-2 rounded-lg border ${style.border} shrink-0`}>
                      {style.icon}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{log.message}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {log.nodeType} · {log.nodeId.slice(0, 10)}…
                      </p>
                    </div>
                    {/* Status badge */}
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${style.bg} ${style.text} ${style.border} shrink-0`}>
                      {log.status}
                    </span>
                    {/* Time */}
                    <Clock className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    <span className="text-xs text-slate-400 shrink-0">
                      {format(new Date(log.createdAt), "HH:mm:ss")}
                    </span>
                  </summary>

                  {/* Expandable output */}
                  {output && (
                    <div className="px-6 pb-4 pt-2 bg-slate-50 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Output Data</p>
                      <pre className="text-xs bg-slate-900 text-emerald-400 rounded-xl p-4 overflow-x-auto leading-relaxed">
                        {JSON.stringify(output, null, 2)}
                      </pre>
                    </div>
                  )}
                </details>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href={`/dashboard/workflows/${(execution.workflow as { id: string }).id}`}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Open Workflow
        </Link>
        <Link
          href="/dashboard/executions"
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          All Executions
        </Link>
      </div>
    </div>
  );
}
