import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";

type ExecutionWithWorkflow = {
  id: string;
  status: string;
  createdAt: Date;
  startedAt: Date | null;
  finishedAt: Date | null;
  workflowId: string;
  workflow: { id: string; name: string };
};

const statusConfig = {
  SUCCESS: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  FAILED:  { icon: XCircle,      color: "text-red-600",     bg: "bg-red-50",     badge: "bg-red-100 text-red-700 border-red-200" },
  RUNNING: { icon: Loader2,      color: "text-blue-600",    bg: "bg-blue-50",    badge: "bg-blue-100 text-blue-700 border-blue-200" },
  PENDING: { icon: Clock,        color: "text-amber-600",   bg: "bg-amber-50",   badge: "bg-amber-100 text-amber-700 border-amber-200" },
};

export default async function ExecutionsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

  const executions = dbUser
    ? await prisma.execution.findMany({
        where: { workflow: { userId: dbUser.id } },
        include: { workflow: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Executions</h1>
        <p className="text-slate-500 mt-1">
          {executions.length} execution{executions.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {executions.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-slate-50 p-4">
              <History className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              No executions yet
            </h2>
            <p className="text-slate-500 text-sm max-w-xs">
              Run a workflow to see execution history here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Recent Executions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {(executions as ExecutionWithWorkflow[]).map((exec) => {
                const config = statusConfig[exec.status as keyof typeof statusConfig] ?? statusConfig.PENDING;
                const Icon = config.icon;
                return (
                  <div
                    key={exec.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className={`rounded-lg p-2 ${config.bg}`}>
                      <Icon className={`h-4 w-4 ${config.color} ${exec.status === "RUNNING" ? "animate-spin" : ""}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/dashboard/workflows/${exec.workflow.id}`}
                        className="font-medium text-slate-900 hover:text-indigo-600 transition-colors text-sm truncate block"
                      >
                        {exec.workflow.name}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {format(new Date(exec.createdAt), "MMM d, yyyy · h:mm a")}
                        {" · "}
                        {formatDistanceToNow(new Date(exec.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs flex-shrink-0 ${config.badge}`}
                    >
                      {exec.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
