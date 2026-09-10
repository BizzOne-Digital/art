"use client";

import { motion } from "framer-motion";

export function FallingRocks({ count = 10 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 8 + (i % 5) * 6;
        return (
          <motion.span
            key={i}
            className="absolute bg-[var(--neon)]"
            style={{
              left: `${(i * 11 + 3) % 100}%`,
              top: -40,
              width: size,
              height: size * (0.7 + (i % 3) * 0.2),
              opacity: 0.15 + (i % 4) * 0.05,
              clipPath:
                i % 2 === 0
                  ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
                  : "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            }}
            animate={{
              y: ["0vh", "120vh"],
              x: [0, (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 10)],
              rotate: [0, 180 + i * 20],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.45,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
