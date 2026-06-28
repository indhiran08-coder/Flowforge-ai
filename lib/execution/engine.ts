import type { Node, Edge } from "@xyflow/react";
import { prisma } from "@/lib/db/prisma";
import { executors } from "./executors";
import type { ExecutorContext, ExecutorResult } from "./types";

/**
 * Kicks off workflow execution — creates an Execution record and
 * runs the workflow asynchronously. Returns the execution ID immediately.
 */
export async function executeWorkflow(
  workflowId: string,
  triggerData: Record<string, unknown> = {}
): Promise<string> {
  const execution = await prisma.execution.create({
    data: {
      workflowId,
      status: "RUNNING",
      startedAt: new Date(),
    },
  });

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
  });

  if (!workflow) {
    await prisma.execution.update({
      where: { id: execution.id },
      data: { status: "FAILED", finishedAt: new Date() },
    });
    return execution.id;
  }

  const nodes = (workflow.nodes as unknown as Node[]) ?? [];
  const edges = (workflow.edges as unknown as Edge[]) ?? [];

  // Run async without blocking the response
  runExecution(execution.id, nodes, edges, triggerData).catch(async (err) => {
    console.error("[execution engine] unhandled error:", err);
    await prisma.execution.update({
      where: { id: execution.id },
      data: { status: "FAILED", finishedAt: new Date() },
    });
  });

  return execution.id;
}

/**
 * Core execution loop — topological sort → run each node in order.
 */
async function runExecution(
  executionId: string,
  nodes: Node[],
  edges: Edge[],
  triggerData: Record<string, unknown>
) {
  // Build graph structures
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const incomingEdges = new Map<string, Edge[]>();
  const outgoingEdges = new Map<string, Edge[]>();

  for (const node of nodes) {
    incomingEdges.set(node.id, []);
    outgoingEdges.set(node.id, []);
  }
  for (const edge of edges) {
    incomingEdges.get(edge.target)?.push(edge);
    outgoingEdges.get(edge.source)?.push(edge);
  }

  // Topological sort (Kahn's algorithm)
  const inDegree = new Map<string, number>();
  for (const node of nodes) inDegree.set(node.id, 0);
  for (const edge of edges) {
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }

  const executionOrder: string[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    executionOrder.push(id);
    for (const edge of outgoingEdges.get(id) ?? []) {
      const newDeg = (inDegree.get(edge.target) ?? 1) - 1;
      inDegree.set(edge.target, newDeg);
      if (newDeg === 0) queue.push(edge.target);
    }
  }

  // Track outputs and skipped nodes
  const allOutputs: Record<string, Record<string, unknown>> = {};
  const skippedNodes = new Set<string>();
  let overallSuccess = true;

  for (const nodeId of executionOrder) {
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    // Skip if any upstream node was skipped/failed (unless it's a trigger)
    const upstream = incomingEdges.get(nodeId) ?? [];
    const shouldSkip =
      upstream.length > 0 &&
      upstream.every((e) => skippedNodes.has(e.source));

    if (shouldSkip) {
      skippedNodes.add(nodeId);
      await logNode(executionId, nodeId, node.type ?? "unknown", "skipped", "Skipped — upstream node failed", null);
      continue;
    }

    // Gather input from upstream
    let inputData: Record<string, unknown> = triggerData;
    if (upstream.length > 0) {
      const primarySource = upstream.find((e) => !e.sourceHandle || e.sourceHandle === "output") ?? upstream[0];
      inputData = allOutputs[primarySource.source] ?? triggerData;
    }

    const ctx: ExecutorContext = {
      node,
      inputData,
      executionId,
      allOutputs,
    };

    let result: ExecutorResult;
    try {
      const executor = executors[node.type ?? ""];
      if (!executor) {
        result = { success: false, error: `No executor for node type "${node.type}"` };
      } else {
        result = await executor(ctx);
      }
    } catch (err) {
      result = {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }

    allOutputs[nodeId] = { ...(result.data ?? {}), __label: (node.data as Record<string, unknown>)?.label };

    await logNode(
      executionId,
      nodeId,
      node.type ?? "unknown",
      result.success ? "SUCCESS" : "ERROR",
      result.success ? "Executed successfully" : (result.error ?? "Failed"),
      result.data ?? null
    );

    if (!result.success) {
      overallSuccess = false;
      skippedNodes.add(nodeId);
      // Mark downstream as skipped
      const downstream = outgoingEdges.get(nodeId) ?? [];
      for (const edge of downstream) skippedNodes.add(edge.target);
    }

    // Handle IF branching — skip the wrong branch
    if (result.branch && node.type === "IF_CONDITION") {
      const wrongBranch = result.branch === "true" ? "false" : "true";
      for (const edge of outgoingEdges.get(nodeId) ?? []) {
        if (edge.sourceHandle === wrongBranch) skippedNodes.add(edge.target);
      }
    }
  }

  await prisma.execution.update({
    where: { id: executionId },
    data: {
      status: overallSuccess ? "SUCCESS" : "FAILED",
      finishedAt: new Date(),
    },
  });
}

async function logNode(
  executionId: string,
  nodeId: string,
  nodeType: string,
  status: string,
  message: string,
  output: Record<string, unknown> | null
) {
  await prisma.executionLog.create({
    data: {
      executionId,
      nodeId,
      nodeType,
      status,
      message,
      output: output ? JSON.parse(JSON.stringify(output)) : null,
    },
  });
}
