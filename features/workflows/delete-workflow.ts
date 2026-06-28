"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

export async function deleteWorkflow(
  workflowId: string
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return { success: false, error: "User not found" };

  const workflow = await prisma.workflow.findFirst({
    where: { id: workflowId, userId: dbUser.id },
  });
  if (!workflow) return { success: false, error: "Workflow not found" };

  await prisma.workflow.delete({ where: { id: workflowId } });

  revalidatePath("/dashboard/workflows");
  return { success: true, data: undefined };
}
