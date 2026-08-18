"use client";

// Experience & skills — big colored word slides on row hover, tag chips
// stagger in and pop on hover.

import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import { accentText } from "@/lib/accents";
import { skills } from "@/lib/content";
import { SPRING } from "./motion-kit";

export default function SkillsRows() {
  const reduced = useReducedMotion();

  return (
    <section className="shell pb-section" aria-labelledby="skills">
      <MotionReveal>
        <SectionHeader id="skills" title="Experience & skills" accent="amber" />
      </MotionReveal>
      <div className="border-b border-rule">
        {skills.map((s) => (
          <MotionReveal key={s.index}>
            <motion.div
              className="grid gap-6 border-t border-rule py-10 md:grid-cols-[minmax(170px,0.8fr)_0.9fr_1.4fr]"
              initial={reduced ? undefined : "rest"}
              whileHover={reduced ? undefined : "hover"}
            >
              <div className="flex items-center gap-4">
                <p className="label tabular-nums">{s.index}</p>
                <motion.p
                  className={`font-display text-h2 font-semibold ${accentText[s.accent]}`}
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={SPRING}
                >
                  {s.word}
                </motion.p>
              </div>
              <p className="max-w-[44ch] text-meta text-paper-mid">{s.body}</p>
              <StaggerGroup className="flex flex-wrap content-start gap-2 md:justify-end">
                {s.tags.map((t) => (
                  <StaggerItem as="span" key={t}>
                    <motion.span
                      className="tag rounded-full border-rule-strong bg-transparent text-paper"
                      whileHover={reduced ? undefined : { scale: 1.08, y: -2 }}
                      transition={SPRING}
                    >
                      {t}
                    </motion.span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </motion.div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
