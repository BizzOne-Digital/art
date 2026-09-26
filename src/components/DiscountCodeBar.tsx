"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Tag } from "lucide-react";
import {
  DISCOUNT_CODE,
  DISCOUNT_LABEL,
} from "@/lib/promotions";

export function DiscountCodeBar() {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative z-[39] overflow-hidden border-b border-[rgba(0,180,255,0.35)] bg-[linear-gradient(90deg,rgba(0,180,255,0.14),rgba(5,7,12,0.95),rgba(0,180,255,0.14))] px-3 py-2 sm:px-4 sm:py-2.5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center sm:gap-x-3">
        <Tag className="hidden shrink-0 text-[var(--neon)] sm:inline-block" size={16} />

        <p className="text-[11px] font-semibold leading-snug text-[var(--white)] sm:text-xs md:text-sm">
          <span className="text-[var(--neon)]">*</span> Use code{" "}
          <span className="font-bold tracking-[0.12em] text-[var(--gold)]">
            {DISCOUNT_CODE}
          </span>{" "}
          for{" "}
          <span className="font-bold uppercase text-[var(--neon-bright)]">
            {DISCOUNT_LABEL}
          </span>{" "}
          at checkout
        </p>

        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--neon)] bg-[rgba(0,180,255,0.12)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--neon)] transition hover:bg-[rgba(0,180,255,0.22)] sm:text-[11px]"
          aria-label={`Copy discount code ${DISCOUNT_CODE}`}
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy Code
            </>
          )}
        </button>

        <Link
          href="/pricing"
          className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition hover:text-[var(--neon)] sm:text-[10px]"
        >
          View Packages →
        </Link>
      </div>
    </div>
  );
}
