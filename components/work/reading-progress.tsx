"use client";

// Case-study reading progress — a 2px accent bar fixed to the top edge,
// scaleX driven by page scroll progress through a spring. Purely
// decorative: aria-hidden and pointer-events-none. Under reduced motion
// the spring is bypassed and the bar tracks scroll directly.

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function ReadingProgress({ colorHex }: { colorHex: string }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const scaleX = reduced ? scrollYProgress : smoothed;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
      style={{ scaleX, backgroundColor: colorHex }}
    />
  );
}
