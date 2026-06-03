"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Dashboard", icon: "⊞" },
  { href: "/cases/new", label: "New Case", icon: "＋" },
  { href: "/settings", label: "P2P Settings", icon: "⇄" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">Diamesh</p>
            <p className="text-xs text-slate-500 mt-0.5">Clinical AI</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-600 text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-800">
        <p className="text-xs text-slate-600 text-center">Local inference only</p>
        <p className="text-xs text-slate-700 text-center">No data leaves device</p>
      </div>
    </aside>
  );
}
