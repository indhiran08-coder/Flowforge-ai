"use client";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { NodeFormProps } from "../node-config-panel";

export function WebhookForm({ data, workflowId }: NodeFormProps) {
  const [copied, setCopied] = useState(false);
  const webhookUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/webhooks/${workflowId}`
    : `/api/webhooks/${workflowId}`;

  const copy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800">
        <p className="font-semibold mb-1">🌐 Webhook Trigger</p>
        <p>This workflow starts when an HTTP request is received at the URL below.</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Webhook URL</label>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs bg-slate-100 px-3 py-2.5 rounded-lg text-slate-700 break-all">
            {webhookUrl}
          </code>
          <button onClick={copy} className="shrink-0 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            {copied ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
          </button>
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1.5">
        <p className="font-semibold">Supported methods:</p>
        <p>• <code className="bg-slate-200 px-1 rounded">POST</code> — request body available as <code className="bg-slate-200 px-1 rounded">{"{{$input.body}}"}</code></p>
        <p>• <code className="bg-slate-200 px-1 rounded">GET</code> — query params as <code className="bg-slate-200 px-1 rounded">{"{{$input.query}}"}</code></p>
        <p>• Headers available as <code className="bg-slate-200 px-1 rounded">{"{{$input.headers}}"}</code></p>
      </div>
    </div>
  );
}
