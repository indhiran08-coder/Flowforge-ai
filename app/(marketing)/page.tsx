import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Zap, GitBranch, Bot, BarChart3,
  Shield, Globe, Play, CheckCircle2, RefreshCw, Filter, Clock,
} from "lucide-react";

const features = [
  { icon: GitBranch, title: "Visual Workflow Builder",   desc: "Drag, drop, and connect nodes. Build powerful automations in minutes with zero code.",        bg: "bg-violet-50",  ic: "text-violet-600" },
  { icon: Bot,       title: "AI-Powered Nodes",          desc: "Plug in GPT-4o, Claude, and more. Chain AI calls together in seconds.",                        bg: "bg-purple-50",  ic: "text-purple-600" },
  { icon: Zap,       title: "Real-Time Execution",       desc: "Watch your workflow execute live. Every node lights up as it runs — no refresh needed.",        bg: "bg-amber-50",   ic: "text-amber-600"  },
  { icon: Globe,     title: "Webhook Triggers",          desc: "Give every workflow a unique URL. Any external service can trigger it with a single HTTP call.", bg: "bg-blue-50",    ic: "text-blue-600"   },
  { icon: RefreshCw, title: "Loop & Iterate",            desc: "Process arrays of data automatically. Loop over lists, filter items, fan out to parallel runs.", bg: "bg-cyan-50",    ic: "text-cyan-600"   },
  { icon: BarChart3, title: "Analytics Dashboard",       desc: "Success rate, execution trends, most active workflows — all in one place.",                    bg: "bg-emerald-50", ic: "text-emerald-600"},
  { icon: Filter,    title: "Smart Data Transforms",     desc: "Set variables, filter lists, run custom JS — transform any data between your steps.",          bg: "bg-sky-50",     ic: "text-sky-600"    },
  { icon: Clock,     title: "Schedule Automation",       desc: "Run workflows on any cron schedule. From every minute to once a week — fully configurable.",   bg: "bg-orange-50",  ic: "text-orange-600" },
  { icon: Shield,    title: "Secure Credentials Vault",  desc: "Store API keys encrypted in your database. Never exposed in the browser. Always server-side.", bg: "bg-slate-50",   ic: "text-slate-600"  },
];

const stats = [
  { value: "13+",    label: "Node Types" },
  { value: "< 1s",   label: "Execution Start" },
  { value: "∞",      label: "Workflows" },
  { value: "Free",   label: "To Get Started" },
];

const workflow = [
  { num: "01", icon: "▶", title: "Add a Trigger",       desc: "Manual click, webhook URL, or a cron schedule.",         color: "from-emerald-500 to-teal-600" },
  { num: "02", icon: "🌍", title: "Chain Actions",       desc: "HTTP calls, AI chat, send email, run code.",             color: "from-blue-500 to-indigo-600" },
  { num: "03", icon: "🔀", title: "Add Logic",           desc: "IF conditions, loops, filters, and data transforms.",    color: "from-amber-500 to-orange-600" },
  { num: "04", icon: "⚡", title: "Run & Watch Live",   desc: "Click Run — every node lights up in real time.",         color: "from-violet-500 to-purple-600" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col overflow-hidden">

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center gap-8 px-4 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[700px] w-[1200px] rounded-full bg-gradient-to-b from-indigo-100/70 via-violet-50/40 to-transparent blur-3xl" />
          <div className="absolute left-1/4 top-32 h-48 w-48 rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute right-1/4 top-48 h-48 w-48 rounded-full bg-blue-100/40 blur-3xl" />
        </div>

        <Badge variant="secondary" className="gap-1.5 border border-indigo-100 bg-indigo-50 text-indigo-700 px-4 py-1.5 text-sm">
          <Zap className="h-3.5 w-3.5" /> Now in Beta · Free to use · No credit card required
        </Badge>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
          Automate Anything{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            With AI Workflows
          </span>
        </h1>

        <p className="max-w-2xl text-xl text-slate-500 leading-relaxed">
          FlowForge AI is a visual workflow automation platform — like n8n, but built for AI-first teams.
          Connect APIs, chain AI models, loop over data, and run it all in real time.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link href="/sign-up">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 transition-all text-base px-6">
              Start Building Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="border-slate-200 hover:border-slate-300 text-base px-6">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mini preview */}
        <div className="mt-6 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-slate-400 mx-auto font-mono">workflow · Email Digest</span>
          </div>
          <div className="p-6 flex items-center justify-center gap-3 flex-wrap">
            {[
              { icon: "🕐", label: "Schedule", color: "bg-violet-100 text-violet-700" },
              { icon: "→", label: "", color: "text-slate-300" },
              { icon: "🌍", label: "HTTP Request", color: "bg-blue-100 text-blue-700" },
              { icon: "→", label: "", color: "text-slate-300" },
              { icon: "🔁", label: "Loop Items", color: "bg-cyan-100 text-cyan-700" },
              { icon: "→", label: "", color: "text-slate-300" },
              { icon: "🤖", label: "AI Summarize", color: "bg-purple-100 text-purple-700" },
              { icon: "→", label: "", color: "text-slate-300" },
              { icon: "📧", label: "Send Email", color: "bg-red-100 text-red-700" },
            ].map((item, i) => (
              item.label === "" ? (
                <span key={i} className={`text-lg font-bold ${item.color}`}>{item.icon}</span>
              ) : (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${item.color}`}>
                  <span>{item.icon}</span> {item.label}
                </div>
              )
            ))}
          </div>
          <div className="px-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Execution complete · 3 emails sent · 1.2s
            </div>
            <button className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
              <Play className="h-3 w-3" /> Run again
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-700 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-indigo-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────── */}
      <section className="bg-slate-50/80 px-4 py-24 border-y border-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Everything you need to automate with AI</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A complete toolkit for building, running, and monitoring AI-powered workflows.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`inline-flex rounded-xl p-3 mb-4 ${f.bg}`}>
                  <f.icon className={`h-5 w-5 ${f.ic}`} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">From idea to automation in 4 steps</h2>
            <p className="text-slate-500">No deployment. No servers. Just build and run.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step) => (
              <div key={step.num} className="relative text-center group">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-slate-400 mb-1">{step.num}</div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-4 py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-1/4 w-32 h-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-8 right-1/4 w-40 h-40 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4">Ready to automate your world?</h2>
          <p className="text-indigo-200 mb-8 max-w-md mx-auto text-lg">
            Join builders using FlowForge AI to save time and supercharge their workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold shadow-xl text-base px-6">
                Start Building Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-indigo-300 text-sm">Free forever · No credit card · 2-minute setup</p>
        </div>
      </section>
    </div>
  );
}