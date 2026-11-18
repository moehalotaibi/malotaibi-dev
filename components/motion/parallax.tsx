"use client";

// MouseParallax — children drift up to `strength` px opposite the pointer
// (relative to viewport center), spring-smoothed. Static on touch devices
// and under reduced motion.
// ScrollParallax — translateY driven by scroll progress through the
// viewport. Static under reduced motion.
// Both render the same motion.div in either mode (offset held at 0 when
// reduced): the reduced-motion flag only turns true after hydration, and
// keeping the element means that switch never remounts the children.

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import type { ReactNode } from "react";

const SPRING = { stiffness: 260, damping: 28 } as const;

type MouseParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Max shift in px away from the pointer. */
  strength?: number;
};

export function MouseParallax({
  children,
  className,
  strength = 12,
}: MouseParallaxProps) {
  const reduced = useReducedMotionSafe();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    if (reduced) {
      x.jump(0);
      y.jump(0);
      return;
    }
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      x.set(-nx * strength);
      y.set(-ny * strength);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduced, strength, x, y]);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Drift factor — 0.15 ≈ ±15px across the element's pass through the viewport. */
  speed?: number;
};

export function ScrollParallax({
  children,
  className,
  speed = 0.15,
}: ScrollParallaxProps) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = reduced ? 0 : speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
