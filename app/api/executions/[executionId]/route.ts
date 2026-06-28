import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ executionId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { executionId } = await params;

  const execution = await prisma.execution.findUnique({
    where: { id: executionId },
    include: {
      logs: { orderBy: { createdAt: "asc" } },
      workflow: { select: { id: true, name: true } },
    },
  });

  if (!execution) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(execution);
}
