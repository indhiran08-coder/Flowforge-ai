import type { NodeExecutor } from "../types";

// Webhook trigger just passes through whatever data was received
// The actual data injection happens in the webhook API route
export const webhookTriggerExecutor: NodeExecutor = async ({ inputData }) => {
  return {
    success: true,
    data: {
      trigger: "webhook",
      timestamp: new Date().toISOString(),
      ...inputData,
    },
  };
};
