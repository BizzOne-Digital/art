"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const BRAND_LOGO = "/elite-body-logo.png";
const ISSA_SEAL = "/issa-certified-seal.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

function SiteBrand() {
  const logoSize = "h-11 w-11 sm:h-12 sm:w-12";

  return (
    <Link
      href="/"
      aria-label="Elite Body Fitness Pros home"
      className="flex shrink-0 items-center gap-2 sm:gap-2.5"
    >
      <div
        className={`relative shrink-0 overflow-hidden ${logoSize}`}
        title="Elite Body Fitness Pros"
      >
        <Image
          src={BRAND_LOGO}
          alt="Elite Body Fitness Pros"
          fill
          priority
          sizes="48px"
          className="object-contain object-center scale-[2.1]"
        />
      </div>
      <div
        className={`relative shrink-0 ${logoSize}`}
        title="ISSA Nationally Certified Trainer"
      >
        <Image
          src={ISSA_SEAL}
          alt="ISSA Nationally Certified Trainer"
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="container-site flex min-w-0 items-center gap-3 px-3 py-1.5 sm:gap-4 sm:px-5 sm:py-2 md:px-6">
        <SiteBrand />

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 2xl:gap-3 xl:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors 2xl:text-[11px] ${
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

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/pricing"
            className="glow-btn hidden !min-h-9 !px-3 !py-2 text-[10px] lg:inline-flex 2xl:text-[11px]"
          >
            Start Now
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-black/15 text-[#0a0f0a] xl:hidden"
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
