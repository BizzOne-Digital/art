import Link from "next/link";
import {
  DISCOUNT_CODE,
  DISCOUNT_LABEL,
  DISCOUNT_PERCENT,
} from "@/lib/promotions";

export function DiscountCallout({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Save {DISCOUNT_PERCENT}% on any package with code{" "}
        <span className="font-bold tracking-[0.1em] text-[var(--gold)]">
          {DISCOUNT_CODE}
        </span>
        .{" "}
        <Link href="/pricing" className="text-[var(--neon)] underline">
          See pricing
        </Link>
      </p>
    );
  }

  return (
    <div className="relative overflow-hidden border border-[var(--neon)] bg-[linear-gradient(135deg,rgba(0,180,255,0.12),rgba(255,106,0,0.08),rgba(255,210,0,0.06))] p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[rgba(0,180,255,0.15)] blur-2xl" />
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs">
        Limited-Time Savings
      </p>
      <h3 className="heading-md mt-2 text-white">{DISCOUNT_LABEL}</h3>
      <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
        Apply your discount at checkout or mention it when you inquire. Every
        package qualifies — Starter, Elite, and Platinum.
      </p>
      <div className="mt-5 inline-flex items-center gap-3 border border-[rgba(255,210,0,0.45)] bg-[rgba(5,7,12,0.6)] px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Code
        </span>
        <span className="font-display text-3xl tracking-[0.14em] text-[var(--gold)] sm:text-4xl">
          {DISCOUNT_CODE}
        </span>
      </div>
      <div className="mt-5">
        <Link href={`/contact?code=${DISCOUNT_CODE}`} className="glow-btn">
          Inquire With {DISCOUNT_CODE}
        </Link>
      </div>
    </div>
  );
}
