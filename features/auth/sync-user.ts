import { prisma } from "@/lib/db/prisma";

interface SyncUserParams {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

export async function syncUser(params: SyncUserParams) {
  const { clerkId, email, firstName, lastName, imageUrl } = params;

  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        firstName,
        lastName,
        imageUrl,
      },
      create: {
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
      },
    });

    return user;
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}