"use client";

// Auto-layout toy — Figma 101, parked in the hero's empty left margin
// (the old pen-tool curve's band slot). Four flat canvas shapes rest
// scattered at fixed offsets; the "Auto layout" chip above them toggles
// auto layout on/off. On: the shapes spring into a single row (16px
// gaps, 12px padding, rotations zeroed), then — after a 450ms timeout,
// never an animation callback, since a hidden pane suspends rAF — the
// measurement chrome fades in: pink "16" spacing badges with tick lines
// in each gap, a blue selection frame with white corner squares hugging
// the row, and pink "12" padding badges on the frame's inner edges.
// Off: chrome fades out first (150ms), then the shapes tumble back.
// All geometry is deterministic module-level constants; the arranged
// row and its chrome derive from the one SHAPES list.
//
// Only the <button> is interactive (aria-pressed = auto layout on); the
// shapes and chrome live in an aria-hidden, pointer-events-none stage.
// A real button needs no pointer-fine gate (same call as the color
// panel); reduced motion swaps states instantly — no springs, fades or
// delays. The lg+ gate lives on the hero's band wrapper, not here.
//
// Placement (region left 2% of the capped band, top 104px, 260x240):
// measured against the headline ink at 1024/1280/1440 — region bottom
// 344 stays above the "& FRONT-END" band (355.1 at 1024, the tightest),
// and region right edge (280 at 1024) stays left of the "DESIGNER" ink
// (306.2 at 1024; ≥386 from 1280 up). Type-test top ≥589, annotations
// all rest right of x≈292 — clear at every width.

import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PacManShape,
  RoundedSquareShape,
  StarShape,
  TriangleShape,
} from "@/components/system/canvas-shapes";

const REGION_W = 260; // region is 260x240 — mirrored by the root's h-/w- classes
const GAP = 16; // arranged: space between adjacent shapes
const PAD = 12; // arranged: frame padding left/right of the row
const ROW_CY = 144; // arranged row's vertical center, region-local

/** Arrange spring — quick, slightly bouncy snap into the row. */
const ARRANGE_SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;
const STAGGER = 0.04; // 40ms per shape, both directions
const CHROME_IN_DELAY = 450; // ms — springs have visually landed by then
const CHROME_OUT = 150; // ms — chrome fade-out before the tumble back

type ToyShape = {
  key: string;
  size: number;
  Shape: ComponentType<{ className?: string }>;
  /** text-accent-* class — canvas-shapes fill with currentColor. */
  color: string;
  /** Scattered rest: fixed region-local offsets + rotation (deg). */
  scatter: { x: number; y: number; rotate: number };
};

// Scattered constants are hand-placed to overlap organically (pac-man
// under the square's corner, square under the triangle's corner) while
// staying inside the region and clear of the chip button (y ≥ 56).
const SHAPES: readonly ToyShape[] = [
  { key: "pac", size: 48, Shape: PacManShape, color: "text-accent-amber", scatter: { x: 22, y: 64, rotate: -14 } },
  { key: "star", size: 44, Shape: StarShape, color: "text-accent-cyan", scatter: { x: 150, y: 56, rotate: 18 } },
  { key: "square", size: 48, Shape: RoundedSquareShape, color: "text-accent-pink", scatter: { x: 64, y: 104, rotate: 10 } },
  { key: "triangle", size: 44, Shape: TriangleShape, color: "text-accent-violet", scatter: { x: 104, y: 138, rotate: -8 } },
];

// ---- Arranged geometry, all derived from SHAPES ----------------------
const MAX_SIZE = Math.max(...SHAPES.map((s) => s.size));
const ROW_W =
  SHAPES.reduce((sum, s) => sum + s.size, 0) +
  GAP * (SHAPES.length - 1) +
  PAD * 2; // 256
const FRAME_X = (REGION_W - ROW_W) / 2; // 2 — row centered in the region
const FRAME_Y = ROW_CY - MAX_SIZE / 2 - PAD; // 108
const FRAME_H = MAX_SIZE + PAD * 2; // 72

/** Arranged left/top per shape — equal 16px gaps, centers on ROW_CY. */
const ARRANGED: readonly { x: number; y: number }[] = (() => {
  let x = FRAME_X + PAD;
  return SHAPES.map((s) => {
    const pos = { x, y: ROW_CY - s.size / 2 };
    x += s.size + GAP;
    return pos;
  });
})();

/** Left edge of each inter-shape gap (right edge of the shape before). */
const GAP_XS: readonly number[] = SHAPES.slice(0, -1).map(
  (s, i) => ARRANGED[i].x + s.size,
);

