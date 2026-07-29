"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/programs", label: "Training Programs" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
        scrolled || open
          ? "border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          : "border-black/5 bg-white"
      }`}
    >
      <div className="container-site flex min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3.5 md:px-6">
        <Link
          href="/"
          aria-label="Elite Body Fitness Pros home"
          className="min-w-0 max-w-[70%] shrink"
        >
          <Logo compact variant="dark" />
        </Link>

        <nav className="hidden items-center gap-3 2xl:gap-4 xl:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "text-[#0086c9]"
                    : "text-[#222] hover:text-[#ff6a00]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/pricing"
            className="glow-btn hidden !min-h-10 !px-3 !py-2 text-[11px] lg:inline-flex"
          >
            Start Now
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/15 text-[#0a0f0a] xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-white xl:hidden">
          <div className="container-site max-h-[calc(100svh-5.5rem)] overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
            <div className="grid gap-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-sm px-3 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] ${
                    pathname === link.href
                      ? "bg-[rgba(0,180,255,0.15)] text-[#0086c9]"
                      : "text-[#333]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/pricing" className="glow-btn mt-3 w-full text-center">
                Start Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
