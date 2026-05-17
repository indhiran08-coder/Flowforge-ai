export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export type WorkflowStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export type ExecutionStatus = "PENDING" | "RUNNING" | "SUCCESS" | "FAILED";

export type NodeType = "TRIGGER_MANUAL" | "AI_CHAT" | "HTTP_REQUEST" | "OUTPUT";