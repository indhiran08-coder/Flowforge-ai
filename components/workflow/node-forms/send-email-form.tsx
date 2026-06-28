"use client";
import type { NodeFormProps } from "../node-config-panel";

export function SendEmailForm({ data, onChange }: NodeFormProps) {
  return (
    <div className="space-y-4">
      <Field label="Resend API Key" hint="Leave blank to use RESEND_API_KEY env var">
        <input type="password" value={(data.apiKey as string) ?? ""} onChange={(e) => onChange({ ...data, apiKey: e.target.value })} placeholder="re_..." className={inputCls} />
      </Field>
      <Field label="To (email address)" hint="Supports {{$input.email}}">
        <input value={(data.to as string) ?? ""} onChange={(e) => onChange({ ...data, to: e.target.value })} placeholder="user@example.com" className={inputCls} />
      </Field>
      <Field label="Subject" hint="Supports {{$input.field}}">
        <input value={(data.subject as string) ?? ""} onChange={(e) => onChange({ ...data, subject: e.target.value })} placeholder="Hello from FlowForge!" className={inputCls} />
      </Field>
      <Field label="Body (HTML or plain text)" hint="Supports {{$input.field}}">
        <textarea value={(data.body as string) ?? ""} onChange={(e) => onChange({ ...data, body: e.target.value })} rows={6} placeholder="<h1>Hello {{$input.name}}</h1>" className={textareaCls} />
      </Field>
      <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
        <p className="font-semibold">Free tier: <a href="https://resend.com" target="_blank" rel="noopener" className="underline">resend.com</a></p>
        <p className="mt-0.5">3,000 emails/month free. Sender is <code className="bg-blue-100 px-1 rounded">onboarding@resend.dev</code></p>
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
const textareaCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono bg-white resize-none";
