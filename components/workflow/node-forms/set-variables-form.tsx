"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { NodeFormProps } from "../node-config-panel";

interface Assignment { key: string; value: string }

export function SetVariablesForm({ data, onChange }: NodeFormProps) {
  const assignments: Assignment[] = (data.assignments as Assignment[]) ?? [{ key: "", value: "" }];

  const update = (newAssignments: Assignment[]) => onChange({ ...data, assignments: newAssignments });

  const add = () => update([...assignments, { key: "", value: "" }]);
  const remove = (i: number) => update(assignments.filter((_, idx) => idx !== i));
  const set = (i: number, field: "key" | "value", val: string) => {
    const next = [...assignments];
    next[i] = { ...next[i], [field]: val };
    update(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">Variable Assignments</label>
        <button onClick={add} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      <p className="text-[11px] text-slate-400">Values support <code className="bg-slate-100 px-1 rounded">{"{{$input.field}}"}</code> expressions.</p>
      {assignments.map((a, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={a.key} onChange={(e) => set(i, "key", e.target.value)} placeholder="variable.name" className={`${inputCls} flex-1`} />
          <span className="text-slate-400 text-xs">=</span>
          <input value={a.value} onChange={(e) => set(i, "value", e.target.value)} placeholder="{{$input.field}}" className={`${inputCls} flex-1`} />
          <button onClick={() => remove(i)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

const inputCls = "px-2.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-mono";
