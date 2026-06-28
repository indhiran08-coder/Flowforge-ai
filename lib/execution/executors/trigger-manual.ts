import type { NodeExecutor } from "../types";

export const triggerManualExecutor: NodeExecutor = async ({ inputData }) => {
  return {
    success: true,
    data: {
      trigger: "manual",
      timestamp: new Date().toISOString(),
      ...inputData,
    },
  };
};
