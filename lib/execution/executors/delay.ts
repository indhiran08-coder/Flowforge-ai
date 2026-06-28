import type { NodeExecutor } from "../types";

export const delayExecutor: NodeExecutor = async ({ node, inputData }) => {
  const data = node.data as Record<string, unknown>;
  const ms = Math.min(Number(data.delayMs ?? 1000), 30000); // max 30s

  await new Promise((res) => setTimeout(res, ms));

  return {
    success: true,
    data: { ...inputData, delayed: true, delayedMs: ms },
  };
};
