"use client";

import Image from "next/image";
import { useState } from "react";
import { Award } from "lucide-react";

/** Drop your ISSA logo at public/issa-logo.png (or .svg / .webp). */
const ISSA_LOGO = "/issa-logo.png";

export function IssaCertificationBar() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="relative z-[58] border-b border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 sm:px-4 sm:py-2.5">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--bg-soft)] sm:h-10 sm:w-10">
          {!logoError ? (
            <Image
              src={ISSA_LOGO}
              alt="ISSA"
              width={40}
              height={40}
              className="h-full w-full object-contain p-0.5"
              onError={() => setLogoError(true)}
            />
          ) : (
            <Award
              className="text-[var(--neon)]"
              size={20}
              aria-hidden
            />
          )}
        </div>
        <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--white)] sm:text-xs sm:tracking-[0.16em] md:text-sm">
          ISSA Nationally Certified Trainers
        </p>
      </div>
    </div>
  );
}
