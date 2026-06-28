"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GitBranch, Plus, Pencil, Trash2, Play, Clock, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateWorkflowDialog } from "@/components/workflow/create-workflow-dialog";
import { deleteWorkflow } from "@/features/workflows/delete-workflow";
import { formatDistanceToNow } from "date-fns";

type WorkflowStatus = "DRAFT" | "ACTIVE" | "INACTIVE";

interface Workflow {
  id: string;
  name: string;
  description: string | null;
  status: WorkflowStatus;
  updatedAt: Date;
  _count: { executions: number };
}

const STATUS_CFG: Record<WorkflowStatus, { label: string; cls: string }> = {
  ACTIVE:   { label: "Active",   cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  DRAFT:    { label: "Draft",    cls: "bg-slate-100 text-slate-600 border-slate-200" },
  INACTIVE: { label: "Inactive", cls: "bg-amber-100 text-amber-700 border-amber-200" },
};

const SORT_OPTIONS = [
  { value: "updated", label: "Last Modified" },
  { value: "name",    label: "Name A–Z" },
  { value: "runs",    label: "Most Runs" },
  { value: "created", label: "Newest First" },
] as const;

export function WorkflowList({ workflows }: { workflows: Workflow[] }) {
  const [dialogOpen, setDialogOpen]       = useState(false);
  const [isPending, startTransition]      = useTransition();
  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState<WorkflowStatus | "ALL">("ALL");
  const [sort, setSort]                   = useState<"updated" | "name" | "runs" | "created">("updated");
  const router                            = useRouter();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this workflow? This cannot be undone.")) return;
    startTransition(async () => { await deleteWorkflow(id); router.refresh(); });
  };

  const filtered = useMemo(() => {
    let list = [...workflows];
    if (search)                  list = list.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()) || (w.description ?? "").toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "ALL")  list = list.filter((w) => w.status === statusFilter);
    switch (sort) {
      case "name":    list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "runs":    list.sort((a, b) => b._count.executions - a._count.executions); break;
      case "updated": list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()); break;
      case "created": list.sort((a, b) => a.id < b.id ? 1 : -1); break;
    }
    return list;
  }, [workflows, search, statusFilter, sort]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workflows</h1>
            <p className="text-slate-500 mt-1 text-sm">
              {filtered.length} of {workflows.length} workflow{workflows.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Workflow
          </Button>
        </div>

        {/* Search + Filter bar */}
        {workflows.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workflows…"
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            {/* Status filter */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1">
              <Filter className="h-3.5 w-3.5 text-slate-400 ml-1" />
              {(["ALL", "ACTIVE", "DRAFT", "INACTIVE"] as const).map((s) => (
                <button key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === s
                      ? "bg-indigo-600 text-white"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}>
                  {s === "ALL" ? "All" : STATUS_CFG[s].label}
                </button>
              ))}
            </div>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Empty state */}
        {workflows.length === 0 && (
          <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-blue-50 dark:bg-blue-950 p-4">
                <GitBranch className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No workflows yet</h2>
              <p className="text-slate-500 text-sm max-w-xs mb-6">
                Create your first workflow to start automating with AI.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => setDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" /> Create Workflow
                </Button>
                <Link href="/templates">
                  <Button variant="outline" className="gap-2">Browse Templates</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No results from search */}
        {workflows.length > 0 && filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No workflows match your search</p>
            <button onClick={() => { setSearch(""); setStatusFilter("ALL"); }}
              className="mt-2 text-indigo-600 text-sm hover:underline">Clear filters</button>
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((wf) => {
            const st = STATUS_CFG[wf.status];
            return (
              <Card key={wf.id} className="group border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950 p-2">
                      <GitBranch className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className={`text-xs ${st.cls}`}>{st.label}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">···</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/workflows/${wf.id}`}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(wf.id)} disabled={isPending}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">{wf.name}</h3>
                  {wf.description && (
                    <p className="text-sm text-slate-500 truncate mb-3">{wf.description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      {wf._count.executions} run{wf._count.executions !== 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(wf.updatedAt), { addSuffix: true })}
                    </span>
                  </div>

                  <Link href={`/dashboard/workflows/${wf.id}`}>
                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs dark:border-slate-600 dark:text-slate-300">
                      <Pencil className="h-3 w-3" /> Open Builder
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <CreateWorkflowDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
