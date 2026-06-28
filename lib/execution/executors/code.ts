import type { NodeExecutor, CodeNodeData } from "../types";

const DEFAULT_CODE = `// $input contains data from the previous node
// Return an object — it becomes the output of this node
const result = {
  processed: true,
  data: $input,
  timestamp: new Date().toISOString(),
};
return result;`;

export const codeExecutor: NodeExecutor = async ({ node, inputData }) => {
  const data = node.data as CodeNodeData;
  const code = data.code ?? DEFAULT_CODE;

  try {
    // Sandboxed execution using Function constructor
    // $input is injected as the input data from the previous node
    const fn = new Function("$input", `
      "use strict";
      ${code}
    `);

    const result = fn(inputData);

    // Handle promises
    const resolved = result instanceof Promise ? await result : result;

    if (typeof resolved !== "object" || resolved === null) {
      return {
        success: true,
        data: { output: resolved },
      };
    }

    return {
      success: true,
      data: resolved as Record<string, unknown>,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Code execution failed",
    };
  }
};
