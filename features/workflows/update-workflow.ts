"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

interface SaveCanvasParams {
  workflowId: string;
  nodes: unknown[];
  edges: unknown[];
}

export async function saveCanvas({
  workflowId,
  nodes,
  edges,
}: SaveCanvasParams): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return { success: false, error: "User not found" };

  const workflow = await prisma.workflow.findFirst({
    where: { id: workflowId, userId: dbUser.id },
  });
  if (!workflow) return { success: false, error: "Workflow not found" };

  await prisma.workflow.update({
    where: { id: workflowId },
    data: {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    },
  });

  revalidatePath(`/dashboard/workflows/${workflowId}`);
  return { success: true, data: undefined };
}

export async function getWorkflow(workflowId: string) {
  const { userId } = await auth();
  if (!userId) return null;

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return null;

  return prisma.workflow.findFirst({
    where: { id: workflowId, userId: dbUser.id },
  });
}

export async function updateWorkflowStatus(
  workflowId: string,
  status: "DRAFT" | "ACTIVE" | "INACTIVE"
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return { success: false, error: "User not found" };

  await prisma.workflow.updateMany({
    where: { id: workflowId, userId: dbUser.id },
    data: { status },
  });

  revalidatePath("/dashboard/workflows");
  return { success: true, data: undefined };
}
