"use client";

// Staggered reveal group. Group propagates "hidden"/"show" variants
// whileInView; each Item fades + rises with a spring. Static under
// reduced motion. Both modes render the same motion tags: the
// reduced-motion flag only turns true after hydration, and keeping the
// elements means that switch updates props instead of remounting children.

import { motion, stagger } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import type { Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

type GroupTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li" | "span";

const GROUP_TAGS: Record<GroupTag, ElementType> = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
};

const ITEM_TAGS: Record<ItemTag, ElementType> = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 340, damping: 30 },
  },
};

type GroupProps = {
  children: ReactNode;
  className?: string;
  as?: GroupTag;
  /** Interval between children, in **seconds**. */
  stagger?: number;
  /** Delay before the first child, in **seconds**. */
  delay?: number;
};

export function StaggerGroup({
  children,
  className,
  as = "div",
  stagger: interval = 0.06,
  delay = 0,
}: GroupProps) {
  const reduced = useReducedMotionSafe();
  const MotionTag = GROUP_TAGS[as];

  if (reduced) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const groupVariants: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: stagger(interval, { startDelay: delay }) },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
};

export function StaggerItem({ children, className, as = "div" }: ItemProps) {
  const reduced = useReducedMotionSafe();
  const MotionTag = ITEM_TAGS[as];

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
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
