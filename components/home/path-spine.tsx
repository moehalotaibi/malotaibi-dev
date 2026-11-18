"use client";

// Scroll-drawn connector spine — one long bezier that snakes down the home
// page behind the sections, drawing itself in as you scroll (Figma-vector
// styling: 2px gradient stroke, 7px anchor squares that pop in per section).
//
// SpineContainer wraps the section list in app/page.tsx: it owns the
// relative container div (the scroll target) and mounts the overlay. The
// overlay is decorative only — pointer-events-none, aria-hidden, hidden
// below lg, z-0 so cards with solid backgrounds naturally occlude it.
// Reduced motion: the path renders fully drawn, anchors are static.

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { ACCENT_HEX } from "@/lib/accents";

/* ------------------------------------------------------------------ */
/* Path authoring — fixed viewBox stretched over the full page height. */
/* ------------------------------------------------------------------ */

const VIEW_W = 1000;
const VIEW_H = 4000;

type Point = { x: number; y: number };

/**
 * Waypoints in viewBox space. The first sits below the hero's tagline; the
 * rest alternate between the left and right gutters (one per home-section
 * boundary, roughly), ending near the tech-stack marquee. Every waypoint
 * after the first carries an anchor square — placed by the same numbers,
 * so anchors always sit ON the path.
 */
// Re-measured 2026-10-14 after the intro became a properties panel and the
// GitHub commits graph joined the page (section tops at 1280px: intro 1008 ·
// skills 1760 · case studies 2606 · projects 3537 · tech stack 4688 ·
// commits 5022 · guestbook 5538, page 6281 → ×4000/6281). The spine now
// ends at the commits graph; the guestbook below it stands alone.
// (Compact profile-card intro, 2026-10-14: skills 1524 · case studies 2370 ·
// projects 3179 · tech stack 4232 · commits 4566, page 5825.)
// (2026-11-18: UX Projects became a gallery and moved above Case Studies,
// which became a card stack: skills 1524 · projects 2370 · case studies 3303
// · tech stack 4529 · commits 4863, container 6122 → ×4000/6122. Both lists
// sit on the page colour, so the spine passes behind them and shows only
// around the section headers.)
// (Later the same day the profile card gained its facts column and the
// skills became four cards: skills 1636 · projects 2594 · case studies 3526 ·
// tech stack 4752 · commits 5087, container 6346 → ×4000/6346.)
// (Skills became a row of four icon-tile cards: skills 1636 · projects 2366 ·
// case studies 3298 · tech stack 4524 · commits 4858, container 6117 →
// ×4000/6117. Re-measure with the section tops whenever a section changes
// height; the numbers below are only right for the layout they came from.)
const WAYPOINTS: Point[] = [
  { x: 500, y: 586 }, // start — just under the certification chip
  { x: 892, y: 1070 }, // intro → skills
  { x: 108, y: 1547 }, // skills → projects
  { x: 892, y: 2157 }, // projects → case studies
  { x: 108, y: 2958 }, // case studies → tech stack
  { x: 500, y: 3177 }, // end — top of the commits graph
];

const ANCHORS = WAYPOINTS.slice(1);

/**
 * Smooth alternating S-curves: each cubic segment gets vertical tangents at
 * both waypoints (control points offset straight down/up by ~42% of the
 * segment's height), so every join is C1-continuous — nothing jagged.
 */
const PATH_D = WAYPOINTS.slice(1).reduce((d, p, i) => {
  const prev = WAYPOINTS[i];
  const k = Math.round((p.y - prev.y) * 0.42);
  return `${d} C ${prev.x} ${prev.y + k}, ${p.x} ${p.y - k}, ${p.x} ${p.y}`;
}, `M ${WAYPOINTS[0].x} ${WAYPOINTS[0].y}`);

const GRADIENT_ID = "spine-stroke-grad";

/* ------------------------------------------------------------------ */
/* Anchor square — style vocabulary: 7px square, ink fill, blue stroke. */
/* ------------------------------------------------------------------ */

const ANCHOR_SIZE = {
  width: 7,
  height: 7,
  backgroundColor: "rgb(var(--c-ink))",
  border: `1.5px solid ${ACCENT_HEX.blue}`,
} as const;

const ANCHOR_VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

function AnchorSquare({ point, reduced }: { point: Point; reduced: boolean }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${(point.x / VIEW_W) * 100}%`,
        top: `${(point.y / VIEW_H) * 100}%`,
      }}
    >
      {reduced ? (
        <span className="block" style={ANCHOR_SIZE} />
      ) : (
        <motion.span
          className="block"
          style={ANCHOR_SIZE}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={ANCHOR_VIEWPORT}
          transition={{ type: "spring", stiffness: 380, damping: 20 }}
        />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Container + overlay                                                 */
/* ------------------------------------------------------------------ */

export default function SpineContainer({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 0.75"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const strokeProps = {
    stroke: `url(#${GRADIENT_ID})`,
    strokeWidth: 2,
    strokeOpacity: 0.3,
    strokeLinecap: "round",
    fill: "none",
  } as const;

  return (
    <div ref={containerRef} className="relative">
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: ACCENT_HEX.violet }} />
              <stop offset="0.5" style={{ stopColor: ACCENT_HEX.cyan }} />
              <stop offset="1" style={{ stopColor: ACCENT_HEX.green }} />
            </linearGradient>
          </defs>
          {reduced ? (
            <path d={PATH_D} {...strokeProps} />
          ) : (
            <motion.path
              d={PATH_D}
              {...strokeProps}
              initial={{ pathLength: 0 }}
              style={{ pathLength: drawn }}
            />
          )}
        </svg>

        {ANCHORS.map((point) => (
          <AnchorSquare
            key={`${point.x}-${point.y}`}
            point={point}
            reduced={reduced ?? false}
          />
        ))}
      </div>

      {children}
    </div>
  );
}
