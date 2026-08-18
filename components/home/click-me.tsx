"use client";

// "Click me" — a tiny hero toy. Every click bursts accent-colored confetti
// squares and pops a Figma name tag: "i love microinteractions". Because he
// does.

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CursorArrow } from "@/components/icons";
import { ACCENT_HEX } from "@/lib/accents";

const COLORS = [
  ACCENT_HEX.violet,
  ACCENT_HEX.amber,
  ACCENT_HEX.cyan,
  ACCENT_HEX.green,
  ACCENT_HEX.pink,
];

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: number;
};

let particleId = 0;

export default function ClickMe() {
  const reduced = useReducedMotion() ?? false;
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showTag, setShowTag] = useState(false);

  const burst = useCallback(() => {
    // Toggle: a second click closes the tag (no confetti on close).
    if (showTag) {
      setShowTag(false);
      return;
    }
    setShowTag(true);

    if (reduced) return;
    const fresh: Particle[] = Array.from({ length: 12 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 70;
      return {
        id: particleId++,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        rotate: (Math.random() - 0.5) * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 5,
      };
    });
    setParticles((p) => [...p.slice(-24), ...fresh]);
  }, [reduced, showTag]);

  return (
    <div className="relative">
      {/* Name tag pops above the button */}
      <AnimatePresence>
        {showTag ? (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="pointer-events-none absolute bottom-full right-0 mb-3 flex items-end gap-1 whitespace-nowrap"
            aria-hidden="true"
          >
            <span className="rounded-full bg-accent-pink px-3 py-1 font-sans text-[0.8125rem] font-medium text-white">
              i love microinteractions
            </span>
            <CursorArrow className="h-4 w-4 -scale-y-100 text-accent-pink" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Confetti */}
      <span className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
              animate={{ x: p.x, y: p.y, scale: 0.4, opacity: 0, rotate: p.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() =>
                setParticles((prev) => prev.filter((q) => q.id !== p.id))
              }
              className="absolute rounded-[2px]"
              style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            />
          ))}
        </AnimatePresence>
      </span>

      {/* The button */}
      <motion.button
        type="button"
        onClick={burst}
        aria-pressed={showTag}
        aria-label="Click me — i love microinteractions"
        className="rounded-full border border-rule-strong bg-ink/70 px-4 py-2.5 font-mono text-micro uppercase tracking-[0.14em] text-paper-mid backdrop-blur-sm transition-colors hover:border-paper hover:text-paper"
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={reduced ? undefined : { scale: 0.9, rotate: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        click me
      </motion.button>
    </div>
  );
}
