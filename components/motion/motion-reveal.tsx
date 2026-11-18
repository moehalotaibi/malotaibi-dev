"use client";

// Drop-in motion upgrade of components/reveal.tsx (which stays for compat).
// whileInView fade + rise with a spring; static under reduced motion.
// Both modes render the same motion tag: the reduced-motion flag only turns
// true after hydration, and keeping the element means that switch updates
// props instead of remounting everything inside the reveal.

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
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
  const reduced = useReducedMotionSafe();
  const MotionTag = MOTION_TAGS[as];

  if (reduced) {
    // Fresh mount: renders visible, nothing animates. After hydration (where
    // the server markup started hidden): jumps straight to visible.
    return (
      <MotionTag
        className={className}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
      >
        {children}
      </MotionTag>
    );
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
