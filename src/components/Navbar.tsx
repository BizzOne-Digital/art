"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/booking", label: "Booking" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(5,6,5,0.98),rgba(8,14,10,0.95))] backdrop-blur-md"
          : "bg-gradient-to-b from-[rgba(5,6,5,0.55)] to-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:px-6">
        <Link
          href="/"
          aria-label="Elite Body Fitness Pros home"
          className="min-w-0 shrink"
        >
          <Logo compact />
        </Link>

        <nav className="hidden items-center gap-4 2xl:gap-5 xl:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "text-[var(--neon)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/booking"
            className="glow-btn hidden !min-h-10 !px-3 !py-2 text-[11px] lg:inline-flex"
          >
            Book Now
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] text-[var(--neon)] xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[rgba(5,6,5,0.98)] xl:hidden">
          <div className="container-site max-h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain px-4 py-3">
            <div className="grid gap-1 pb-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-sm px-3 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] ${
                    pathname === link.href
                      ? "bg-[rgba(184,255,46,0.08)] text-[var(--neon)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/booking" className="glow-btn mt-3 w-full text-center">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
