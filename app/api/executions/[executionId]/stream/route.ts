import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";

/**
 * Server-Sent Events endpoint for real-time execution status.
 * Client connects → receives execution updates every 800ms until done.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ executionId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { executionId } = await params;

  const encoder = new TextEncoder();
  let stopped = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          stopped = true;
        }
      };

      // Poll until execution completes
      while (!stopped) {
        try {
          const execution = await prisma.execution.findUnique({
            where: { id: executionId },
            include: {
              logs: { orderBy: { createdAt: "asc" } },
              workflow: { select: { id: true, name: true } },
            },
          });

          if (!execution) {
            send({ error: "Execution not found" });
            break;
          }

          send({
            id: execution.id,
            status: execution.status,
            startedAt: execution.startedAt,
            finishedAt: execution.finishedAt,
            logs: execution.logs.map((l) => ({
              id: l.id,
              nodeId: l.nodeId,
              nodeType: l.nodeType,
              status: l.status,
              message: l.message,
              output: l.output,
              createdAt: l.createdAt,
            })),
          });

          if (execution.status === "SUCCESS" || execution.status === "FAILED") {
            break;
          }
        } catch {
          break;
        }

        await new Promise((res) => setTimeout(res, 800));
      }

      try { controller.close(); } catch { /* already closed */ }
    },
    cancel() {
      stopped = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection":    "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
