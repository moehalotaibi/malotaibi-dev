"use client";

// MouseParallax — children drift up to `strength` px opposite the pointer
// (relative to viewport center), spring-smoothed. Static on touch devices
// and under reduced motion.
// ScrollParallax — translateY driven by scroll progress through the
// viewport. Static under reduced motion.

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
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
  const reduced = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    if (reduced) return;
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

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

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
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
