"use client";
import type { NodeFormProps } from "../node-config-panel";

const PRESETS = [
  { label: "Every minute",  cron: "* * * * *" },
  { label: "Every 5 min",   cron: "*/5 * * * *" },
  { label: "Every hour",    cron: "0 * * * *" },
  { label: "Every day 9am", cron: "0 9 * * *" },
  { label: "Every Monday",  cron: "0 9 * * 1" },
];

export function ScheduleForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 text-xs text-violet-800">
        <p className="font-semibold mb-1">🕐 Schedule Trigger</p>
        <p>Workflow runs automatically on the configured schedule.</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button key={p.cron} onClick={() => onChange({ ...data, cronExpression: p.cron })}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors text-left ${
                data.cronExpression === p.cron
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600"
              }`}>
              <div className="font-medium">{p.label}</div>
              <div className="font-mono opacity-70">{p.cron}</div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Cron Expression</label>
        <input value={(data.cronExpression as string) ?? ""} onChange={(e) => onChange({ ...data, cronExpression: e.target.value })}
          placeholder="*/5 * * * *" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono bg-white" />
        <p className="text-[11px] text-slate-400 mt-1">Format: minute hour day month weekday</p>
      </div>
    </div>
  );
}
