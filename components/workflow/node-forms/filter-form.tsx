"use client";
import type { NodeFormProps } from "../node-config-panel";

const OPERATORS = [
  { value: "equals",      label: "equals (==)" },
  { value: "notEquals",   label: "not equals (!=)" },
  { value: "contains",    label: "contains" },
  { value: "exists",      label: "exists (not empty)" },
  { value: "greaterThan", label: "greater than (>)" },
  { value: "lessThan",    label: "less than (<)" },
];

export function FilterForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-800">
        <p className="font-semibold mb-1">🔽 Filter Node</p>
        <p>Filters an array from upstream. Expects <code>$input.items</code> array (from a Loop node or HTTP response).</p>
      </div>

      <Field label="Field Name" hint="The field name on each item to check (e.g. status, price)">
        <input
          value={(data.field as string) ?? ""}
          onChange={(e) => onChange({ ...data, field: e.target.value })}
          placeholder="status"
          className={inputCls}
        />
      </Field>

      <Field label="Operator">
        <select
          value={(data.operator as string) ?? "equals"}
          onChange={(e) => onChange({ ...data, operator: e.target.value })}
          className={inputCls}
        >
          {OPERATORS.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </Field>

      <Field label="Value" hint="Leave blank when using 'exists' operator">
        <input
          value={(data.value as string) ?? ""}
          onChange={(e) => onChange({ ...data, value: e.target.value })}
          placeholder="active"
          className={inputCls}
        />
      </Field>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
        <p className="font-semibold mb-1">Output</p>
        <ul className="space-y-1 list-disc list-inside">
          <li><code className="font-mono">items</code> — filtered array</li>
          <li><code className="font-mono">count</code> — filtered count</li>
          <li><code className="font-mono">originalCount</code> — total before filter</li>
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

const inputCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
