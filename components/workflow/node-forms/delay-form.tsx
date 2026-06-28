"use client";
import type { NodeFormProps } from "../node-config-panel";

const PRESETS = [
  { label: "500ms",  value: 500 },
  { label: "1s",     value: 1000 },
  { label: "2s",     value: 2000 },
  { label: "5s",     value: 5000 },
  { label: "10s",    value: 10000 },
  { label: "30s",    value: 30000 },
];

export function DelayForm({ data, onChange }: NodeFormProps) {
  const delayMs = Number(data.delayMs ?? 1000);

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700">
        <p className="font-semibold mb-1">⏳ Delay / Wait</p>
        <p>Pauses workflow execution for the specified duration (max 30 seconds).</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Quick Presets</label>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange({ ...data, delayMs: p.value })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                delayMs === p.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Delay (milliseconds)
        </label>
        <p className="text-[11px] text-slate-400 mb-1.5">
          Currently: <strong>{(delayMs / 1000).toFixed(1)}s</strong> · Max: 30s
        </p>
        <input
          type="number"
          min={0}
          max={30000}
          step={100}
          value={delayMs}
          onChange={(e) => onChange({ ...data, delayMs: Math.min(Number(e.target.value), 30000) })}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
        <input
          type="range"
          min={0}
          max={30000}
          step={500}
          value={delayMs}
          onChange={(e) => onChange({ ...data, delayMs: Number(e.target.value) })}
          className="w-full mt-2 accent-indigo-600"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
        <p className="font-semibold mb-1">Output</p>
        <p>Passes through all input data with <code className="font-mono">delayed: true</code> and <code className="font-mono">delayedMs</code> added.</p>
      </div>
    </div>
  );
}
