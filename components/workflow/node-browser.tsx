"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export interface NodeTypeDefinition {
  type: string;
  label: string;
  description: string;
  category: "triggers" | "actions" | "logic" | "data";
  icon: string;
  color: string;
}

export const NODE_DEFINITIONS: NodeTypeDefinition[] = [
  // Triggers
  { type: "TRIGGER_MANUAL",   label: "Manual Trigger",   description: "Start workflow by clicking Run",                    category: "triggers", icon: "▶",  color: "bg-emerald-500" },
  { type: "WEBHOOK_TRIGGER",  label: "Webhook Trigger",  description: "Start on HTTP POST/GET to a unique URL",            category: "triggers", icon: "🌐", color: "bg-teal-500"   },
  { type: "SCHEDULE_TRIGGER", label: "Schedule Trigger", description: "Run automatically on a cron schedule",              category: "triggers", icon: "🕐", color: "bg-violet-500" },
  // Actions
  { type: "HTTP_REQUEST",     label: "HTTP Request",     description: "Make GET/POST/PUT/DELETE requests to any REST API",  category: "actions",  icon: "🌍", color: "bg-blue-500"   },
  { type: "AI_CHAT",          label: "AI Chat (OpenAI)", description: "Chat with GPT-4o, GPT-4, GPT-3.5",                 category: "actions",  icon: "🤖", color: "bg-purple-500" },
  { type: "SEND_EMAIL",       label: "Send Email",       description: "Send emails via Resend (3000/month free)",          category: "actions",  icon: "📧", color: "bg-red-500"    },
  // Logic
  { type: "IF_CONDITION",     label: "IF Condition",     description: "Branch workflow based on true/false condition",     category: "logic",    icon: "🔀", color: "bg-amber-500"  },
  { type: "LOOP",             label: "Loop",             description: "Iterate over an array of items",                   category: "logic",    icon: "🔁", color: "bg-cyan-600"   },
  { type: "FILTER",           label: "Filter",           description: "Keep only items matching a condition",             category: "logic",    icon: "🔽", color: "bg-sky-500"    },
  { type: "DELAY",            label: "Delay / Wait",     description: "Pause execution for a set amount of time",         category: "logic",    icon: "⏳", color: "bg-slate-500"  },
  { type: "CODE",             label: "Code (JS)",        description: "Run custom JavaScript with $input data",           category: "logic",    icon: "💻", color: "bg-slate-700"  },
  { type: "SET_VARIABLES",    label: "Set Variables",    description: "Transform and map data fields",                    category: "logic",    icon: "⚙️", color: "bg-indigo-500" },
  // Data
  { type: "OUTPUT",           label: "Output",           description: "Capture final workflow result",                    category: "data",     icon: "📤", color: "bg-orange-500" },
];


const CATEGORY_LABELS: Record<string, string> = {
  triggers: "⚡ Triggers",
  actions:  "🚀 Actions",
  logic:    "🧠 Logic",
  data:     "📦 Data",
};

interface NodeBrowserProps {
  onSelect: (type: NodeTypeDefinition) => void;
  onClose: () => void;
}

export function NodeBrowser({ onSelect, onClose }: NodeBrowserProps) {
  const [query, setQuery] = useState("");

  const filtered = NODE_DEFINITIONS.filter(
    (n) =>
      n.label.toLowerCase().includes(query.toLowerCase()) ||
      n.description.toLowerCase().includes(query.toLowerCase()) ||
      n.category.includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, NodeTypeDefinition[]>>((acc, n) => {
    if (!acc[n.category]) acc[n.category] = [];
    acc[n.category].push(n);
    return acc;
  }, {});

  return (
    <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search nodes..."
          className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400"
        />
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
          <X className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Node list */}
      <div className="max-h-[440px] overflow-y-auto p-2">
        {Object.entries(grouped).map(([category, nodes]) => (
          <div key={category} className="mb-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              {CATEGORY_LABELS[category] ?? category}
            </p>
            {nodes.map((node) => (
              <button
                key={node.type}
                onClick={() => { onSelect(node); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
              >
                <div className={`${node.color} w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 shadow-sm`}>
                  {node.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                    {node.label}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{node.description}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            No nodes match &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
