"use client";

// 3D tilt: rotateX/rotateY follow the cursor over the card, spring-settle on
// leave, slight scale while hovered. Mouse pointers only (touch is a no-op);
// static under reduced motion.
// Both modes render the same motion.div: the reduced-motion flag only turns
// true after hydration, and keeping the element means that switch updates
// props instead of remounting the card's content. Reduced mode drops the
// gestures and flattens the transform to `none`, so the card paints exactly
// like a plain div.

import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

const SPRING = { stiffness: 280, damping: 24 } as const;

/** Reduced motion: ignore the tilt/perspective values entirely. */
const flatTransform = () => "none";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
};

export default function TiltCard({ children, className, max = 7 }: Props) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  if (reduced) {
    return (
      <motion.div
        ref={ref}
        className={className}
        transformTemplate={flatTransform}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
      >
        {children}
      </motion.div>
    );
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set((0.5 - py) * 2 * max);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", ...SPRING }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
    >
      {children}
    </motion.div>
  );
}
