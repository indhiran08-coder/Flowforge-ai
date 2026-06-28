import { notFound } from "next/navigation";
import { getWorkflow } from "@/features/workflows/update-workflow";
import { FlowCanvas } from "@/components/workflow/flow-canvas";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GitBranch } from "lucide-react";
import Link from "next/link";
import type { Node, Edge } from "@xyflow/react";

// Map raw type strings → human-readable labels
const TYPE_LABELS: Record<string, string> = {
  TRIGGER_MANUAL:   "Manual Trigger",
  WEBHOOK_TRIGGER:  "Webhook Trigger",
  SCHEDULE_TRIGGER: "Schedule Trigger",
  HTTP_REQUEST:     "HTTP Request",
  AI_CHAT:          "AI Chat",
  CODE:             "Code",
  IF_CONDITION:     "IF Condition",
  SET_VARIABLES:    "Set Variables",
  SEND_EMAIL:       "Send Email",
  OUTPUT:           "Output",
  LOOP:             "Loop",
  FILTER:           "Filter",
  DELAY:            "Delay / Wait",
};

/** Strip runtime-only fields and fix labels before handing to canvas */
function sanitizeNodes(raw: Node[]): Node[] {
  return raw.map((n) => {
    const data = (n.data ?? {}) as Record<string, unknown>;
    const rawLabel = data.label as string | undefined;
    // If label is missing or equals the type key, replace with human label
    const label =
      !rawLabel || rawLabel === n.type || TYPE_LABELS[rawLabel]
        ? (TYPE_LABELS[n.type ?? ""] ?? rawLabel ?? n.type ?? "Node")
        : rawLabel;
    return {
      ...n,
      data: { ...data, label, status: "idle" }, // always reset status on load
    };
  });
}

interface WorkflowBuilderPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkflowBuilderPage({
  params,
}: WorkflowBuilderPageProps) {
  const { id } = await params;
  const workflow = await getWorkflow(id);

  if (!workflow) notFound();

  const nodes = sanitizeNodes((workflow.nodes as unknown as Node[]) ?? []);
  const edges = (workflow.edges as unknown as Edge[]) ?? [];

  const statusColors: Record<string, string> = {
    ACTIVE:   "bg-emerald-100 text-emerald-700 border-emerald-200",
    DRAFT:    "bg-slate-100 text-slate-600 border-slate-200",
    INACTIVE: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -mx-6 -my-8">
      {/* Toolbar */}
      <header className="flex items-center gap-4 px-5 py-3 border-b bg-white/90 backdrop-blur-sm flex-shrink-0">
        <Link
          href="/dashboard/workflows"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center gap-2 flex-1">
          <GitBranch className="h-4 w-4 text-indigo-500" />
          <h1 className="font-semibold text-slate-900 text-sm">{workflow.name}</h1>
          {workflow.description && (
            <span className="text-xs text-slate-400 hidden sm:inline">
              — {workflow.description}
            </span>
          )}
        </div>

        <Badge
          variant="outline"
          className={`text-xs ${statusColors[workflow.status]}`}
        >
          {workflow.status}
        </Badge>
      </header>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <FlowCanvas
          workflowId={workflow.id}
          initialNodes={nodes}
          initialEdges={edges}
        />
      </div>
    </div>
  );
}
