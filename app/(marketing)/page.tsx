import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, GitBranch, Bot, BarChart3 } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Visual Workflow Builder",
    description: "Drag, drop, and connect nodes to build automations visually.",
  },
  {
    icon: Bot,
    title: "AI-Powered Nodes",
    description: "Plug in GPT-4, Claude, and more — no API setup needed.",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Trigger workflows manually or on a schedule.",
  },
  {
    icon: BarChart3,
    title: "Execution History",
    description: "Full logs for every run. Debug and monitor easily.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <Badge variant="secondary">🚀 Now in beta — free to use</Badge>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-900">
          Build AI Workflows{" "}
          <span className="text-blue-600">Without Code</span>
        </h1>

        <p className="max-w-xl text-lg text-slate-600">
          Connect apps, automate tasks, and integrate AI using a simple
          drag-and-drop interface.
        </p>

        <div className="flex gap-3">
          <Link href="/sign-up">
            <Button size="lg" className="gap-2">
              Start Building Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">Sign In</Button>
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Everything you need to automate with AI
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-xl border bg-white p-6 shadow-sm">
                <feature.icon className="mb-3 h-8 w-8 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}