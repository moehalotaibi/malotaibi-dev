"use client";

// Project card — shared by home and /work. Public props are frozen:
// { project, flipped }. Subtle 3D tilt on the whole card, the shot half
// zooms slightly while the card is hovered, bullets stagger in with a
// one-time marker pulse, and the Visit pill (when present) is magnetic.
// Static under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/content";
import { accentText } from "@/lib/accents";
import { UI } from "@/components/icons";
import ShotFrame from "@/components/shot-frame";
import TiltCard from "@/components/motion/tilt-card";
import Magnetic from "@/components/motion/magnetic";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

type Props = {
  project: Project;
  /** Even rows put text first; odd rows flip. Reads as rhythm, not decoration. */
  flipped?: boolean;
};

/** Bullet dot that pulses once as its line staggers into view. */
function BulletMarker() {
  const reduced = useReducedMotion();
  const base = "mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-paper-dim";

  if (reduced) {
    return <span className={base} aria-hidden="true" />;
  }

  return (
    <motion.span
      className={base}
      aria-hidden="true"
      variants={{
        hidden: { scale: 0.4, opacity: 0 },
        show: {
          scale: [0.4, 1.5, 1],
          opacity: 1,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
    />
  );
}

export default function ProjectRow({ project, flipped = false }: Props) {
  const reduced = useReducedMotion();

  return (
    <TiltCard max={4}>
      <motion.article
        className="card grid items-start gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-10"
        initial={reduced ? undefined : "rest"}
        whileHover={reduced ? undefined : "hover"}
      >
        {/* Text half */}
        <div className={flipped ? "md:order-2" : ""}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-h2 font-medium text-cream">
              {project.title}
            </h3>
            <span className="label tabular-nums">{project.year}</span>
          </div>

          <p className="label mt-1 normal-case tracking-normal">
            <span className={accentText[project.accent]}>
              {project.category}
            </span>
            <span className="text-paper-dim">
              {" · "}
              {project.stack}
            </span>
          </p>

          <StaggerGroup as="ul" className="mt-6 space-y-3" stagger={0.07}>
            {project.bullets.map((bullet) => (
              <StaggerItem
                as="li"
                key={bullet}
                className="flex gap-3 text-meta leading-relaxed text-paper-mid"
              >
                <BulletMarker />
                {bullet}
              </StaggerItem>
            ))}
          </StaggerGroup>

          {project.href ? (
            <Magnetic className="mt-8 block w-full" strength={0.2}>
              <motion.a
                href={project.href}
                aria-label={`Visit ${project.title}`}
                className="pill w-full justify-center"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={SPRING}
              >
                Visit
                <UI name="arrow-right" className="h-3.5 w-3.5" />
              </motion.a>
            </Magnetic>
          ) : null}
        </div>

        {/* Shot half — zooms slightly while the card is hovered */}
        <div className={flipped ? "md:order-1" : ""}>
          <motion.div
            variants={
              reduced
                ? undefined
                : { rest: { scale: 1 }, hover: { scale: 1.04 } }
            }
            transition={SPRING}
          >
            <ShotFrame
              title={project.title}
              image={project.image}
              imageAlt={project.imageAlt}
            />
          </motion.div>
        </div>
      </motion.article>
    </TiltCard>
  );
}
