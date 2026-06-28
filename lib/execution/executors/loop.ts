import type { NodeExecutor } from "../types";

/**
 * LOOP node — iterates over an array in $input.items (or the whole input as array).
 * Executes downstream nodes once per item and collects results.
 * 
 * Note: Full loop execution (fan-out) requires orchestration support.
 * Here we process items sequentially and return collected results.
 */
export const loopExecutor: NodeExecutor = async ({ node, inputData }) => {
  const data = node.data as Record<string, unknown>;
  const arrayPath = (data.arrayPath as string) ?? "items";

  // Get the array to iterate
  let items: unknown[];
  if (arrayPath === "$input" || arrayPath === "") {
    items = Array.isArray(inputData) ? inputData : [inputData];
  } else {
    const parts = arrayPath.split(".");
    let val: unknown = inputData;
    for (const part of parts) {
      if (val === null || val === undefined) break;
      val = (val as Record<string, unknown>)[part];
    }
    items = Array.isArray(val) ? val : val !== undefined ? [val] : [];
  }

  return {
    success: true,
    data: {
      items,
      count: items.length,
      currentItem: items[0] ?? null,
      __loopItems: items, // signal to engine
    },
  };
};
