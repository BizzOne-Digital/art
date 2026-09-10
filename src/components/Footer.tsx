import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,255,46,0.1),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(61,255,181,0.08),transparent_40%),linear-gradient(180deg,#0a100c,#050605)]" />
      <div className="container-site relative grid gap-8 px-4 py-10 sm:gap-10 sm:py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div className="min-w-0">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            At Elite Body Fitness Pros, we deliver personalized, science-based
            training that fits your schedule and transforms your results.
          </p>
          <div className="mt-5 h-1 w-24 bg-[linear-gradient(90deg,#00b4ff,#ff6a00,#ffd200)]" />
        </div>

        <div>
          <h4 className="heading-md text-white">Explore</h4>
          <div className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
            <Link href="/packages" className="hover:text-[var(--neon)]">
              Packages
            </Link>
            <Link href="/programs" className="hover:text-[var(--neon)]">
              Training Programs
            </Link>
            <Link href="/pricing" className="hover:text-[var(--neon)]">
              Pricing
            </Link>
            <Link href="/shop" className="hover:text-[var(--neon)]">
              Shop
            </Link>
            <Link href="/gallery" className="hover:text-[var(--neon)]">
              Gallery
            </Link>
            <Link href="/about" className="hover:text-[var(--neon)]">
              About
            </Link>
          </div>
        </div>

        <div>
          <h4 className="heading-md text-white">Contact</h4>
          <div className="mt-4 grid gap-2 break-words text-sm text-[var(--muted)]">
            <a
              href="mailto:art@elitebodyfitnesspros.com"
              className="hover:text-[var(--neon)]"
            >
              art@elitebodyfitnesspros.com
            </a>
            <a href="tel:+19162233228" className="hover:text-[var(--neon)]">
              +1 (916) 223-3228
            </a>
            <Link href="/contact" className="hover:text-[var(--neon)]">
              Contact Form
            </Link>
            <Link href="/admin" className="hover:text-[var(--neon)]">
              Admin
            </Link>
          </div>
        </div>
      </div>
      <div className="relative border-t border-[var(--line)] px-4 py-5 text-center text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] sm:text-xs sm:tracking-[0.18em]">
        © {new Date().getFullYear()} Elite Body Fitness Pros. All rights
        reserved.
      </div>
    </footer>
  );
}
