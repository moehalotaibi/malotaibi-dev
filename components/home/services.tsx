"use client";

// "What you get" — four outcome cards: tilt, staggered reveal, icon-chip
// pop, CSS accent underline sweep (kept as CSS by spec). Fixes the old
// underline bug: the sweep line no longer carries both `mt-auto` and an
// inline margin — an `mt-auto pt-6` wrapper span owns the spacing.

import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import TiltCard from "@/components/motion/tilt-card";
import { UI } from "@/components/icons";
import { accentBg, accentBgSoft, accentText } from "@/lib/accents";
import { services } from "@/lib/content";
import { SPRING } from "./motion-kit";

export default function ServicesGrid() {
  const reduced = useReducedMotion();

  return (
    <section className="shell pb-section" aria-labelledby="what-you-get">
      <MotionReveal>
        <h2 id="what-you-get" className="label text-center">
          What you get.
        </h2>
      </MotionReveal>
      <StaggerGroup
        as="ul"
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((s, i) => (
          <StaggerItem as="li" key={s.title} className="h-full">
            <TiltCard className="h-full">
              <div className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-rule-strong">
                <div className="flex items-start justify-between">
                  <motion.span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${accentBgSoft[s.accent]} ${accentText[s.accent]}`}
                    aria-hidden="true"
                    whileHover={reduced ? undefined : { scale: 1.15, rotate: -6 }}
                    transition={SPRING}
                  >
                    <UI name={s.icon} className="h-5 w-5" />
                  </motion.span>
                  <span className="label tabular-nums">{`0${i + 1}`}</span>
                </div>

                <h3 className="mt-5 font-display text-h3 font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 text-meta text-paper-mid">{s.body}</p>

                <span className="mt-auto block pt-6" aria-hidden="true">
                  <span
                    className={`block h-px w-8 transition-all duration-500 ease-out group-hover:w-full ${accentBg[s.accent]}`}
                  />
                </span>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
