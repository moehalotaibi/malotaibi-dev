"use client";

// NN/g UX Certification chip — shared by the home hero (in-flow under the
// tagline, so it reads on every breakpoint) and the About hero. Same chrome
// as the hero's "Let's Connect" status; links to the certificate on Drive.
// Hover/tap springs are dropped under reduced motion. Entrance animation is
// the caller's job (both wrap it in MotionReveal).

import { motion, useReducedMotion } from "motion/react";
import { about } from "@/lib/content";

const SPRING = { type: "spring", stiffness: 340, damping: 24 } as const;

export default function CertifiedChip({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={about.certified.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${about.certified.label}, ${about.certified.detail}. Opens the certificate`}
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border border-rule-strong bg-ink/70 px-4 py-2 font-sans text-[0.9375rem] font-medium text-cream backdrop-blur-sm transition-colors hover:border-paper ${className}`}
      {...(reduced ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } })}
      transition={SPRING}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-green"
        aria-hidden="true"
      />
      {about.certified.label}
      <span className="label normal-case tracking-normal text-paper-dim">
        {about.certified.detail}
      </span>
    </motion.a>
  );
}
