"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "rock";

const offsetsDesktop: Record<
  Direction,
  { x: number; y: number; rotate?: number }
> = {
  up: { x: 0, y: 70 },
  down: { x: 0, y: -70 },
  left: { x: 80, y: 0 },
  right: { x: -80, y: 0 },
  scale: { x: 0, y: 30 },
  rock: { x: 0, y: -120, rotate: -18 },
};

const offsetsMobile: Record<
  Direction,
  { x: number; y: number; rotate?: number }
> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  scale: { x: 0, y: 20 },
  rock: { x: 0, y: -48, rotate: -8 },
};

function useMobileOffsets() {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile ? offsetsMobile : offsetsDesktop;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-6% 0px" });
  const reduce = useReducedMotion();
  const offsets = useMobileOffsets();
  const from = offsets[direction];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: from.x,
        y: from.y,
        rotate: from.rotate || 0,
        scale: direction === "scale" ? 0.94 : 1,
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
          : undefined
      }
      transition={{
        duration: direction === "rock" ? 0.8 : 0.65,
        delay,
        ease: direction === "rock" ? [0.34, 1.4, 0.64, 1] : [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const offsets = useMobileOffsets();
  const from = offsets[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          x: from.x,
          y: from.y,
          rotate: from.rotate || 0,
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
