"use client";

import { motion } from "framer-motion";

const ORANGE_SHADES = ["#ff6a00", "#ff8a33", "#ff5500", "#ffa040", "#ffd200"];

type ConfettiPiece = {
  left: number;
  width: number;
  height: number;
  color: string;
  rotate: number;
  duration: number;
  delay: number;
  drift: number;
  round: boolean;
};

function buildPieces(count: number, seed = 0): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + seed;
    return {
      left: (n * 13 + 7) % 100,
      width: 4 + (n % 5) * 3,
      height: 6 + (n % 4) * 4,
      color: ORANGE_SHADES[n % ORANGE_SHADES.length],
      rotate: (n * 23) % 360,
      duration: 1.8 + (n % 6) * 0.35,
      delay: (n * 0.07) % 2.4,
      drift: (n % 2 === 0 ? 1 : -1) * (12 + (n % 5) * 8),
      round: n % 3 === 0,
    };
  });
}

export function OrangeConfetti({ count = 24 }: { count?: number }) {
  const pieces = buildPieces(count);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : 1,
            boxShadow: `0 0 6px ${p.color}66`,
          }}
          initial={{ y: -60, x: 0, opacity: 0, rotate: p.rotate }}
          animate={{
            y: "110vh",
            x: [0, p.drift, p.drift * 0.6],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [p.rotate, p.rotate + 180 + i * 15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function OrangeConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;

  const burst = buildPieces(32, 100);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {burst.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: p.width + 2,
            height: p.height + 2,
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : 1,
            boxShadow: `0 0 8px ${p.color}88`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: p.rotate, scale: 1 }}
          animate={{
            x: (Math.cos((i / burst.length) * Math.PI * 2) * (80 + (i % 5) * 40)),
            y: (Math.sin((i / burst.length) * Math.PI * 2) * (80 + (i % 5) * 40)),
            opacity: [1, 0.8, 0],
            rotate: p.rotate + 360,
            scale: [1, 0.6],
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}
