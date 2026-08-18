"use client";

// My projects — compact index rows. Title x-slide is a motion spring
// (upgraded from CSS); row tints on hover (CSS color transition) and
// compresses slightly on tap.

import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import { accentText } from "@/lib/accents";
import { projects } from "@/lib/content";
import { MotionLink, PillLink, SPRING } from "./motion-kit";

export default function ProjectsIndex() {
  const reduced = useReducedMotion();

  return (
    <section className="shell pb-section" aria-labelledby="projects">
      <MotionReveal>
        <SectionHeader id="projects" title="UX Projects" badge="briefcase" />
      </MotionReveal>
      <StaggerGroup className="border-b border-rule">
        {projects.map((p) => (
          <StaggerItem key={p.title}>
            <MotionLink
              href="/projects"
              className="flex items-baseline justify-between gap-6 border-t border-rule py-6 transition-colors duration-300 hover:bg-white/[0.02]"
              initial={reduced ? undefined : "rest"}
              whileHover={reduced ? undefined : "hover"}
              whileTap={reduced ? undefined : { scale: 0.99 }}
            >
              <span className="min-w-0">
                <motion.span
                  className="block font-display text-h3 font-medium"
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={SPRING}
                >
                  {p.title}
                </motion.span>
                <span className="label mt-1 block">{p.year}</span>
              </span>
              <span className="min-w-0 text-right">
                <span className={`label block ${accentText[p.accent]}`}>
                  {p.category}
                </span>
                <span className="label mt-1 hidden normal-case tracking-normal text-paper-dim sm:block">
                  {p.stack}
                </span>
              </span>
            </MotionLink>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <MotionReveal delay={160}>
        <div className="mt-10 text-center">
          <PillLink href="/projects">All projects</PillLink>
        </div>
      </MotionReveal>
    </section>
  );
}
