"use client";
import type { NodeFormProps } from "../node-config-panel";

const MODELS = ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"];

export function AiChatForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <Field label="Model">
        <select value={(data.model as string) ?? "gpt-4o-mini"} onChange={(e) => onChange({ ...data, model: e.target.value })} className={inputCls}>
          {MODELS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </Field>
      <Field label="OpenAI API Key" hint="Leave blank to use OPENAI_API_KEY env var">
        <input type="password" value={(data.apiKey as string) ?? ""} onChange={(e) => onChange({ ...data, apiKey: e.target.value })} placeholder="sk-..." className={inputCls} />
      </Field>
      <Field label="System Prompt">
        <textarea value={(data.systemPrompt as string) ?? ""} onChange={(e) => onChange({ ...data, systemPrompt: e.target.value })} rows={4} placeholder="You are a helpful assistant..." className={textareaCls} />
      </Field>
      <Field label="User Message" hint="Supports {{$input.field}} expressions">
        <textarea value={(data.userMessage as string) ?? ""} onChange={(e) => onChange({ ...data, userMessage: e.target.value })} rows={4} placeholder="{{$input.message}}" className={textareaCls} />
      </Field>
      <Field label={`Temperature: ${(data.temperature as number) ?? 0.7}`}>
        <input type="range" min="0" max="2" step="0.1" value={(data.temperature as number) ?? 0.7} onChange={(e) => onChange({ ...data, temperature: parseFloat(e.target.value) })} className="w-full accent-indigo-600" />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>Precise (0)</span><span>Creative (2)</span></div>
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
const textareaCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono bg-white resize-none";
