"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  ELITE_BODY_BRAND_LOGO,
  headerBrandLogoBox,
  headerBrandLogoBoxMobile,
  headerBrandLogoSizes,
  headerIssaLogoBox,
  headerIssaLogoSizes,
  ISSA_CERTIFIED_BADGE,
  SITE_BRAND_NAME,
  SiteBrandCenterCopy,
} from "@/components/SiteBrand";

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

  const brandLogoLink = (
    <Link
      href="/"
      className={`relative shrink-0 ${headerBrandLogoBox} ${headerBrandLogoBoxMobile}`}
      aria-label="Elite Body Fitness Pros home"
    >
      <Image
        src={ELITE_BODY_BRAND_LOGO}
        alt="Elite Body Fitness Pros"
        fill
        priority
        sizes={headerBrandLogoSizes}
        className="object-contain object-left"
      />
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,180,255,0.25)] bg-[#0a1628] shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
      <div className="container-site px-3 py-2.5 sm:px-5 sm:py-4 md:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
          <div className="flex items-center justify-between gap-2 sm:contents">
            {brandLogoLink}

            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white sm:order-last xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="w-full min-w-0 sm:hidden">
            <SiteBrandCenterCopy
              size="header"
              headline={SITE_BRAND_NAME}
              sideLines="sm"
            />
          </div>

          <div className="hidden min-w-0 flex-1 flex-col items-center text-center sm:flex">
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

            <SiteBrandCenterCopy
              size="header"
              headline={SITE_BRAND_NAME}
              sideLines="sm"
            />
          </div>

          <div className="relative hidden shrink-0 flex-col items-center sm:flex">
            <Link
              href="/pricing"
              className="glow-btn relative z-10 mb-1 hidden !min-h-8 !px-3 !py-1.5 text-[9px] sm:inline-flex md:text-[10px]"
            >
              Start Now
            </Link>
            <div className={`relative ${headerIssaLogoBox}`}>
              <Image
                src={ISSA_CERTIFIED_BADGE}
                alt="ISSA Certified"
                fill
                sizes={headerIssaLogoSizes}
                className="object-contain"
              />
            </div>
          </div>
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
