"use client";

// Case-study index card — /work only. Public props are frozen:
// { study: CaseStudy }. One large card per study: tag pill top-left, huge
// accent metric top-right (counts up on first view), title + description,
// three small stats, then a meta footer with a "Read case study" affordance.
// The whole card links to /work/[slug]. On hover the border brightens (CSS),
// the card scales up 0.5% on a spring, the footer text takes the study's
// accent (CSS via --accent), and the arrow slides right. Static under
// reduced motion (CountUp carries its own fallback).

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CaseStudy } from "@/lib/content";
import { ACCENT_HEX, accentText } from "@/lib/accents";
import { UI } from "@/components/icons";
import CountUp from "@/components/motion/count-up";

const MotionLink = motion.create(Link);

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.005 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
};

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const reduced = useReducedMotion();
  const meta = [study.meta.role, study.meta.platform, study.meta.duration];

  return (
    <MotionLink
      href={`/case-studies/${study.slug}`}
      className="card group block rounded-2xl p-7 transition-colors hover:border-rule-strong md:p-10"
      style={{ "--accent": ACCENT_HEX[study.accent] } as CSSProperties}
      initial={reduced ? undefined : "rest"}
      whileHover={reduced ? undefined : "hover"}
      variants={reduced ? undefined : cardVariants}
      transition={SPRING}
    >
      {/* Tag pill + hero metric */}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <span className="label inline-flex rounded-full border border-rule px-3.5 py-1.5 normal-case tracking-normal">
          {study.tag}
        </span>
        <span className="ml-auto shrink-0 text-right">
          <CountUp
            value={study.heroStat.value}
            className={`block font-mono text-h1 font-bold tabular-nums ${accentText[study.accent]}`}
          />
          <span className="label mt-1 block">{study.heroStat.label}</span>
        </span>
      </div>

      {/* Title + description */}
      <h3 className="mt-6 font-display text-h2 font-semibold text-cream">
        {study.title}
      </h3>
      <p className="mt-3 max-w-[72ch] text-meta text-paper-mid">
        {study.description}
      </p>

      {/* Stats row */}
      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
        {study.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-lead font-semibold text-paper">
              {stat.value}
            </div>
            <div className="label mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Meta footer */}
      <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          {meta.map((item, i) => (
            <span key={item} className="contents">
              {i > 0 ? (
                <span className="label hidden sm:inline" aria-hidden="true">
                  ·
                </span>
              ) : null}
              <span className="label">{item}</span>
            </span>
          ))}
        </div>
        <span className="label flex items-center gap-2 transition-colors group-hover:text-[color:var(--accent)] group-focus-visible:text-[color:var(--accent)]">
          Read case study
          <motion.span
            className="shrink-0"
            aria-hidden="true"
            variants={reduced ? undefined : arrowVariants}
            transition={SPRING}
          >
            <UI name="arrow-right" className="h-4 w-4" />
          </motion.span>
        </span>
      </div>
    </MotionLink>
  );
}
