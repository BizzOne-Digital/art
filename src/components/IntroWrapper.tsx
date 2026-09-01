"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  isMusicReady,
  playMusicFromGesture,
  registerMusicReady,
} from "@/lib/music-events";

const INTRO_PROMO_VIDEO = "/intro-promo.mp4";

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
          className="fixed inset-0 z-[100] flex cursor-pointer items-end justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src={INTRO_PROMO_VIDEO} type="video/mp4" />
          </video>

          <motion.p
            className="relative z-10 mb-[max(2rem,env(safe-area-inset-bottom))] px-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {musicReady || isMusicReady()
              ? "Tap to enter"
              : "Loading music…"}
          </motion.p>
        </motion.div>
      )}
    </>
  );
}
