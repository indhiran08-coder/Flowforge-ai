import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { executeWorkflow } from "@/lib/execution/engine";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  const { workflowId } = await params;

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
  }

  // Parse incoming payload
  let payload: Record<string, unknown> = {};
  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const text = await req.text();
      payload = { body: text };
    }
  } catch {
    payload = {};
  }

  const triggerData = {
    webhookId: workflowId,
    method: req.method,
    headers: Object.fromEntries(req.headers.entries()),
    query: Object.fromEntries(new URL(req.url).searchParams.entries()),
    body: payload,
    timestamp: new Date().toISOString(),
  };

  const executionId = await executeWorkflow(workflowId, triggerData);

  return NextResponse.json({ executionId, received: true });
}

// Also accept GET webhooks (some services use GET)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  const { workflowId } = await params;

  const workflow = await prisma.workflow.findUnique({ where: { id: workflowId } });
  if (!workflow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const triggerData = {
    trigger: "webhook",
    method: "GET",
    query: Object.fromEntries(new URL(req.url).searchParams.entries()),
    timestamp: new Date().toISOString(),
  };

  const executionId = await executeWorkflow(workflowId, triggerData);
  return NextResponse.json({ executionId, received: true });
}
