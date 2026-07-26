"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reduce) {
      setShow(false);
      return;
    }
    const seen = sessionStorage.getItem("ebfp_intro_seen");
    if (seen) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("ebfp_intro_seen", "1");
    }, 2800);
    return () => clearTimeout(t);
  }, [reduce]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute block bg-[var(--neon)]"
                style={{
                  left: `${(i * 7 + 5) % 100}%`,
                  width: 6 + (i % 4) * 4,
                  height: 6 + (i % 3) * 5,
                  opacity: 0.25 + (i % 5) * 0.08,
                  rotate: `${(i * 17) % 60}deg`,
                }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: "110vh", opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 1.4 + (i % 5) * 0.2,
                  delay: i * 0.05,
                  ease: "easeIn",
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo />
            <motion.p
              className="font-display text-3xl tracking-[0.08em] text-white sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              UNLEASH THE STRONGEST
              <br />
              <span className="neon-text">VERSION OF YOU</span>
            </motion.p>
            <motion.div
              className="h-[2px] w-24 bg-[var(--neon)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-[var(--bg)]"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 2.1, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </>
  );
}
