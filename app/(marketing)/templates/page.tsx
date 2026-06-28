import Link from "next/link";
import { ArrowRight, Zap, Search } from "lucide-react";

const TEMPLATES = [
  {
    slug: "ai-email-responder",
    name: "AI Email Auto-Responder",
    desc: "Receive a webhook from your email service, summarize with GPT-4o, and send a reply automatically.",
    category: "AI",
    icon: "🤖",
    color: "from-purple-500 to-indigo-600",
    nodes: 4,
    popular: true,
  },
  {
    slug: "daily-digest",
    name: "Daily News Digest",
    desc: "Fetch top headlines every morning, summarize with AI, and email yourself a clean briefing.",
    category: "Automation",
    icon: "📰",
    color: "from-blue-500 to-cyan-600",
    nodes: 4,
    popular: true,
  },
  {
    slug: "lead-capture",
    name: "Lead Capture → CRM + Email",
    desc: "Webhook receives form submission → save to your CRM via HTTP → send welcome email.",
    category: "Sales",
    icon: "🎯",
    color: "from-emerald-500 to-teal-600",
    nodes: 3,
    popular: true,
  },
  {
    slug: "github-pr-notify",
    name: "GitHub PR → Slack Notification",
    desc: "When a PR is opened, extract details and post a formatted message to a Slack channel.",
    category: "Developer",
    icon: "🐙",
    color: "from-slate-600 to-slate-800",
    nodes: 3,
    popular: false,
  },
  {
    slug: "data-pipeline",
    name: "API Data → Process → Store",
    desc: "Fetch data from an API, loop over items, transform each one, and POST results to your database.",
    category: "Data",
    icon: "🔄",
    color: "from-orange-500 to-amber-600",
    nodes: 5,
    popular: true,
  },
  {
    slug: "ai-content-generator",
    name: "AI Content Generator",
    desc: "Trigger manually with a topic, generate a blog post outline with GPT-4o, and email the result.",
    category: "AI",
    icon: "✍️",
    color: "from-pink-500 to-rose-600",
    nodes: 3,
    popular: false,
  },
  {
    slug: "ecommerce-order",
    name: "E-commerce Order Alert",
    desc: "Receive order webhook → extract customer details → send confirmation email with order summary.",
    category: "E-commerce",
    icon: "🛍️",
    color: "from-violet-500 to-purple-600",
    nodes: 3,
    popular: false,
  },
  {
    slug: "weekly-report",
    name: "Weekly Performance Report",
    desc: "Every Monday, fetch metrics from your API, summarize with AI, and email your team a report.",
    category: "Automation",
    icon: "📊",
    color: "from-indigo-500 to-blue-600",
    nodes: 4,
    popular: false,
  },
  {
    slug: "rate-limit-retry",
    name: "Resilient API Caller (Retry)",
    desc: "Call an API with automatic retry on failure — Delay node adds backoff between attempts.",
    category: "Developer",
    icon: "⚡",
    color: "from-yellow-500 to-amber-600",
    nodes: 4,
    popular: false,
  },
  {
    slug: "user-onboarding",
    name: "User Onboarding Sequence",
    desc: "New user webhook → send welcome email → wait 2 days → send tips email → wait 5 days → send check-in.",
    category: "Sales",
    icon: "👋",
    color: "from-teal-500 to-emerald-600",
    nodes: 6,
    popular: true,
  },
  {
    slug: "ai-classifier",
    name: "AI Content Classifier",
    desc: "Receive text via webhook → classify with GPT-4o → route to different paths based on category.",
    category: "AI",
    icon: "🏷️",
    color: "from-purple-500 to-violet-700",
    nodes: 5,
    popular: false,
  },
  {
    slug: "data-filter-transform",
    name: "Filter & Transform Data",
    desc: "Fetch array from API → Filter items by condition → Transform each item → Output clean result.",
    category: "Data",
    icon: "🔽",
    color: "from-sky-500 to-blue-600",
    nodes: 4,
    popular: false,
  },
];

const CATEGORIES = ["All", "AI", "Automation", "Data", "Developer", "Sales", "E-commerce"];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center py-20 px-4">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Zap className="h-3.5 w-3.5" /> Ready-to-use workflow templates
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Start automating in 30 seconds
        </h1>
        <p className="text-indigo-200 text-lg max-w-xl mx-auto">
          Pick a template, customize it to your needs, and run it immediately.
          No blank canvas required.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search templates…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 border-0 shadow-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button key={cat}
              className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 transition-all first:bg-indigo-600 first:text-white first:border-indigo-600">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-4">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-amber-500">⭐</span> Popular templates
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.filter((t) => t.popular).map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      </div>

      {/* All templates */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20">
        <h2 className="text-lg font-bold text-slate-800 mb-6">All templates</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.filter((t) => !t.popular).map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-slate-100 bg-slate-50 py-16 text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Don&apos;t see what you need?</h2>
        <p className="text-slate-500 mb-6">Build your own from scratch using the visual editor.</p>
        <Link href="/dashboard/workflows"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
          Open Workflow Builder <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function TemplateCard({ template }: {
  template: typeof TEMPLATES[0];
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${template.color} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <span className="text-4xl">{template.icon}</span>
          <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">
            {template.category}
          </span>
        </div>
        <h3 className="font-bold text-lg mt-4 leading-tight">{template.name}</h3>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{template.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">{template.nodes} nodes</span>
          <Link
            href={`/sign-up?template=${template.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group-hover:gap-2.5"
          >
            Use template <ArrowRight className="h-3.5 w-3.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
