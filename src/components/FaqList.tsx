"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/types";
import { Reveal } from "@/components/Reveal";

export function FaqList({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === faq.id;
        return (
          <Reveal
            key={faq.id}
            direction={i % 2 === 0 ? "up" : "up"}
            delay={i * 0.04}
          >
            <div className="border border-[var(--line)] bg-[var(--bg-elevated)]">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:items-center sm:gap-4 sm:px-5 sm:py-5"
                onClick={() => setOpen(isOpen ? null : faq.id)}
              >
                <span className="heading-md min-w-0 flex-1 pr-1">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`mt-1 shrink-0 text-[var(--neon)] transition sm:mt-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-[var(--line)] px-4 py-4 text-sm leading-relaxed text-[var(--muted)] sm:px-5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
