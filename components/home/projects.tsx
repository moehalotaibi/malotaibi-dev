"use client";

// My projects — a gallery of browser-frame previews instead of the old text
// rows, so every cover shows on the home page. Order is the content order
// (lib/content.ts); the side project closes the grid under its own label.
//
// Hover (pointer) or focus: the frame lifts, the Figma selection chrome
// appears around it and the shot zooms a touch inside the frame. Each tile
// links to the project's own page when it has one, else to /projects.

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import ProjectStatus from "@/components/project-status";
import SectionHeader from "@/components/section-header";
import SelectionCorners from "@/components/selection-corners";
import ShotFrame from "@/components/shot-frame";
import { accentText } from "@/lib/accents";
import { projects, sideProjects } from "@/lib/content";
import { MotionLink, PillLink, SPRING } from "./motion-kit";

const pad = (n: number) => String(n).padStart(2, "0");

const tiles = [
  ...projects.map((project, i) => ({ project, eyebrow: pad(i + 1) })),
  ...sideProjects.map((project) => ({ project, eyebrow: "// side project" })),
];

export default function ProjectsIndex() {
  const reduced = useReducedMotionSafe();

  return (
    <section className="shell pb-section" aria-labelledby="projects">
      <MotionReveal>
        <SectionHeader id="projects" title="UX Projects" badge="briefcase" />
      </MotionReveal>
      <StaggerGroup
        // relative + page background: the decorative spine passes behind
        // the whole gallery instead of cutting through the captions.
        className="relative grid grid-cols-2 gap-x-4 gap-y-9 bg-ink lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12"
        stagger={0.05}
      >
        {tiles.map(({ project: p, eyebrow }) => (
          <StaggerItem key={p.title}>
            <MotionLink
              href={p.detailHref ?? "/projects"}
              className="group block"
              initial={reduced ? undefined : "rest"}
              whileHover={reduced ? undefined : "hover"}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <motion.div
                className="relative [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-out group-hover:[&_img]:scale-[1.04]"
                variants={
                  reduced ? undefined : { rest: { y: 0 }, hover: { y: -4 } }
                }
                transition={SPRING}
              >
                <SelectionCorners accent={p.accent} />
                {/* At this size the "// preview" corner label would sit on
                    top of the artwork, so it moves up into the chrome bar;
                    the project's name is the caption right below. */}
                <ShotFrame
                  title="// preview"
                  image={p.image}
                  imageAlt={p.imageAlt}
                  sizes="(min-width: 1200px) 262px, (min-width: 1024px) 22vw, 46vw"
                  cornerLabel={false}
                />
              </motion.div>

              <div className="mt-4">
                <p className="label tabular-nums text-paper-dim">{eyebrow}</p>
                <h3 className="mt-1.5 font-display text-body font-medium text-cream sm:text-lead">
                  {p.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className={`label ${accentText[p.accent]}`}>
                    {p.category}
                  </span>
                  <ProjectStatus status={p.year} />
                </div>
              </div>
            </MotionLink>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <MotionReveal delay={160}>
        <div className="mt-12 text-center">
          <PillLink href="/projects">All projects</PillLink>
        </div>
      </MotionReveal>
    </section>
  );
}
