import type { NodeExecutor, SetVariablesNodeData } from "../types";
import { resolveTemplate } from "../template";

export const setVariablesExecutor: NodeExecutor = async ({ node, inputData, allOutputs }) => {
  const data = node.data as SetVariablesNodeData;
  const assignments = data.assignments ?? [];

  const output: Record<string, unknown> = { ...inputData };

  for (const { key, value } of assignments) {
    if (!key) continue;
    const resolved = resolveTemplate(value, inputData, allOutputs);
    // Support dot notation: a.b.c = value
    const parts = key.split(".");
    let target = output;
    for (let i = 0; i < parts.length - 1; i++) {
      if (typeof target[parts[i]] !== "object") target[parts[i]] = {};
      target = target[parts[i]] as Record<string, unknown>;
    }
    target[parts[parts.length - 1]] = resolved;
  }

  return { success: true, data: output };
};