/** Frame corner centers, for the four white selection squares. */
const CORNERS: readonly { x: number; y: number }[] = [
  { x: FRAME_X, y: FRAME_Y },
  { x: FRAME_X + ROW_W, y: FRAME_Y },
  { x: FRAME_X, y: FRAME_Y + FRAME_H },
  { x: FRAME_X + ROW_W, y: FRAME_Y + FRAME_H },
];

/** Redline value chip — same vocabulary as the headline redlines. */
const BADGE =
  "absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-accent-pink px-1 font-mono text-[10px] font-medium leading-[14px] text-white";

/** Figma's auto-layout glyph — two horizontal bars in corner brackets. */
function AutoLayoutGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path
        d="M1 3.5V1h2.5M8.5 1H11v2.5M11 8.5V11H8.5M3.5 11H1V8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect x="3" y="3.75" width="6" height="1.5" rx="0.5" fill="currentColor" />
      <rect x="3" y="6.75" width="6" height="1.5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export default function AutoLayoutToy() {
  const reduced = useReducedMotion();

  // on      — the button's state (aria-pressed), flips on every click.
  // arranged — the shapes' target; lags `on` by CHROME_OUT on the way off.
  // chrome  — badges + frame visibility; lags on the way on.
  const [on, setOn] = useState(false);
  const [arranged, setArranged] = useState(false);
  const [chrome, setChrome] = useState(false);

  const timer = useRef<number | null>(null);
  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };
  useEffect(() => clearTimer, []);

  const toggle = () => {
    clearTimer();
    if (!on) {
      setOn(true);
      setArranged(true);
      if (reduced) {
        setChrome(true); // instant — no settle to wait for
        return;
      }
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setChrome(true);
      }, CHROME_IN_DELAY);
    } else {
      setOn(false);
      setChrome(false);
      if (reduced || !chrome) {
        // Instant swap, or chrome never showed — nothing to fade first.
        setArranged(false);
        return;
      }
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setArranged(false);
      }, CHROME_OUT);
    }
  };

  return (
    <div
      className="pointer-events-none absolute left-[2%] top-[104px] z-10 h-[240px] w-[260px]"
      data-auto-layout-toy
    >
      {/* Stage — decoration only. Chrome renders after the shapes so the
          badges paint above them, like Figma's own spacing handles. */}
      <div className="absolute inset-0" aria-hidden="true">
        {SHAPES.map((s, i) => (
          <motion.div
            key={s.key}
            className={`absolute left-0 top-0 opacity-80 ${s.color}`}
            style={{ width: s.size, height: s.size }}
            initial={false}
            animate={
              arranged
                ? { x: ARRANGED[i].x, y: ARRANGED[i].y, rotate: 0 }
                : { x: s.scatter.x, y: s.scatter.y, rotate: s.scatter.rotate }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { ...ARRANGE_SPRING, delay: i * STAGGER }
            }
          >
            <s.Shape className="h-full w-full" />
          </motion.div>
        ))}

        {/* Measurement chrome — spacing badges + selection frame. */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: chrome ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
        >
          {/* Selection frame hugging the arranged row. */}
          <div
            className="absolute border border-accent-blue/70"
            style={{ left: FRAME_X, top: FRAME_Y, width: ROW_W, height: FRAME_H }}
          />
          {/* White 6px corner squares, centered on the frame corners. */}
          {CORNERS.map((c, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 bg-white"
              style={{ left: c.x - 3, top: c.y - 3 }}
            />
          ))}
          {/* Padding badges on the frame's inner left/right edges. */}
          <span className={BADGE} style={{ left: FRAME_X + PAD / 2, top: ROW_CY }}>
            {PAD}
          </span>
          <span
            className={BADGE}
            style={{ left: FRAME_X + ROW_W - PAD / 2, top: ROW_CY }}
          >
            {PAD}
          </span>
          {/* Per gap: 1px pink ticks at both edges + the "16" badge. */}
          {GAP_XS.map((gx) => (
            <div key={gx}>
              <div
                className="absolute w-px bg-accent-pink"
                style={{ left: gx, top: ROW_CY - MAX_SIZE / 2, height: MAX_SIZE }}
              />
              <div
                className="absolute w-px bg-accent-pink"
                style={{ left: gx + GAP - 1, top: ROW_CY - MAX_SIZE / 2, height: MAX_SIZE }}
              />
              <span className={BADGE} style={{ left: gx + GAP / 2, top: ROW_CY }}>
                {GAP}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* The one real control. */}
      <button
        type="button"
        aria-pressed={on}
        onClick={toggle}
        className="pointer-events-auto relative inline-flex items-center gap-2 rounded-md border border-rule-strong bg-raised px-3 py-2 font-mono text-micro uppercase text-paper transition-colors hover:border-paper"
      >
        <AutoLayoutGlyph />
        Auto layout
      </button>
    </div>
  );
}
