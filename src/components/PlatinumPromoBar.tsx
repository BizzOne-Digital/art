"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Shirt, Sparkles } from "lucide-react";

export function PlatinumPromoBar() {
  return (
    <Link
      href="/pricing#platinum"
      className="group relative z-[40] block overflow-hidden border-b border-[rgba(255,210,0,0.4)] bg-[linear-gradient(90deg,#0c1018_0%,#1a1408_35%,#121820_70%,#0c1018_100%)] px-3 py-2.5 transition hover:brightness-110 sm:px-4 sm:py-3"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,210,0,0.18)_45%,rgba(255,106,0,0.12)_55%,transparent_100%)]"
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,210,0,0.12),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center sm:gap-x-3">
        <span className="inline-flex items-center gap-1 rounded-sm bg-[linear-gradient(135deg,#ffd200,#ff6a00)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#041018] shadow-[0_0_16px_rgba(255,210,0,0.45)] sm:text-[10px]">
          <Sparkles size={10} aria-hidden />
          Bonus
        </span>

        <motion.span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,210,0,0.45)] bg-[rgba(255,210,0,0.1)] text-[var(--gold)] shadow-[0_0_20px_rgba(255,210,0,0.25)]"
          animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Shirt size={16} />
        </motion.span>

        <p className="text-[11px] font-semibold leading-snug sm:text-sm md:text-base">
          <span className="text-[var(--gold)]">*</span>{" "}
          <span className="bg-[linear-gradient(90deg,#ffd200,#ff8a33,#ffd200)] bg-clip-text font-bold uppercase tracking-[0.06em] text-transparent sm:tracking-[0.08em]">
            Free t-shirt
          </span>{" "}
          <span className="text-[var(--white)]">
            with Platinum package purchase!
          </span>
        </p>

        <motion.span
          className="hidden text-[var(--orange-bright)] sm:inline-flex"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Gift size={18} />
        </motion.span>

        <span className="w-full text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--neon)] opacity-90 transition group-hover:text-[var(--neon-bright)] sm:w-auto sm:text-[10px]">
          View Platinum →
        </span>
      </div>
    </Link>
  );
}
