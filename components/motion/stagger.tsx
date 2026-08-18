"use client";

// Staggered reveal group. Group propagates "hidden"/"show" variants
// whileInView; each Item fades + rises with a spring. Static under
// reduced motion.

import { motion, stagger, useReducedMotion } from "motion/react";
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
  const reduced = useReducedMotion();
  const MotionTag = GROUP_TAGS[as];
  const StaticTag = as;

  if (reduced) {
    return <StaticTag className={className}>{children}</StaticTag>;
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
  const reduced = useReducedMotion();
  const MotionTag = ITEM_TAGS[as];
  const StaticTag = as;

  if (reduced) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
