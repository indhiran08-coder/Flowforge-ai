"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Key, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { createCredential, deleteCredential } from "@/features/credentials/credentials";
import { formatDistanceToNow } from "date-fns";

interface Credential { id: string; name: string; type: string; createdAt: Date }

const CREDENTIAL_TYPES = [
  { value: "openai",   label: "OpenAI",    fields: [{ key: "apiKey", label: "API Key", placeholder: "sk-..." }] },
  { value: "resend",   label: "Resend",    fields: [{ key: "apiKey", label: "API Key", placeholder: "re_..." }] },
  { value: "slack",    label: "Slack",     fields: [{ key: "webhookUrl", label: "Webhook URL", placeholder: "https://hooks.slack.com/..." }] },
  { value: "github",   label: "GitHub",    fields: [{ key: "token", label: "Personal Access Token", placeholder: "ghp_..." }] },
  { value: "custom",   label: "Custom",    fields: [{ key: "key", label: "Key", placeholder: "value" }] },
];

const TYPE_ICONS: Record<string, string> = {
  openai: "🤖", resend: "📧", slack: "💬", github: "🐙", custom: "🔑",
};

export function CredentialsClient({ credentials }: { credentials: Credential[] }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState("openai");
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const typeConfig = CREDENTIAL_TYPES.find((t) => t.value === selectedType)!;

  const handleCreate = () => {
    setError("");
    if (!name.trim()) { setError("Name is required"); return; }
    startTransition(async () => {
      const res = await createCredential({ name, type: selectedType, data: fields });
      if (res.success) {
        setShowForm(false);
        setName("");
        setFields({});
      } else {
        setError(res.error ?? "Failed to save");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this credential? This cannot be undone.")) return;
    startTransition(async () => { await deleteCredential(id); });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Credentials</h1>
          <p className="text-slate-500 mt-1 text-sm">Store API keys securely. Reference them in node configurations.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Credential
        </button>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-800">
        <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" />
        <div>
          <p className="font-semibold">Credentials are never exposed</p>
          <p className="text-emerald-700 text-xs mt-0.5">Keys are stored in your database and only used server-side during workflow execution. They are never sent to the browser.</p>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-800">New Credential</h2>

          {/* Type selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Type</label>
            <div className="grid grid-cols-5 gap-2">
              {CREDENTIAL_TYPES.map((t) => (
                <button key={t.value} onClick={() => { setSelectedType(t.value); setFields({}); }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                    selectedType === t.value ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>
                  <span className="text-xl">{TYPE_ICONS[t.value]}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Name (how you'll identify it)</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="My OpenAI Key" className={inputCls} />
          </div>

          {/* Dynamic fields */}
          {typeConfig.fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
              <div className="relative">
                <input
                  type={showValues[f.key] ? "text" : "password"}
                  value={fields[f.key] ?? ""}
                  onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className={`${inputCls} pr-10`}
                />
                <button onClick={() => setShowValues((prev) => ({ ...prev, [f.key]: !prev[f.key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showValues[f.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}

          {error && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={handleCreate} disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Credential
            </button>
            <button onClick={() => { setShowForm(false); setError(""); }} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Credentials list */}
      {credentials.length === 0 && !showForm ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <Key className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-700 font-semibold">No credentials yet</h3>
          <p className="text-slate-400 text-sm mt-1">Add API keys to use in your workflow nodes.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {credentials.map((cred) => (
            <div key={cred.id} className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                {TYPE_ICONS[cred.type] ?? "🔑"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800">{cred.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {cred.type.toUpperCase()} · Added {formatDistanceToNow(new Date(cred.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-mono">••••••••</span>
                <button onClick={() => handleDelete(cred.id)} disabled={isPending}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white";
