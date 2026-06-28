"use client";
import type { NodeFormProps } from "../node-config-panel";

const DEFAULT_CODE = `// $input contains data from the previous node
// Return an object to pass to the next node
const result = {
  processed: true,
  value: $input.value ?? "hello",
  timestamp: new Date().toISOString(),
};
return result;`;

export function CodeForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">JavaScript Code</label>
        <p className="text-[11px] text-slate-400 mb-1.5">
          <code className="bg-slate-100 px-1 rounded">$input</code> — data from previous node. Must <code className="bg-slate-100 px-1 rounded">return</code> an object.
        </p>
        <textarea
          value={(data.code as string) ?? DEFAULT_CODE}
          onChange={(e) => onChange({ ...data, code: e.target.value })}
          rows={16}
          spellCheck={false}
          className="w-full px-3 py-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono bg-slate-950 text-emerald-400 resize-none leading-relaxed"
        />
      </div>
      <div className="bg-indigo-50 rounded-lg p-3 text-xs text-indigo-700 space-y-1">
        <p className="font-semibold">Available variables:</p>
        <p><code className="bg-indigo-100 px-1 rounded">$input</code> — input data object</p>
        <p><code className="bg-indigo-100 px-1 rounded">$input.fieldName</code> — access fields</p>
        <p>Supports async/await and fetch()</p>
      </div>
    </div>
  );
}
