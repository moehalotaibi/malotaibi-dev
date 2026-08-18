"use client";

// Drop-in motion upgrade of components/reveal.tsx (which stays for compat).
// whileInView fade + rise with a spring; static under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

type TagName = "div" | "section" | "li" | "article";

const MOTION_TAGS: Record<TagName, ElementType> = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
};

type Props = {
  children: ReactNode;
  /** Delay in **ms** (matches the old `<Reveal />` API). */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  className?: string;
  as?: TagName;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
};

export default function MotionReveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];
  const StaticTag = as;

  if (reduced) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 30,
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
