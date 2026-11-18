"use client";

// Case-study card for the home page list. Same anatomy as the profile card
// at the top of the page (picture, label, title, a line of copy, action on
// the right), one card per study: a thumbnail from inside the study, its
// number and tag, the title, the description, then the headline stat and
// an arrow chip.
//
// Hover (pointer) or focus: the card lifts, the Figma selection chrome
// appears around it, the thumbnail zooms a touch, and the arrow chip fills
// with the study's accent and turns to point up and out. The link itself
// never moves, only its contents, so the hover target is stable. Static
// under reduced motion (CountUp carries its own fallback).

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import type { CaseStudy } from "@/lib/content";
import { ACCENT_HEX, accentText } from "@/lib/accents";
import { UI } from "@/components/icons";
import CountUp from "@/components/motion/count-up";
import SelectionCorners from "@/components/selection-corners";

const MotionLink = motion.create(Link);

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

type Props = {
  study: CaseStudy;
  /** One-based position in the list, shown as 01, 02, … */
  index: number;
};

export default function CaseStudyItem({ study, index }: Props) {
  const reduced = useReducedMotionSafe();
  const number = String(index).padStart(2, "0");

  return (
    <MotionLink
      href={`/case-studies/${study.slug}`}
      className="group block"
      style={{ "--accent": ACCENT_HEX[study.accent] } as CSSProperties}
      initial={reduced ? undefined : "rest"}
      whileHover={reduced ? undefined : "hover"}
      whileTap={reduced ? undefined : { scale: 0.995 }}
    >
      <motion.div
        className="relative"
        variants={reduced ? undefined : { rest: { y: 0 }, hover: { y: -3 } }}
        transition={SPRING}
      >
        <SelectionCorners accent={study.accent} />
        <article className="card grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 p-4 transition-colors duration-200 group-hover:border-rule-strong md:grid-cols-[13rem_minmax(0,1fr)_auto] md:gap-x-7 md:p-5">
          {/* Thumbnail: a square on phones, a 16:10 shot from md up. */}
          <div
            className="relative aspect-square overflow-hidden rounded-xl border border-rule bg-raised md:aspect-[16/10]"
            style={study.cover?.bg ? { background: study.cover.bg } : undefined}
          >
            {study.cover ? (
              <Image
                src={study.cover.src}
                alt={study.cover.alt}
                fill
                sizes="(min-width: 768px) 208px, 88px"
                className={`transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                  study.cover.fit === "contain"
                    ? "object-contain"
                    : "object-cover object-top"
                }`}
              />
            ) : (
              <span className="dot-grid absolute inset-0" aria-hidden="true" />
            )}
          </div>

          {/* What it is */}
          <div className="min-w-0">
            <p className="label normal-case tracking-normal">
              <span className={`tabular-nums ${accentText[study.accent]}`}>
                {number}
              </span>
              <span className="text-paper-dim">{" / "}</span>
              {study.tag}
            </p>
            <h3 className="mt-2 font-display text-lead font-semibold text-cream md:text-h3">
              {study.title}
            </h3>
            <p className="mt-2 hidden max-w-[62ch] text-meta leading-relaxed text-paper-mid md:line-clamp-2">
              {study.description}
            </p>
          </div>

          {/* Headline stat + go */}
          <div className="col-span-2 flex items-center justify-between gap-6 border-t border-rule pt-4 md:col-span-1 md:justify-end md:gap-7 md:border-0 md:pt-0">
            <div className="md:text-right">
              <CountUp
                value={study.heroStat.value}
                className={`block font-mono text-h2 font-bold tabular-nums leading-none ${accentText[study.accent]}`}
              />
              <span className="label mt-2 block md:max-w-[22ch]">
                {study.heroStat.label}
              </span>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-rule-strong text-paper transition-colors duration-200 group-hover:border-[color:var(--accent)] group-hover:bg-[color:var(--accent)] group-hover:text-ink group-focus-visible:border-[color:var(--accent)] group-focus-visible:bg-[color:var(--accent)] group-focus-visible:text-ink">
              <motion.span
                className="flex"
                aria-hidden="true"
                variants={
                  reduced
                    ? undefined
                    : { rest: { rotate: 0 }, hover: { rotate: -45 } }
                }
                transition={SPRING}
              >
                <UI name="arrow-right" className="h-4 w-4" />
              </motion.span>
            </span>
          </div>
        </article>
      </motion.div>
    </MotionLink>
  );
}
