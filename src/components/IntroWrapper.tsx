"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SiteBrand } from "@/components/SiteBrand";
import { introFitnessFacts } from "@/lib/intro-facts";
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
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function unmuteVideo() {
    const video = videoRef.current;
    if (!video || videoUnmuted) return;
    video.muted = false;
    void video.play();
    setVideoUnmuted(true);
  }

  function handleOverlayClick() {
    if (leaving) return;
    if (!videoUnmuted) {
      unmuteVideo();
      return;
    }
    enter();
  }

  useEffect(() => {
    if (reduce) return;
    return registerMusicReady(setMusicReadyState);
  }, [reduce]);

  function enter() {
    if (leaving) return;

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
        handleOverlayClick();
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
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] cursor-pointer overflow-y-auto overflow-x-hidden overscroll-contain bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: leaving ? 0 : 1, y: leaving ? "-6%" : 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.1),transparent_70%)]"
            aria-hidden
          />

          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-5xl min-h-[100svh] flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 justify-center pb-4 pt-2 sm:pb-6">
              <SiteBrand
                size="intro"
                linked={false}
                className="justify-center scale-105 sm:scale-110"
              />
            </div>

            <div className="grid w-full flex-1 gap-4 md:grid-cols-2 md:gap-6 md:items-start">
              <div
                className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(0,180,255,0.12)]"
                onClick={(e) => {
                  e.stopPropagation();
                  unmuteVideo();
                }}
              >
                <video
                  ref={videoRef}
                  className="aspect-video w-full max-h-[min(42vh,340px)] object-contain bg-black sm:max-h-[min(46vh,380px)] md:max-h-[min(52vh,420px)]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={INTRO_PROMO_VIDEO} type="video/mp4" />
                </video>
                {!videoUnmuted && (
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3"
                    aria-hidden
                  >
                    <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xs">
                      Tap video for sound
                    </span>
                  </div>
                )}
              </div>

              <div
                className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-[var(--bg-elevated)]/90 p-4 sm:p-5 md:max-h-[min(52vh,420px)]"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--neon)] sm:text-xs">
                  Fitness Facts
                </p>
                <div
                  className="mt-3 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm leading-relaxed sm:space-y-5 sm:text-base"
                  onClick={(e) => e.stopPropagation()}
                >
                  {introFitnessFacts.map((fact) => (
                    <div
                      key={fact.id}
                      className="border-l-2 border-[var(--neon)] pl-3"
                    >
                      {fact.lead && (
                        <p className="font-semibold text-white">{fact.lead}</p>
                      )}
                      {fact.body.split("\n\n").map((paragraph, index) => (
                        <p
                          key={index}
                          className={`text-[var(--muted)] ${fact.lead ? "mt-2" : ""}`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!videoUnmuted && (
              <p
                className="pointer-events-none mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:hidden"
                aria-hidden
              >
                Tap video for sound
              </p>
            )}

            <motion.p
              className="mt-4 shrink-0 pb-2 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/90 sm:mt-6 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {!musicReady && !isMusicReady()
                ? "Loading music…"
                : videoUnmuted
                  ? "Tap to enter"
                  : "Tap for sound"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
