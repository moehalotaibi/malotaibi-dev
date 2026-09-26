"use client";

// Status word beside a project title. "Live" gets a pulsing green dot (the
// same ring as the hero's "Let's Connect" chip) so shipped work reads as
// running, not just labelled; every other word (Concept, Completed, Daily
// Driver) stays a plain label. `chip` adds the soft green pill used on the
// big project cards; the compact home rows use the bare dot + word. The
// ring is static under reduced motion.

import { useReducedMotion } from "motion/react";

type Props = {
  status: string;
  /** Wrap the live state in a soft green pill (project cards). */
  chip?: boolean;
  className?: string;
};

export default function ProjectStatus({
  status,
  chip = false,
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  const live = status.trim().toLowerCase() === "live";

  if (!live) {
    return (
      <span className={`label block tabular-nums ${className}`}>{status}</span>
    );
  }

  return (
    <span
      className={`label inline-flex items-center gap-2 text-accent-green ${
        chip
          ? "rounded-full border border-accent-green/30 bg-accent-green/10 px-2.5 py-1"
          : ""
      } ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {reduced ? null : (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
      </span>
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}
