"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Templates", href: "/templates" },
  { label: "Pricing",   href: "/pricing"   },
];

export function Navbar() {
  const { isSignedIn } = useAuth();
  const pathname       = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="tracking-tight">FlowForge AI</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                pathname === l.href
                  ? "text-indigo-700 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {!isSignedIn ? (
            <>
              <Link href="/sign-in" className="hidden sm:block">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-sm">
                  Start Free
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <UserButton />
            </>
          )}

          {/* Mobile menu toggle */}
          <button className="sm:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              {l.label}
            </Link>
          ))}
          {!isSignedIn && (
            <Link href="/sign-in" onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}