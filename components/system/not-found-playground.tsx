"use client";

// 404 PLAYGROUND — the missing page as a Figma canvas the visitor can mess
// with. The giant 404 renders as a selected Figma object (blue selection
// frame, white corner handles) and is a physics toy on pointer-fine,
// motion-full devices: grab it, throw it, it bounces off the section's
// edges and springs back home. Loose canvas shapes scattered around it are
// throwable too. A comment pin near the 404 toggles a note from Moe.
// Static composition under reduced motion and on touch — the pin and the
// links keep working everywhere.

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import Magnetic from "@/components/motion/magnetic";
import Throwable from "@/components/system/throwable";
import CommentPin from "@/components/system/comment-pin";
import {
  PacManShape,
  RoundedSquareShape,
  StarShape,
  TriangleShape,
} from "@/components/system/canvas-shapes";

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

const MotionLink = motion.create(Link);

// matchMedia store for pointer-fine gating (server snapshot: coarse) —
// same pattern as the home hero.
function subscribeFine(onChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getFine = () => window.matchMedia("(pointer: fine)").matches;
const getFineServer = () => false;

/** Faint selection-ish ring that appears when hovering a loose shape. */
const SHAPE_HOVER =
  "block rounded-xl p-1.5 transition-shadow duration-200 hover:ring-1 hover:ring-accent-blue/40";

/** Loose canvas shapes — positions are literal classes for the Tailwind
 *  scanner; all spread around the centered 404, sm+ only so they never
 *  crowd a phone screen. */
const SHAPES = [
  {
    key: "pacman",
    className: "left-[9%] top-[24%]",
    delay: 260,
    node: <PacManShape className="h-14 w-14 text-accent-amber/80" />,
  },
  {
    key: "star",
    className: "right-[12%] top-[20%]",
    delay: 330,
    node: <StarShape className="h-10 w-10 text-accent-cyan" />,
  },
  {
    key: "square",
    className: "bottom-[22%] left-[16%]",
    delay: 400,
    node: <RoundedSquareShape className="h-12 w-12 text-accent-pink/70" />,
  },
  {
    key: "triangle",
    className: "bottom-[26%] right-[17%]",
    delay: 470,
    node: <TriangleShape className="h-11 w-11 text-accent-green/80" />,
  },
] as const;

export default function NotFoundPlayground() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const throwable = fine && !reduced;

  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden py-16"
      aria-labelledby="nf-title"
    >
      <div className="line-grid dot-fade absolute inset-0" aria-hidden="true" />

      {/* Loose canvas shapes — decorative toys on an inert layer; each
          Throwable wrapper is its own explicit hit area. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {SHAPES.map((s) => (
          <MotionReveal
            key={s.key}
            delay={s.delay}
            className={`absolute hidden sm:block ${s.className}`}
          >
            <Throwable enabled={throwable} constraintsRef={sectionRef}>
              <span className={SHAPE_HOVER}>{s.node}</span>
            </Throwable>
          </MotionReveal>
        ))}
      </div>

      <div className="shell relative flex flex-col items-center text-center">
        <h1 id="nf-title" className="sr-only">
          404 &mdash; page not found
        </h1>

        {/* The 404 as a selected Figma object — throwable as one piece.
            The comment pin parks at its top-right corner and stays put
            while the object is carried. */}
        <div className="relative">
          <MotionReveal>
            <Throwable enabled={throwable} constraintsRef={sectionRef}>
              <div aria-hidden="true" className="relative px-5 py-1 sm:px-8">
                <span className="text-gradient-violet block font-display text-[clamp(5rem,19vw,11rem)] font-extrabold leading-none tracking-tight">
                  404
                </span>
                {/* Selection frame + four white 6px corner handles */}
                <span className="pointer-events-none absolute inset-0 border border-accent-blue/70" />
                <span className="pointer-events-none absolute -left-[3px] -top-[3px] h-1.5 w-1.5 bg-white" />
                <span className="pointer-events-none absolute -right-[3px] -top-[3px] h-1.5 w-1.5 bg-white" />
                <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 bg-white" />
                <span className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 bg-white" />
              </div>
            </Throwable>
          </MotionReveal>

          {/* Touch widths get a 44px pin (WCAG target size); the pin's own
              h-9 w-9 (36px) still applies on lg+ — sized from here because
              this file owns the 404 layout, not the pin component. */}
          <MotionReveal
            delay={520}
            className="absolute -right-4 -top-4 z-10 sm:-right-7 max-lg:[&_button]:h-11 max-lg:[&_button]:w-11"
          >
            <CommentPin />
          </MotionReveal>
        </div>

        <MotionReveal delay={140}>
          <p className="label mt-10 max-w-[58ch]">
            {"// The page you're looking for was deleted, moved, or never drawn."}
          </p>
        </MotionReveal>

        <MotionReveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.3}>
              <MotionLink
                href="/"
                className="pill pill-solid"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={SPRING}
              >
                Back to home
              </MotionLink>
            </Magnetic>
            <Magnetic strength={0.3}>
              <MotionLink
                href="/case-studies"
                className="pill"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={SPRING}
              >
                Case studies
              </MotionLink>
            </Magnetic>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
