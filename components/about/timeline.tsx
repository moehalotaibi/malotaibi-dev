"use client";

// Career timeline — a rail overlay draws in (scaleY 0 → 1, origin top) as you
// scroll through the list, dots spring-pop with a one-time ping as each entry
// enters view, tag chips stagger in with a hover pop, and preview frames
// tilt. Fully static under reduced motion.

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import TiltCard from "@/components/motion/tilt-card";
import ShotFrame from "@/components/shot-frame";
import TagChip from "@/components/about/tag-chip";
import { accentText } from "@/lib/accents";
import { roles, type Role } from "@/lib/content";

const DOT_POSITION =
  "absolute -start-[calc(2rem+4.5px)] top-2 h-2 w-2 md:-start-[calc(3rem+4.5px)]";

const DOT_VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export default function Timeline({ entries = roles }: { entries?: Role[] }) {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 260, damping: 34 });

  return (
    <ol
      ref={listRef}
      className="relative mt-4 space-y-16 border-s border-rule ps-8 md:ps-12"
    >
      {entries.map((role) => (
        <MotionReveal as="li" key={role.title} className="relative">
          {reduced ? (
            <span
              className={`${DOT_POSITION} rounded-full bg-paper-dim`}
              aria-hidden="true"
            />
          ) : (
            <span className={DOT_POSITION} aria-hidden="true">
              {/* Dot pop */}
              <motion.span
                className="absolute inset-0 rounded-full bg-paper-dim"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={DOT_VIEWPORT}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              />
              {/* One-time ping ring */}
              <motion.span
                className="absolute inset-0 rounded-full bg-paper-dim"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0.5, 0], scale: [1, 2.8] }}
                viewport={DOT_VIEWPORT}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              />
            </span>
          )}

          <p className="text-h2 font-display tabular-nums text-paper-dim">
            {role.period}
          </p>
          <h3 className="mt-4 text-h3 font-display font-medium text-cream">
            {role.title}
            {role.org ? (
              <span className={accentText[role.accent]}> · {role.org}</span>
            ) : null}
          </h3>
          <ul className="mt-4 max-w-[64ch] space-y-2">
            {role.details.map((line) => (
              <li
                key={line}
                className="flex gap-3 text-meta leading-relaxed text-paper-mid"
              >
                <span
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-paper-dim"
                  aria-hidden="true"
                />
                {line}
              </li>
            ))}
          </ul>
          <StaggerGroup as="ul" className="mt-5 flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <StaggerItem as="li" key={tag}>
                <TagChip label={tag} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-6 max-w-md">
            <TiltCard max={4}>
              <ShotFrame
                title={role.org || role.title}
                image={role.image}
                imageAlt={role.imageAlt}
                fit={role.imageFit}
              />
            </TiltCard>
          </div>
        </MotionReveal>
      ))}

      {/* Rail overlay — an aria-hidden li (valid ol child) placed last with
          !mt-0 so space-y-16 spacing on the entries is untouched. Sits
          exactly over the ol's border-s. */}
      {!reduced ? (
        <motion.li
          aria-hidden="true"
          className="absolute inset-y-0 -start-px !mt-0 w-px origin-top list-none bg-paper-dim/50"
          style={{ scaleY: drawn }}
        />
      ) : null}
    </ol>
  );
}
