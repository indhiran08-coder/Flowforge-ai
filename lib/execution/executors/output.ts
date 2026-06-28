import type { NodeExecutor } from "../types";

export const outputExecutor: NodeExecutor = async ({ inputData }) => {
  return {
    success: true,
    data: {
      output: inputData,
      timestamp: new Date().toISOString(),
    },
  };
};
