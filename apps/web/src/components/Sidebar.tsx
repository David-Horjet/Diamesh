"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  FileAddIcon,
  Exchange01Icon,
  Menu01Icon,
  Cancel01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/", label: "Dashboard", icon: DashboardSquare01Icon },
  { href: "/cases/new", label: "New Case", icon: FileAddIcon },
  { href: "/settings", label: "P2P Settings", icon: Exchange01Icon },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <div className={`relative rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shrink-0 ${className ?? "w-10 h-10"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-white.jpg" alt="" className="block dark:hidden absolute inset-0 w-full h-full object-cover scale-150 origin-top" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-dark.jpg" alt="" className="hidden dark:block absolute inset-0 w-full h-full object-cover scale-150 origin-top" />
    </div>
  );
}

function NavLinks({ pathname, onNavigate = () => {} }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {NAV.map(({ href, label, icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                : "text-dark/60 dark:text-white/60 hover:text-dark dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/5"
            }`}
          >
            <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Footer() {
  return (
    <div className="px-4 py-4 border-t border-black/[0.06] dark:border-white/10">
      <div className="flex items-center gap-2 text-dark/40 dark:text-white/30">
        <HugeiconsIcon icon={Shield01Icon} size={14} strokeWidth={1.8} />
        <div>
          <p className="text-xs leading-tight">Local inference only</p>
          <p className="text-xs leading-tight">No data leaves device</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between gap-3 px-4 py-3 glass border-b border-black/[0.06] dark:border-white/10 sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark className="w-9 h-9" />
          <span className="text-sm font-semibold">Diamesh</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-dark/60 dark:text-white/60 transition-colors"
          >
            <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 glass border-r border-black/[0.06] dark:border-white/10 flex flex-col animate-slide-in-left">
            <div className="px-5 py-5 border-b border-black/[0.06] dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoMark />
                <div>
                  <p className="text-sm font-semibold leading-none">Diamesh</p>
                  <p className="text-xs text-dark/40 dark:text-white/40 mt-0.5">Clinical AI</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-dark/60 dark:text-white/60 transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.8} />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <Footer />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-60 shrink-0 glass border-r border-black/[0.06] dark:border-white/10 flex-col">
        <div className="px-5 py-5 border-b border-black/[0.06] dark:border-white/10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div>
                <p className="text-sm font-semibold leading-none">Diamesh</p>
                <p className="text-xs text-dark/40 dark:text-white/40 mt-0.5">Clinical AI</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <NavLinks pathname={pathname} />
        <Footer />
      </aside>
    </>
  );
}
