"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  isMusicReady,
  playMusicFromGesture,
  registerMusicReady,
} from "@/lib/music-events";

const INTRO_PROMO_VIDEO = "/intro-promo.mp4";
const BRAND_LOGO = "/elite-body-logo.png";
const ISSA_SEAL = "/issa-certified-seal.png";

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
  const [show, setShow] = useState(() => !reduce);
  const [leaving, setLeaving] = useState(false);
  const [musicReady, setMusicReadyState] = useState(false);

  useEffect(() => {
    if (reduce) return;
    return registerMusicReady(setMusicReadyState);
  }, [reduce]);

  function enter() {
    if (leaving) return;

    // CRITICAL: play must run in this click stack (browser autoplay rules)
    playMusicFromGesture();

    setLeaving(true);
    window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("ebfp_intro_seen", "1");
      } catch {
        /* ignore */
      }
    }, 650);
  }

  useEffect(() => {
    if (!mounted || reduce || !show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, reduce, show, leaving]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {show && (
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Enter site and start music"
          onClick={enter}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[var(--bg)] px-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: leaving ? 0 : 1, y: leaving ? "-6%" : 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.1),transparent_70%)]"
            aria-hidden
          />

          <motion.div
            className="relative z-10 flex w-full max-w-sm flex-col items-center gap-5 sm:max-w-md sm:gap-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden sm:h-20 sm:w-20"
                title="Elite Body Fitness Pros"
              >
                <Image
                  src={BRAND_LOGO}
                  alt="Elite Body Fitness Pros"
                  fill
                  priority
                  sizes="80px"
                  className="object-contain object-center scale-[2.1]"
                />
              </div>
              <div
                className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                title="ISSA Nationally Certified Trainer"
              >
                <Image
                  src={ISSA_SEAL}
                  alt="ISSA Nationally Certified Trainer"
                  fill
                  priority
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </div>

            <div
              className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(0,180,255,0.12)]"
              aria-hidden
            >
              <video
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={INTRO_PROMO_VIDEO} type="video/mp4" />
              </video>
            </div>

            <motion.p
              className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/90 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {musicReady || isMusicReady()
                ? "Tap to enter"
                : "Loading music…"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
