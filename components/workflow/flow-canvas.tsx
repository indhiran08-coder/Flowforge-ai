"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow, Background, Controls, MiniMap,
  addEdge, useNodesState, useEdgesState,
  type Node, type Edge, type Connection,
  BackgroundVariant, Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Play, Save, Plus, Loader2, CheckCircle2, XCircle, Clock, Undo2, Redo2, Copy, Clipboard } from "lucide-react";
import { saveCanvas } from "@/features/workflows/update-workflow";
import { nodeTypes } from "./node-types";
import { NodeConfigPanel } from "./node-config-panel";
import { NodeBrowser, type NodeTypeDefinition } from "./node-browser";

interface FlowCanvasProps {
  workflowId: string;
  initialNodes: Node[];
  initialEdges: Edge[];
}

type RunStatus = "idle" | "running" | "success" | "error";

let nodeCounter = 100;

const MAX_HISTORY = 50;

export function FlowCanvas({ workflowId, initialNodes, initialEdges }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showBrowser, setShowBrowser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");
  const [runDuration, setRunDuration] = useState<number | null>(null);
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [clipboard, setClipboard] = useState<Node | null>(null);

  // Undo/redo history
  const history = useRef<Array<{ nodes: Node[]; edges: Edge[] }>>([]);
  const historyIndex = useRef(-1);
  const isUndoRedo = useRef(false);

  const pushHistory = useCallback((ns: Node[], es: Edge[]) => {
    if (isUndoRedo.current) return;
    const snapshot = { nodes: JSON.parse(JSON.stringify(ns)), edges: JSON.parse(JSON.stringify(es)) };
    history.current = history.current.slice(0, historyIndex.current + 1);
    history.current.push(snapshot);
    if (history.current.length > MAX_HISTORY) history.current.shift();
    historyIndex.current = history.current.length - 1;
  }, []);

  const undo = useCallback(() => {
    if (historyIndex.current <= 0) return;
    historyIndex.current--;
    const snap = history.current[historyIndex.current];
    isUndoRedo.current = true;
    setNodes(snap.nodes);
    setEdges(snap.edges);
    setTimeout(() => { isUndoRedo.current = false; }, 0);
  }, [setNodes, setEdges]);

  const redo = useCallback(() => {
    if (historyIndex.current >= history.current.length - 1) return;
    historyIndex.current++;
    const snap = history.current[historyIndex.current];
    isUndoRedo.current = true;
    setNodes(snap.nodes);
    setEdges(snap.edges);
    setTimeout(() => { isUndoRedo.current = false; }, 0);
  }, [setNodes, setEdges]);

  // Push initial state
  useEffect(() => {
    pushHistory(initialNodes, initialEdges);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Save ────────────────────────────────────────────────────────

  const handleSave = useCallback(async () => {
    setSaving(true);
    await saveCanvas({ workflowId, nodes, edges });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [workflowId, nodes, edges]);

  // ── Run ─────────────────────────────────────────────────────────

  const handleRun = useCallback(async () => {
    await saveCanvas({ workflowId, nodes, edges });
    setRunStatus("running");
    setRunDuration(null);
    const startTime = Date.now();
    setNodes((ns) => ns.map((n) => ({ ...n, data: { ...n.data, status: "idle" } })));

    const res = await fetch(`/api/workflows/${workflowId}/execute`, { method: "POST" });
    if (!res.ok) { setRunStatus("error"); return; }

    const { executionId: eid } = await res.json() as { executionId: string };
    setExecutionId(eid);

    // SSE real-time updates
    const es = new EventSource(`/api/executions/${eid}/stream`);
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as {
          status: string;
          logs?: Array<{ nodeId: string; status: string }>;
        };
        if (data.logs?.length) {
          const map: Record<string, string> = {};
          for (const log of data.logs) {
            map[log.nodeId] = log.status === "SUCCESS" ? "success" : log.status === "ERROR" ? "error" : "skipped";
          }
          setNodes((ns) => ns.map((n) => ({ ...n, data: { ...n.data, status: map[n.id] ?? n.data.status } })));
        }
        if (data.status === "SUCCESS" || data.status === "FAILED") {
          es.close();
          setRunStatus(data.status === "SUCCESS" ? "success" : "error");
          setRunDuration(Math.round((Date.now() - startTime) / 100) / 10);
          setTimeout(() => setRunStatus("idle"), 5000);
        }
      } catch { /* ignore */ }
    };
    es.onerror = () => { es.close(); setRunStatus("error"); };
  }, [workflowId, nodes, edges, setNodes]);

  // ── Node operations ─────────────────────────────────────────────

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => {
      const next = addEdge({ ...connection, animated: true }, eds);
      pushHistory(nodes, next);
      return next;
    });
  }, [setEdges, nodes, pushHistory]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setShowBrowser(false);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowBrowser(false);
  }, []);

  const handleNodeUpdate = useCallback((nodeId: string, data: Record<string, unknown>) => {
    setNodes((ns) => {
      const next = ns.map((n) => n.id === nodeId ? { ...n, data } : n);
      pushHistory(next, edges);
      return next;
    });
    setSelectedNode((prev) => prev?.id === nodeId ? { ...prev, data } : prev);
  }, [setNodes, edges, pushHistory]);

  const handleAddNode = useCallback((def: NodeTypeDefinition) => {
    nodeCounter++;
    const newNode: Node = {
      id: `node-${nodeCounter}`,
      type: def.type,
      position: { x: 200 + (nodeCounter % 3) * 280, y: 150 + Math.floor((nodeCounter % 9) / 3) * 200 },
      data: { label: def.label, description: def.description, status: "idle" },
    };
    setNodes((ns) => {
      const next = [...ns, newNode];
      pushHistory(next, edges);
      return next;
    });
  }, [setNodes, edges, pushHistory]);

  // ── Keyboard shortcuts ──────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement?.tagName;
      const inField = active === "INPUT" || active === "TEXTAREA" || active === "SELECT";

      // Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); }

      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey && !inField) { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey)) && !inField) { e.preventDefault(); redo(); }

      // Copy/Paste node
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && selectedNode && !inField) {
        setClipboard(selectedNode);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "v" && clipboard && !inField) {
        nodeCounter++;
        const pasted: Node = {
          ...clipboard,
          id: `node-${nodeCounter}`,
          position: { x: clipboard.position.x + 40, y: clipboard.position.y + 40 },
          data: { ...clipboard.data as Record<string, unknown>, status: "idle" },
        };
        setNodes((ns) => {
          const next = [...ns, pasted];
          pushHistory(next, edges);
          return next;
        });
      }

      // Delete node
      if ((e.key === "Delete" || e.key === "Backspace") && selectedNode && !inField) {
        setNodes((ns) => {
          const next = ns.filter((n) => n.id !== selectedNode.id);
          setEdges((es) => {
            const nextEdges = es.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id);
            pushHistory(next, nextEdges);
            return nextEdges;
          });
          return next;
        });
        setSelectedNode(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSave, undo, redo, selectedNode, clipboard, setNodes, setEdges, edges, pushHistory]);

  // ── Run button ──────────────────────────────────────────────────

  const runBtnProps = {
    idle:    { cls: "bg-indigo-600 hover:bg-indigo-700 text-white",   icon: <Play className="h-4 w-4" />,                   label: "Run" },
    running: { cls: "bg-blue-500 text-white cursor-not-allowed",       icon: <Loader2 className="h-4 w-4 animate-spin" />,   label: "Running…" },
    success: { cls: "bg-emerald-500 text-white",                       icon: <CheckCircle2 className="h-4 w-4" />,           label: runDuration ? `Done (${runDuration}s)` : "Done" },
    error:   { cls: "bg-red-500 text-white",                           icon: <XCircle className="h-4 w-4" />,                label: "Failed" },
  }[runStatus];

  const canUndo = historyIndex.current > 0;
  const canRedo = historyIndex.current < history.current.length - 1;

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{ animated: true, style: { strokeWidth: 2, stroke: "#6366f1" } }}
        className="bg-slate-50"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
        <Controls className="!rounded-xl !border-slate-200 !shadow-lg" />
        <MiniMap className="!rounded-xl !border !border-slate-200 !shadow-lg" nodeColor="#6366f1" maskColor="rgba(248,250,252,0.8)" />

        <Panel position="top-left" className="flex items-center gap-2">
          <button onClick={() => { setShowBrowser((v) => !v); setSelectedNode(null); }}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-sm font-medium text-slate-700">
            <Plus className="h-4 w-4 text-indigo-600" />
            Add Node
          </button>

          {/* Undo / Redo */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <button onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)"
              className="p-2 hover:bg-slate-50 disabled:opacity-30 transition-colors border-r border-slate-200">
              <Undo2 className="h-4 w-4 text-slate-600" />
            </button>
            <button onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)"
              className="p-2 hover:bg-slate-50 disabled:opacity-30 transition-colors">
              <Redo2 className="h-4 w-4 text-slate-600" />
            </button>
          </div>

          {/* Copy indicator */}
          {clipboard && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium">
              <Clipboard className="h-3.5 w-3.5" />
              Copied — Ctrl+V to paste
            </div>
          )}
        </Panel>

        <Panel position="top-right" className="flex items-center gap-2">
          {executionId && (
            <a href={`/dashboard/executions/${executionId}`} target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-slate-100 text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors">
              <Clock className="h-3.5 w-3.5" />
              View logs
            </a>
          )}
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all text-sm font-medium text-slate-700 disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin text-indigo-500" /> : <Save className="h-4 w-4 text-slate-500" />}
            {saved ? "Saved ✓" : saving ? "Saving…" : "Save"}
          </button>
          <button onClick={handleRun} disabled={runStatus === "running"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm transition-all text-sm font-semibold disabled:opacity-70 ${runBtnProps.cls}`}>
            {runBtnProps.icon}
            {runBtnProps.label}
          </button>
        </Panel>

        {/* Shortcut hint */}
        <Panel position="bottom-left">
          <div className="flex items-center gap-3 text-[10px] text-slate-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-100">
            <span><kbd className="bg-slate-100 px-1 rounded">Ctrl+S</kbd> Save</span>
            <span><kbd className="bg-slate-100 px-1 rounded">Ctrl+Z</kbd> Undo</span>
            <span><kbd className="bg-slate-100 px-1 rounded">Del</kbd> Remove</span>
            <span><kbd className="bg-slate-100 px-1 rounded">Ctrl+C/V</kbd> Copy/Paste</span>
          </div>
        </Panel>
      </ReactFlow>

      {showBrowser && <NodeBrowser onSelect={handleAddNode} onClose={() => setShowBrowser(false)} />}

      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          workflowId={workflowId}
          onClose={() => setSelectedNode(null)}
          onUpdate={handleNodeUpdate}
        />
      )}
    </div>
  );
}
