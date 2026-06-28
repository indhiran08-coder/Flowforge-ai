"use client";
import type { NodeFormProps } from "../node-config-panel";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export function HttpRequestForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <Field label="URL" hint="Supports {{$input.field}} expressions">
        <input
          value={(data.url as string) ?? ""}
          onChange={(e) => onChange({ ...data, url: e.target.value })}
          placeholder="https://api.example.com/data"
          className={inputCls}
        />
      </Field>
      <Field label="Method">
        <select
          value={(data.method as string) ?? "GET"}
          onChange={(e) => onChange({ ...data, method: e.target.value })}
          className={inputCls}
        >
          {METHODS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </Field>
      <Field label="Headers (JSON)" hint='e.g. {"Authorization": "Bearer token"}'>
        <textarea
          value={(data.headers as string) ?? ""}
          onChange={(e) => onChange({ ...data, headers: e.target.value })}
          rows={3}
          placeholder='{"Content-Type": "application/json"}'
          className={textareaCls}
        />
      </Field>
      <Field label="Body" hint="Supports {{$input.field}} expressions">
        <textarea
          value={(data.body as string) ?? ""}
          onChange={(e) => onChange({ ...data, body: e.target.value })}
          rows={5}
          placeholder='{"key": "{{$input.value}}"}'
          className={textareaCls}
        />
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

const inputCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white";
const textareaCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono bg-white resize-none";
