"use client";

// 3D tilt: rotateX/rotateY follow the cursor over the card, spring-settle on
// leave, slight scale while hovered. Mouse pointers only (touch is a no-op);
// static under reduced motion.

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

const SPRING = { stiffness: 280, damping: 24 } as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
};

export default function TiltCard({ children, className, max = 7 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  if (reduced) {
    return <div className={className}>{children}</div>;
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
