"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function getCredentials() {
  const { userId } = await auth();
  if (!userId) return [];
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return [];
  return prisma.credential.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, type: true, createdAt: true }, // never return data
  });
}

export async function createCredential(input: {
  name: string;
  type: string;
  data: Record<string, string>;
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return { success: false, error: "User not found" };

  if (!input.name.trim()) return { success: false, error: "Name is required" };

  await prisma.credential.create({
    data: {
      name: input.name.trim(),
      type: input.type,
      data: JSON.parse(JSON.stringify(input.data)),
      userId: dbUser.id,
    },
  });

  revalidatePath("/dashboard/settings/credentials");
  return { success: true };
}

export async function deleteCredential(id: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser) return { success: false, error: "User not found" };

  await prisma.credential.deleteMany({
    where: { id, userId: dbUser.id },
  });

  revalidatePath("/dashboard/settings/credentials");
  return { success: true };
}
