import type { Node, Edge } from "@xyflow/react";

// ── Node data types ──────────────────────────────────────────────

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
}

export interface HttpRequestNodeData extends BaseNodeData {
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: string; // JSON string
  body?: string;
  contentType?: string;
}

export interface AiChatNodeData extends BaseNodeData {
  model?: string;
  systemPrompt?: string;
  userMessage?: string;
  temperature?: number;
  apiKey?: string;
}

export interface CodeNodeData extends BaseNodeData {
  code?: string;
}

export interface IfConditionNodeData extends BaseNodeData {
  leftValue?: string;
  operator?: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "exists";
  rightValue?: string;
}

export interface SetVariablesNodeData extends BaseNodeData {
  assignments?: Array<{ key: string; value: string }>;
}

export interface WebhookTriggerNodeData extends BaseNodeData {
  webhookPath?: string;
}

export interface ScheduleTriggerNodeData extends BaseNodeData {
  cronExpression?: string;
}

export interface SendEmailNodeData extends BaseNodeData {
  to?: string;
  subject?: string;
  body?: string;
  apiKey?: string;
}

export interface OutputNodeData extends BaseNodeData {
  format?: "json" | "text";
}

// ── Executor types ───────────────────────────────────────────────

export interface ExecutorContext {
  node: Node;
  inputData: Record<string, unknown>;
  executionId: string;
  allOutputs: Record<string, Record<string, unknown>>;
}

export interface ExecutorResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  branch?: "true" | "false"; // for IF node
}

export type NodeExecutor = (ctx: ExecutorContext) => Promise<ExecutorResult>;

// ── Execution status ─────────────────────────────────────────────

export type ExecutionStatus = "PENDING" | "RUNNING" | "SUCCESS" | "FAILED";
export type NodeStatus = "idle" | "running" | "success" | "error" | "skipped";

export { Node, Edge };
