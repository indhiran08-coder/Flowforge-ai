"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/types";

const createWorkflowSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
});

export async function createWorkflow(
  input: z.infer<typeof createWorkflowSchema>
): Promise<ActionResult<{ id: string }>> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = createWorkflowSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return { success: false, error: "User not found" };

  const workflow = await prisma.workflow.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      userId: dbUser.id,
    },
  });

  revalidatePath("/dashboard/workflows");
  return { success: true, data: { id: workflow.id } };
}
