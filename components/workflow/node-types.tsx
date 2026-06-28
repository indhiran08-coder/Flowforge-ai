"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { CheckCircle2, XCircle, Loader2, MinusCircle } from "lucide-react";

// Node status colors
const STATUS_STYLES: Record<string, string> = {
  success: "ring-2 ring-emerald-400",
  error:   "ring-2 ring-red-400",
  running: "ring-2 ring-blue-400 animate-pulse",
  skipped: "opacity-50",
  idle:    "",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
  error:   <XCircle className="h-3.5 w-3.5 text-red-500" />,
  running: <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />,
  skipped: <MinusCircle className="h-3.5 w-3.5 text-slate-300" />,
  // idle: intentionally omitted — no icon when not run
};

interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status?: string;
}

// ── Base node shell ──────────────────────────────────────────────

function BaseNode({
  label, description, icon, iconBg, status = "idle",
  hasInput = true, hasOutput = true,
  extraHandles,
  selected,
}: {
  label: string; description?: string; icon: string; iconBg: string;
  status?: string; hasInput?: boolean; hasOutput?: boolean;
  extraHandles?: React.ReactNode; selected?: boolean;
}) {
  const nodeStatus = status in STATUS_STYLES ? status : "idle";
  return (
    <div className={`
      relative bg-white rounded-2xl border-2 shadow-lg min-w-[200px] max-w-[240px]
      ${selected ? "border-indigo-500 shadow-indigo-100" : "border-slate-200"}
      ${STATUS_STYLES[nodeStatus]}
      transition-all duration-200 hover:shadow-xl
    `}>
      {hasInput && (
        <Handle type="target" position={Position.Left}
          className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white !shadow-sm hover:!bg-indigo-500 transition-colors" />
      )}

      <div className="p-3.5">
        <div className="flex items-start gap-3">
          <div className={`${iconBg} w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-slate-800 truncate">{label}</p>
              <span className="shrink-0">{STATUS_ICON[nodeStatus] ?? STATUS_ICON.idle}</span>
            </div>
            {description && (
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{description}</p>
            )}
          </div>
        </div>
      </div>

      {hasOutput && (
        <Handle type="source" position={Position.Right}
          className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white !shadow-sm hover:!bg-indigo-500 transition-colors" />
      )}
      {extraHandles}
    </div>
  );
}

// ── Trigger nodes ────────────────────────────────────────────────

export const TriggerManualNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  return <BaseNode label={d.label} description={d.description ?? "Click Run to start"} icon="▶" iconBg="bg-emerald-500" status={d.status as string} hasInput={false} selected={selected} />;
});
TriggerManualNode.displayName = "TriggerManualNode";

export const WebhookTriggerNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  return <BaseNode label={d.label} description={d.description ?? "Receives HTTP requests"} icon="🌐" iconBg="bg-teal-500" status={d.status as string} hasInput={false} selected={selected} />;
});
WebhookTriggerNode.displayName = "WebhookTriggerNode";

export const ScheduleTriggerNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  return <BaseNode label={d.label} description={(d.cronExpression as string) ?? "Configure schedule"} icon="🕐" iconBg="bg-violet-500" status={d.status as string} hasInput={false} selected={selected} />;
});
ScheduleTriggerNode.displayName = "ScheduleTriggerNode";

// ── Action nodes ─────────────────────────────────────────────────

export const HttpRequestNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const url = (d.url as string) ?? "";
  return <BaseNode label={d.label} description={url ? `${d.method ?? "GET"} ${url.slice(0, 30)}${url.length > 30 ? "…" : ""}` : "Configure URL"} icon="🌍" iconBg="bg-blue-500" status={d.status as string} selected={selected} />;
});
HttpRequestNode.displayName = "HttpRequestNode";

export const AiChatNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  return <BaseNode label={d.label} description={(d.model as string) ?? "GPT-4o mini"} icon="🤖" iconBg="bg-purple-500" status={d.status as string} selected={selected} />;
});
AiChatNode.displayName = "AiChatNode";

export const SendEmailNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  return <BaseNode label={d.label} description={(d.to as string) ? `To: ${d.to}` : "Configure recipient"} icon="📧" iconBg="bg-red-500" status={d.status as string} selected={selected} />;
});
SendEmailNode.displayName = "SendEmailNode";

// ── Logic nodes ──────────────────────────────────────────────────

export const IfConditionNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const desc = d.leftValue ? `${d.leftValue} ${d.operator ?? "=="} ${d.rightValue}` : "Configure condition";
  return (
    <div className={`relative bg-white rounded-2xl border-2 shadow-lg min-w-[200px] max-w-[240px] ${selected ? "border-indigo-500" : "border-amber-300"} transition-all`}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white" />
      <div className="p-3.5">
        <div className="flex items-start gap-3">
          <div className="bg-amber-500 w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0">🔀</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-slate-800 truncate">{d.label}</p>
              {STATUS_ICON[(d.status as string) ?? "idle"]}
            </div>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{desc}</p>
          </div>
        </div>
      </div>
      {/* True handle */}
      <Handle type="source" position={Position.Right} id="true"
        style={{ top: "35%" }}
        className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-white">
      </Handle>
      <div style={{ position: "absolute", right: -44, top: "28%" }} className="text-[10px] text-emerald-600 font-bold pointer-events-none">True</div>
      {/* False handle */}
      <Handle type="source" position={Position.Right} id="false"
        style={{ top: "65%" }}
        className="!w-3 !h-3 !bg-red-400 !border-2 !border-white">
      </Handle>
      <div style={{ position: "absolute", right: -46, top: "58%" }} className="text-[10px] text-red-500 font-bold pointer-events-none">False</div>
    </div>
  );
});
IfConditionNode.displayName = "IfConditionNode";

export const CodeNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const lines = (d.code as string)?.split("\n").length ?? 0;
  return <BaseNode label={d.label} description={lines > 0 ? `${lines} lines of JavaScript` : "Write JS code"} icon="💻" iconBg="bg-slate-700" status={d.status as string} selected={selected} />;
});
CodeNode.displayName = "CodeNode";

export const SetVariablesNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const count = (d.assignments as unknown[])?.length ?? 0;
  return <BaseNode label={d.label} description={count > 0 ? `${count} assignment${count !== 1 ? "s" : ""}` : "Add assignments"} icon="⚙️" iconBg="bg-cyan-500" status={d.status as string} selected={selected} />;
});
SetVariablesNode.displayName = "SetVariablesNode";

export const OutputNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  return <BaseNode label={d.label} description="Final workflow result" icon="📤" iconBg="bg-orange-500" status={d.status as string} hasOutput={false} selected={selected} />;
});
OutputNode.displayName = "OutputNode";

export const LoopNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const arrayPath = (d.arrayPath as string) || "items";
  return <BaseNode label={d.label} description={`Iterate over: ${arrayPath}`} icon="🔁" iconBg="bg-cyan-600" status={d.status as string} selected={selected} />;
});
LoopNode.displayName = "LoopNode";

export const FilterNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const field = d.field as string;
  const op = d.operator as string;
  const val = d.value as string;
  const desc = field ? `${field} ${op ?? "=="} ${val ?? ""}`.trim() : "Configure filter";
  return <BaseNode label={d.label} description={desc} icon="🔽" iconBg="bg-sky-500" status={d.status as string} selected={selected} />;
});
FilterNode.displayName = "FilterNode";

export const DelayNode = memo(({ data, selected }: NodeProps) => {
  const d = data as NodeData;
  const ms = Number(d.delayMs ?? 1000);
  const label = ms >= 1000 ? `Wait ${(ms / 1000).toFixed(1)}s` : `Wait ${ms}ms`;
  return <BaseNode label={d.label} description={label} icon="⏳" iconBg="bg-slate-500" status={d.status as string} selected={selected} />;
});
DelayNode.displayName = "DelayNode";

// ── Node type registry for ReactFlow ────────────────────────────

export const nodeTypes = {
  TRIGGER_MANUAL:   TriggerManualNode,
  WEBHOOK_TRIGGER:  WebhookTriggerNode,
  SCHEDULE_TRIGGER: ScheduleTriggerNode,
  HTTP_REQUEST:     HttpRequestNode,
  AI_CHAT:          AiChatNode,
  SEND_EMAIL:       SendEmailNode,
  IF_CONDITION:     IfConditionNode,
  CODE:             CodeNode,
  SET_VARIABLES:    SetVariablesNode,
  OUTPUT:           OutputNode,
  LOOP:             LoopNode,
  FILTER:           FilterNode,
  DELAY:            DelayNode,
};
