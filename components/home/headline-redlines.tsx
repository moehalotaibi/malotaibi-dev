"use client";

// Figma-style measurement redlines between the headline's rendered lines.
// Hovering the h1 fades in three vertical pink redlines — one per gap
// between consecutive lines — each with 6px perpendicular end caps and a
// tiny pink value chip showing the measured gap in px, centered on the
// headline.
//
// What "gap" means here: the h1's block line-spans stack edge-to-edge
// (line-height 0.98), so the box-to-box gap is exactly 0. The REAL gap a
// viewer sees is the white space between the glyph ink of consecutive
// lines. Each line's ink extents come from canvas TextMetrics
// (actualBoundingBoxAscent/Descent for the line's own text) anchored to
// the line's baseline, which is derived from the measured line-box rect
// plus the font's half-leading. Re-measured on resize (ResizeObserver on
// the h1) and once fonts are ready.
//
// Gating: pointer-fine only (render nothing otherwise). Reduced motion
// keeps the redlines but drops the fade (instant show/hide). The whole
// overlay is aria-hidden and pointer-events-none; hover state is two
// pointerenter/leave listeners on the h1 — nothing runs per pointermove.

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "motion/react";

/** One measured inter-line gap, in px relative to the overlay's box. */
type Gap = { top: number; height: number; value: number };

// matchMedia store for pointer-fine gating (server snapshot: coarse) —
// same pattern as hero.
function subscribeFine(onChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getFine = () => window.matchMedia("(pointer: fine)").matches;
const getFineServer = () => false;

type Props = {
  /** The rendered h1 whose direct child spans are the headline lines. */
  h1Ref: RefObject<HTMLHeadingElement | null>;
};

export default function HeadlineRedlines({ h1Ref }: Props) {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const h1 = h1Ref.current;
    const overlay = overlayRef.current;
    if (!h1 || !overlay) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const measure = () => {
      // Direct children of the h1 are the block line spans (StaggerText
      // markup lives one level deeper and never affects these boxes —
      // transforms on the char spans don't move layout rects).
      const lines = Array.from(
        h1.querySelectorAll<HTMLSpanElement>(":scope > span"),
      );
      if (!ctx || lines.length < 2) {
        setGaps([]);
        return;
      }
      const overlayTop = overlay.getBoundingClientRect().top;
      const cs = getComputedStyle(lines[0]);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const uppercase = cs.textTransform === "uppercase";

      // Per line: baseline (from the line-box rect + half-leading) and the
      // ink extents of its actual text.
      const ink = lines.map((line) => {
        const rect = line.getBoundingClientRect();
        const text = uppercase
          ? (line.textContent ?? "").toUpperCase()
          : (line.textContent ?? "");
        const m = ctx.measureText(text);
        const contentArea = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
        const baseline =
          rect.top + (rect.height - contentArea) / 2 + m.fontBoundingBoxAscent;
        return {
          top: baseline - m.actualBoundingBoxAscent,
          bottom: baseline + m.actualBoundingBoxDescent,
        };
      });

      const next: Gap[] = [];
      for (let i = 0; i < ink.length - 1; i++) {
        const gapTop = ink[i].bottom;
        const gapBottom = ink[i + 1].top;
        const height = gapBottom - gapTop;
        if (height < 2) continue; // degenerate — nothing worth redlining
        next.push({
          top: gapTop - overlayTop,
          height,
          value: Math.round(height),
        });
      }
      setGaps(next);
    };

    measure();
    // Webfont swap can land after mount; ink metrics depend on the font.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    const ro = new ResizeObserver(measure);
    ro.observe(h1);

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    h1.addEventListener("pointerenter", enter);
    h1.addEventListener("pointerleave", leave);

    return () => {
      cancelled = true;
      ro.disconnect();
      h1.removeEventListener("pointerenter", enter);
      h1.removeEventListener("pointerleave", leave);
    };
  }, [fine, h1Ref]);

  if (!fine) return null;

  return (
    <motion.div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: hovered ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.15 }}
    >
      {gaps.map((g, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{ top: g.top, height: g.height }}
        >
          {/* 1px vertical measurement line, centered on the headline. */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent-pink" />
          {/* 6px perpendicular end caps. */}
          <div className="absolute left-1/2 top-0 h-px w-1.5 -translate-x-1/2 bg-accent-pink" />
          <div className="absolute bottom-0 left-1/2 h-px w-1.5 -translate-x-1/2 bg-accent-pink" />
          {/* Value chip — real measured gap, rounded to the px. */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-accent-pink px-1 font-mono text-[10px] font-medium leading-[14px] text-white">
            {g.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
