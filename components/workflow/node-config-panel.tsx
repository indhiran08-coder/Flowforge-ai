"use client";

import { useCallback, useState } from "react";
import type { Node } from "@xyflow/react";
import { X, ChevronRight, Settings2 } from "lucide-react";
import { HttpRequestForm } from "./node-forms/http-request-form";
import { AiChatForm } from "./node-forms/ai-chat-form";
import { CodeForm } from "./node-forms/code-form";
import { IfConditionForm } from "./node-forms/if-condition-form";
import { SetVariablesForm } from "./node-forms/set-variables-form";
import { SendEmailForm } from "./node-forms/send-email-form";
import { WebhookForm } from "./node-forms/webhook-form";
import { ScheduleForm } from "./node-forms/schedule-form";
import { LoopForm } from "./node-forms/loop-form";
import { FilterForm } from "./node-forms/filter-form";
import { DelayForm } from "./node-forms/delay-form";
import { DefaultForm } from "./node-forms/default-form";

interface NodeConfigPanelProps {
  node: Node | null;
  workflowId: string;
  onClose: () => void;
  onUpdate: (nodeId: string, data: Record<string, unknown>) => void;
}

const NODE_FORM_MAP: Record<string, React.ComponentType<NodeFormProps>> = {
  HTTP_REQUEST:     HttpRequestForm,
  AI_CHAT:          AiChatForm,
  CODE:             CodeForm,
  IF_CONDITION:     IfConditionForm,
  SET_VARIABLES:    SetVariablesForm,
  SEND_EMAIL:       SendEmailForm,
  WEBHOOK_TRIGGER:  WebhookForm,
  SCHEDULE_TRIGGER: ScheduleForm,
  LOOP:             LoopForm,
  FILTER:           FilterForm,
  DELAY:            DelayForm,
};

export interface NodeFormProps {
  data: Record<string, unknown>;
  workflowId: string;
  onChange: (updates: Record<string, unknown>) => void;
}

export function NodeConfigPanel({ node, workflowId, onClose, onUpdate }: NodeConfigPanelProps) {
  const [label, setLabel] = useState((node?.data as Record<string, unknown>)?.label as string ?? "");

  const handleChange = useCallback(
    (updates: Record<string, unknown>) => {
      if (!node) return;
      onUpdate(node.id, { ...(node.data as Record<string, unknown>), ...updates });
    },
    [node, onUpdate]
  );

  const handleLabelChange = useCallback(
    (newLabel: string) => {
      setLabel(newLabel);
      if (!node) return;
      onUpdate(node.id, { ...(node.data as Record<string, unknown>), label: newLabel });
    },
    [node, onUpdate]
  );

  if (!node) return null;

  const nodeType = node.type ?? "UNKNOWN";
  const FormComponent = NODE_FORM_MAP[nodeType] ?? DefaultForm;
  const nodeData = (node.data as Record<string, unknown>) ?? {};

  return (
    <div className="absolute right-0 top-0 h-full w-[380px] bg-white border-l border-slate-200 shadow-xl z-10 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-indigo-600" />
          <span className="font-semibold text-slate-800 text-sm">Configure Node</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
            {nodeType}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-200 transition-colors"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      {/* Node label */}
      <div className="px-4 py-3 border-b border-slate-100">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Node Label
        </label>
        <input
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Node label..."
        />
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <FormComponent
          data={nodeData}
          workflowId={workflowId}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
