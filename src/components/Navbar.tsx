"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ELITE_BODY_BRAND_LOGO, ISSA_CERTIFIED_BADGE } from "@/components/SiteBrand";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,180,255,0.25)] bg-[#0a1628] shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
      <div className="container-site px-3 py-3 sm:px-5 sm:py-4 md:px-6">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <Link
            href="/"
            className="relative h-[4.25rem] w-[6.5rem] shrink-0 sm:h-24 sm:w-36"
            aria-label="Elite Body Fitness Pros home"
          >
            <Image
              src={ELITE_BODY_BRAND_LOGO}
              alt="Elite Body Fitness Pros"
              fill
              priority
              sizes="(max-width:640px) 120px, 144px"
              className="object-contain object-left"
            />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col items-center text-center">
            <nav
              className="hidden max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 xl:flex 2xl:gap-x-3"
              aria-label="Main"
            >
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap px-1 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors sm:text-[11px] 2xl:text-xs ${
                      active
                        ? "text-[var(--neon-bright)]"
                        : "text-white/85 hover:text-[var(--neon)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-0 flex w-full max-w-2xl items-center gap-2 sm:mt-2 sm:gap-4">
              <span
                className="hidden h-px min-w-4 flex-1 bg-white/35 sm:block"
                aria-hidden
              />
              <p
                className="font-display text-[0.7rem] font-bold leading-tight tracking-[0.06em] text-white sm:text-base md:text-lg lg:text-xl"
              >
                ELITE BODY FITNESS PROS
              </p>
              <span
                className="hidden h-px min-w-4 flex-1 bg-white/35 sm:block"
                aria-hidden
              />
            </div>

            <p className="mt-1 hidden max-w-xl text-[8px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--neon)] sm:block sm:text-[9px] md:text-[10px]">
              Personal Training • Nutrition Coaching • ISSA Certified
            </p>
          </div>

          <div className="relative hidden shrink-0 flex-col items-center sm:flex">
            <Link
              href="/pricing"
              className="glow-btn relative z-10 mb-1 hidden !min-h-8 !px-3 !py-1.5 text-[9px] sm:inline-flex md:text-[10px]"
            >
              Start Now
            </Link>
            <div className="relative h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20">
              <Image
                src={ISSA_CERTIFIED_BADGE}
                alt="ISSA Certified"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0a1628] xl:hidden">
          <div className="container-site max-h-[calc(100svh-8rem)] overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
            <div className="grid gap-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-sm px-3 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] ${
                    pathname === link.href
                      ? "bg-[rgba(0,180,255,0.2)] text-[var(--neon-bright)]"
                      : "text-white/90"
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
