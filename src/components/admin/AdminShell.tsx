"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Images,
  ClipboardList,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-[var(--line)] bg-[var(--bg-elevated)] md:min-h-screen md:border-b-0 md:border-r">
        <div className="border-b border-[var(--line)] p-4 sm:p-5">
          <Logo compact />
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Admin Panel
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-3 md:flex-col [&::-webkit-scrollbar]:hidden">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 whitespace-nowrap px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition sm:text-xs sm:tracking-[0.12em] ${
                  active
                    ? "bg-[rgba(0,180,255,0.12)] text-[var(--neon)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 whitespace-nowrap px-3 py-2.5 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--danger)] md:hidden"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
        <div className="hidden space-y-1 p-3 md:block">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-[var(--muted)] hover:text-white"
          >
            <ExternalLink size={16} /> View Site
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--danger)]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
      <div className="min-w-0 overflow-x-hidden p-3 sm:p-4 md:p-8">{children}</div>
    </div>
  );
}
