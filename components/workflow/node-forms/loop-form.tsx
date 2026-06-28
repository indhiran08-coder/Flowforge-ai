"use client";
import type { NodeFormProps } from "../node-config-panel";

export function LoopForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-xs text-cyan-800">
        <p className="font-semibold mb-1">🔁 Loop Node</p>
        <p>Iterates over an array. Use <strong>$input</strong> to reference the entire input, or a <strong>dot-path</strong> like <code>items</code> or <code>data.results</code>.</p>
      </div>
      <Field label="Array Path" hint="Dot-path to the array in $input (leave blank to use entire input)">
        <input
          value={(data.arrayPath as string) ?? ""}
          onChange={(e) => onChange({ ...data, arrayPath: e.target.value })}
          placeholder="items"
          className={inputCls}
        />
      </Field>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
        <p className="font-semibold mb-1">Output</p>
        <ul className="space-y-1 list-disc list-inside">
          <li><code className="font-mono">items</code> — the full array</li>
          <li><code className="font-mono">count</code> — number of items</li>
          <li><code className="font-mono">currentItem</code> — first item (use Code to iterate)</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
      {hint && <p className="text-[11px] text-slate-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-mono";
