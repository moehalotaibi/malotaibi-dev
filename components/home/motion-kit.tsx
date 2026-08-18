"use client";

// Shared motion helpers for the home sections: a motion-enabled next/link,
// the house spring, a keyframed wiggle, and the standard magnetic pill.

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import Magnetic from "@/components/motion/magnetic";
import { UI } from "@/components/icons";

export const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

/** Quick rotate wiggle — monogram + zap badge. Transform-only keyframes. */
export const WIGGLE = { rotate: [0, -10, 8, -4, 0] };
export const WIGGLE_TRANSITION = { duration: 0.5, ease: "easeInOut" } as const;

export const MotionLink = motion.create(Link);

/** Magnetic pill link with arrow — "About Me", "All case studies", "All work". */
export function PillLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <Magnetic>
      <MotionLink
        href={href}
        className="pill"
        whileHover={reduced ? undefined : { scale: 1.04 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        transition={SPRING}
      >
        {children}
        <UI name="arrow-right" className="h-3.5 w-3.5" />
      </MotionLink>
    </Magnetic>
  );
}
