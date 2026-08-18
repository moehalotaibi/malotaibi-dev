"use client";

// Intro — lead statement left, aside + magnetic About pill right.
// The zap badge does a quick rotate wiggle on hover.

import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import { UI } from "@/components/icons";
import { accentText } from "@/lib/accents";
import { intro } from "@/lib/content";
import { PillLink, WIGGLE, WIGGLE_TRANSITION } from "./motion-kit";

export default function IntroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="shell pb-section pt-section">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <div>
          <MotionReveal>
            <p className="max-w-[24ch] font-display text-h2 font-medium">
              {intro.lead}
            </p>
          </MotionReveal>
          <MotionReveal delay={80}>
            <div className="mt-10">
              <p
                className={`font-display text-h3 font-medium ${accentText["green"]}`}
              >
                {intro.accentTitle.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-4 max-w-[52ch] text-body text-paper-mid">
                {intro.body}
              </p>
            </div>
          </MotionReveal>
        </div>

        <div>
          <MotionReveal delay={160}>
            <span className="rule block" aria-hidden="true" />
            <div className="-mt-6 flex justify-end">
              <motion.span
                className="badge-circle"
                aria-hidden="true"
                whileHover={reduced ? undefined : WIGGLE}
                transition={WIGGLE_TRANSITION}
              >
                <UI name="zap" className="h-5 w-5" />
              </motion.span>
            </div>
            <p className="mt-8 max-w-[36ch] text-meta text-paper-mid md:ml-auto md:text-right">
              {intro.aside}
            </p>
            <div className="mt-10 md:text-right">
              <PillLink href="/about">About Me</PillLink>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
