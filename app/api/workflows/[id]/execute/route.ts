import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { executeWorkflow } from "@/lib/execution/engine";
import { sendFailureAlert } from "@/lib/emails";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: workflowId } = await params;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Plan limits will be enforced when Stripe billing is added

  const workflow = await prisma.workflow.findFirst({
    where: { id: workflowId, userId: dbUser.id },
  });
  if (!workflow) return NextResponse.json({ error: "Workflow not found" }, { status: 404 });

  // Increment run counter
  await prisma.user.update({
    where: { id: dbUser.id },
    data:  { runsThisMonth: { increment: 1 } },
  });

  // Parse optional trigger data
  let triggerData: Record<string, unknown> = {};
  try {
    const body = await req.json();
    if (typeof body === "object" && body !== null) triggerData = body as Record<string, unknown>;
  } catch { /* empty body is fine */ }

  const executionId = await executeWorkflow(workflowId, triggerData);

  // Send failure alert asynchronously (don't await — non-blocking)
  void (async () => {
    try {
      const execution = await prisma.execution.findUnique({
        where: { id: executionId },
        include: { logs: { where: { status: "ERROR" }, take: 1 } },
      });
      if (execution?.status === "FAILED" && dbUser.email) {
        await sendFailureAlert({
          to:            dbUser.email,
          userName:      dbUser.firstName ?? "there",
          workflowName:  workflow.name,
          executionId,
          errorMessage:  execution.logs[0]?.message ?? "Unknown error",
        });
      }
    } catch { /* email errors should never crash the response */ }
  })();

  return NextResponse.json({ executionId, status: "RUNNING" });
}


export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: workflowId } = await params;
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const executions = await prisma.execution.findMany({
    where: { workflow: { id: workflowId, userId: dbUser.id } },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { logs: { orderBy: { createdAt: "asc" } } },
  });

  return NextResponse.json({ executions });
}
