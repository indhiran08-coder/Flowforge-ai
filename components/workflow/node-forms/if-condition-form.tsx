"use client";
import type { NodeFormProps } from "../node-config-panel";

const OPERATORS = [
  { value: "equals",      label: "equals (==)" },
  { value: "notEquals",   label: "not equals (!=)" },
  { value: "contains",    label: "contains" },
  { value: "greaterThan", label: "greater than (>)" },
  { value: "lessThan",    label: "less than (<)" },
  { value: "exists",      label: "exists (not empty)" },
];

export function IfConditionForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        <p className="font-semibold mb-1">🔀 Branching Node</p>
        <p>Connect <strong>True</strong> and <strong>False</strong> handles to different paths.</p>
      </div>
      <Field label="Left Value" hint="Supports {{$input.field}}">
        <input value={(data.leftValue as string) ?? ""} onChange={(e) => onChange({ ...data, leftValue: e.target.value })} placeholder="{{$input.status}}" className={inputCls} />
      </Field>
      <Field label="Operator">
        <select value={(data.operator as string) ?? "equals"} onChange={(e) => onChange({ ...data, operator: e.target.value })} className={inputCls}>
          {OPERATORS.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
      </Field>
      <Field label="Right Value" hint="The value to compare against">
        <input value={(data.rightValue as string) ?? ""} onChange={(e) => onChange({ ...data, rightValue: e.target.value })} placeholder="success" className={inputCls} />
      </Field>
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
