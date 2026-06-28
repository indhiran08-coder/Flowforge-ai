"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, GitBranch, History, Settings,
  Zap, Key, ChevronRight, Moon, Sun, LayoutTemplate,
} from "lucide-react";

const mainNav = [
  { label: "Dashboard",  href: "/dashboard",            icon: LayoutDashboard },
  { label: "Workflows",  href: "/dashboard/workflows",  icon: GitBranch },
  { label: "Executions", href: "/dashboard/executions", icon: History },
  { label: "Templates",  href: "/templates",            icon: LayoutTemplate },
];

const settingsNav = [
  { label: "Settings",     href: "/dashboard/settings",             icon: Settings },
  { label: "Credentials",  href: "/dashboard/settings/credentials", icon: Key },
];

export function Sidebar() {
  const pathname  = usePathname();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-sm">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="font-bold text-slate-900 dark:text-white tracking-tight text-sm">FlowForge AI</span>
          <p className="text-[10px] text-slate-400 leading-none mt-0.5">Workflow Automation</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 p-3 pt-4 overflow-y-auto space-y-0.5">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Main</p>
        {mainNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4 flex-shrink-0 transition-colors",
                active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-3 w-3 text-indigo-400" />}
            </Link>
          );
        })}

        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Account</p>
          {settingsNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
                  active
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <item.icon className={cn("h-4 w-4 flex-shrink-0",
                  active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="h-3 w-3 text-indigo-400" />}
              </Link>
            );
          })}
        </div>

        {/* Upgrade prompt */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link href="/pricing"
            className="block mx-1 p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl text-white text-xs hover:from-indigo-700 hover:to-violet-700 transition-all shadow-sm hover:shadow-md">
            <p className="font-bold mb-0.5">Upgrade to Pro</p>
            <p className="opacity-75">10K runs/month · Unlimited workflows</p>
          </Link>
        </div>
      </nav>

      {/* User footer */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">My Account</p>
            <p className="text-[10px] text-slate-400">Manage profile</p>
          </div>
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            title="Toggle dark mode"
          >
            {theme === "dark"
              ? <Sun className="h-4 w-4" />
              : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}