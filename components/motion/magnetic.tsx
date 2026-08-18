"use client";

// Magnetic hover: the child translates toward the cursor (capped at ~12px)
// while the cursor is within `radius` px of the element center, and springs
// back on leave. No-op on touch devices and under reduced motion.

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const MAX_SHIFT = 12;
const SPRING = { stiffness: 300, damping: 26 } as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor's offset from center applied as translation. */
  strength?: number;
  /** Effect radius in px, measured from the element center. */
  radius?: number;
};

export default function Magnetic({
  children,
  className,
  strength = 0.25,
  radius = 120,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const clamp = (v: number) =>
      Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, v));

    const onPointerMove = (e: PointerEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) > radius) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(clamp(dx * strength));
      y.set(clamp(dy * strength));
    };

    const onPointerLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
    };
  }, [radius, reduced, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={twMerge("inline-block", className)}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
