"use client";

// Case-study index row — shared by home and /work. Public props are frozen:
// { study: CaseStudy }. On hover the title slides right on a spring and an
// arrow fades in after it; the border brightens (CSS); the metric counts up
// the first time it scrolls into view. Static under reduced motion (CountUp
// carries its own fallback).

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { CaseStudy } from "@/lib/content";
import { accentText } from "@/lib/accents";
import { UI } from "@/components/icons";
import CountUp from "@/components/motion/count-up";

const MotionLink = motion.create(Link);

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

export default function CaseStudyRow({ study }: { study: CaseStudy }) {
  const reduced = useReducedMotion();

  return (
    <MotionLink
      href={`/case-studies/${study.slug}`}
      className="flex items-end justify-between gap-6 border-t border-rule py-7 transition-colors hover:border-rule-strong"
      initial={reduced ? undefined : "rest"}
      whileHover={reduced ? undefined : "hover"}
      whileTap={reduced ? undefined : { scale: 0.995 }}
    >
      <span className="min-w-0">
        <span className="flex items-center gap-3">
          <motion.span
            className="block font-display text-h3 font-medium"
            variants={
              reduced ? undefined : { rest: { x: 0 }, hover: { x: 6 } }
            }
            transition={SPRING}
          >
            {study.title}
          </motion.span>
          {/* Decorative affordance only — hidden from AT and safe to miss on touch. */}
          <motion.span
            className="shrink-0 text-paper-mid opacity-0"
            aria-hidden="true"
            variants={
              reduced
                ? undefined
                : { rest: { opacity: 0, x: -8 }, hover: { opacity: 1, x: 0 } }
            }
            transition={SPRING}
          >
            <UI name="arrow-right" className="h-4 w-4" />
          </motion.span>
        </span>
        <span className="label mt-2 block normal-case tracking-normal">
          {study.tag}
        </span>
      </span>

      <span className="shrink-0 text-right">
        <CountUp
          value={study.heroStat.value}
          className={`block font-mono text-h2 font-bold tabular-nums ${accentText[study.accent]}`}
        />
        <span className="label mt-1 block">{study.heroStat.label}</span>
      </span>
    </MotionLink>
  );
}
