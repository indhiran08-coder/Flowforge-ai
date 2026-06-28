"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";

export async function getWorkflows() {
  const { userId } = await auth();
  if (!userId) return [];

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return [];

  return prisma.workflow.findMany({
    where: { userId: dbUser.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { executions: true } },
    },
  });
}

export async function getDashboardStats() {
  const { userId } = await auth();
  if (!userId) return getEmptyStats();

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return getEmptyStats();

  const uid = dbUser.id;
  const now = new Date();
  const weekAgo  = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    workflows,
    totalExecs,
    recentRuns,
    successCount,
    failedCount,
    recentExecutions,
    topWorkflows,
  ] = await Promise.all([
    // Counts
    prisma.workflow.count({ where: { userId: uid } }),
    prisma.execution.count({ where: { workflow: { userId: uid } } }),
    prisma.execution.count({ where: { workflow: { userId: uid }, createdAt: { gte: weekAgo } } }),
    prisma.execution.count({ where: { workflow: { userId: uid }, status: "SUCCESS" } }),
    prisma.execution.count({ where: { workflow: { userId: uid }, status: "FAILED" } }),

    // Last 8 executions for activity feed
    prisma.execution.findMany({
      where: { workflow: { userId: uid } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { workflow: { select: { name: true } } },
    }),

    // Top 5 workflows by execution count
    prisma.workflow.findMany({
      where: { userId: uid },
      include: { _count: { select: { executions: true } } },
      orderBy: { executions: { _count: "desc" } },
      take: 5,
    }),
  ]);

  // 30-day execution trend — group by day
  const trendRaw = await prisma.execution.findMany({
    where: { workflow: { userId: uid }, createdAt: { gte: monthAgo } },
    select: { createdAt: true, status: true },
    orderBy: { createdAt: "asc" },
  });

  // Build day buckets
  const dayMap: Record<string, { success: number; failed: number }> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(monthAgo.getTime() + i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    dayMap[key] = { success: 0, failed: 0 };
  }
  for (const ex of trendRaw) {
    const key = ex.createdAt.toISOString().slice(0, 10);
    if (dayMap[key]) {
      if (ex.status === "SUCCESS") dayMap[key].success++;
      else if (ex.status === "FAILED") dayMap[key].failed++;
    }
  }
  const trend = Object.entries(dayMap).map(([date, counts]) => ({ date, ...counts }));

  const successRate = totalExecs > 0
    ? Math.round((successCount / totalExecs) * 100)
    : 0;

  return {
    workflows,
    executions: totalExecs,
    recentRuns,
    successCount,
    failedCount,
    successRate,
    recentExecutions: recentExecutions.map((e) => ({
      id: e.id,
      workflowName: (e.workflow as { name: string }).name,
      status: e.status,
      createdAt: e.createdAt.toISOString(),
    })),
    topWorkflows: topWorkflows.map((w) => ({
      id: w.id,
      name: w.name,
      count: w._count.executions,
    })),
    trend,
  };
}

function getEmptyStats() {
  return {
    workflows: 0, executions: 0, recentRuns: 0,
    successCount: 0, failedCount: 0, successRate: 0,
    recentExecutions: [], topWorkflows: [], trend: [],
  };
}
