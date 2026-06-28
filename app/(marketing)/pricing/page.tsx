import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, Clock } from "lucide-react";

const PLANS = [
  {
    key:     "FREE",
    name:    "Free",
    price:   0,
    desc:    "Perfect to explore and build your first automations.",
    color:   "border-slate-200",
    badge:   null,
    cta:     "Start Building Free",
    ctaCls:  "bg-slate-900 text-white hover:bg-slate-800",
    href:    "/sign-up",
    coming:  false,
    features: [
      "3 workflows",
      "100 runs / month",
      "13 node types (incl. Loop, Filter, Delay)",
      "Webhook + Schedule triggers",
      "Real-time execution",
      "Execution history",
      "Community support",
    ],
  },
  {
    key:     "PRO",
    name:    "Pro",
    price:   19,
    desc:    "For builders who automate seriously.",
    color:   "border-indigo-500 ring-2 ring-indigo-500/20",
    badge:   "Most Popular",
    cta:     "Coming Soon",
    ctaCls:  "bg-gradient-to-r from-indigo-600 to-violet-600 text-white opacity-70 cursor-not-allowed",
    href:    null,
    coming:  true,
    features: [
      "Unlimited workflows",
      "10,000 runs / month",
      "All node types",
      "Email failure alerts",
      "API key access",
      "Execution history (90 days)",
      "Priority support",
    ],
  },
  {
    key:     "TEAM",
    name:    "Team",
    price:   49,
    desc:    "Collaborate with your whole team on one workspace.",
    color:   "border-violet-300",
    badge:   "Best Value",
    cta:     "Coming Soon",
    ctaCls:  "bg-violet-700 text-white opacity-70 cursor-not-allowed",
    href:    null,
    coming:  true,
    features: [
      "Everything in Pro",
      "5 team seats",
      "50,000 runs / month",
      "Shared credential vault",
      "Workflow versioning",
      "Audit logs",
      "Dedicated support",
    ],
  },
] as const;

const FAQ = [
  { q: "Is it really free?",              a: "Yes — the Free plan is free forever. No credit card required, no trial period." },
  { q: "When will paid plans launch?",    a: "We're currently in beta. Paid plans with higher limits are coming soon. We'll notify you by email." },
  { q: "What counts as a 'run'?",         a: "Each time a workflow executes (manually, webhook, or schedule) counts as one run." },
  { q: "What happens at the run limit?",  a: "Workflows stop triggering for the rest of the month. You'll get a prompt to upgrade when limits launch." },
  { q: "Is my data safe?",               a: "Yes. All data is in an isolated PostgreSQL database. Credentials are encrypted at rest." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center pt-20 pb-12 px-4">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-indigo-100">
          <Sparkles className="h-3.5 w-3.5" /> Simple, transparent pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Start free. Scale when you&apos;re ready.
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          FlowForge AI is free during beta. Paid plans with higher limits are coming soon.
        </p>
        <div className="inline-flex items-center gap-2 mt-4 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
          <Clock className="h-4 w-4" /> Currently in Beta — Pro &amp; Team plans launching soon
        </div>
      </div>

      {/* Plan cards */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative bg-white rounded-3xl border-2 p-8 flex flex-col transition-all hover:shadow-xl ${plan.color}`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h2>
                <p className="text-sm text-slate-500 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                  {plan.price > 0 && <span className="text-slate-400 text-sm">/month</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.coming ? (
                <div className={`w-full text-center py-3 px-4 rounded-xl font-semibold text-sm ${plan.ctaCls}`}>
                  <Clock className="inline h-3.5 w-3.5 mr-1.5" /> Coming Soon
                </div>
              ) : (
                <Link href={plan.href!}
                  className={`w-full text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all block ${plan.ctaCls}`}>
                  {plan.cta} <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-slate-500">
          {["Free forever plan", "No credit card required", "Cancel anytime", "Data encrypted at rest"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {t}
            </span>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Frequently asked questions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
