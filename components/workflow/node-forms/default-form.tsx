"use client";
import type { NodeFormProps } from "../node-config-panel";

export function DefaultForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
        <textarea
          value={(data.description as string) ?? ""}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={3}
          placeholder="What does this node do?"
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
        />
      </div>
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
        <p>No configuration needed for this node type.</p>
      </div>
    </div>
  );
}
