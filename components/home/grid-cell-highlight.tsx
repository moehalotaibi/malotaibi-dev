"use client";

// Figma-canvas grid highlight — a faint 87x87 cell that snaps to the
// 88px .line-grid tile under the pointer, like hovering the canvas in
// Figma. The .line-grid backdrop is anchored to the hero section's
// top-left, so cell coordinates are simply floor(pointer/88)*88 in
// section-local space, driven through quick springs (stiffness 500,
// damping 40) so the highlight chases the cursor cell-to-cell.
//
// The highlight hides (opacity spring → 0) when the pointer leaves the
// section or sits over the headline / tagline text blocks, so it reads
// as canvas feedback, not text highlighting. Those two rects are cached
// in SECTION-LOCAL coordinates by a ResizeObserver — scrolling never
// invalidates them — and the per-move work is one getBoundingClientRect
// on the section (the same pattern Magnetic uses) plus motion-value
// writes. No React state is touched on pointermove.
//
// Gating: pointer-fine and motion-full only — otherwise nothing renders
// and no listeners attach. aria-hidden + pointer-events-none throughout.

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

const CELL = 88; // .line-grid tile size (px)

/** Quick snap — the highlight hops cell to cell with a hint of overshoot. */
const SNAP = { stiffness: 500, damping: 40 } as const;
/** Show/hide fade for the highlight. */
const FADE = { stiffness: 260, damping: 30 } as const;

type LocalRect = { l: number; t: number; r: number; b: number };

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
  /** The hero <section> — pointer surface and grid origin. */
  sectionRef: RefObject<HTMLElement | null>;
  /** Headline block — the highlight hides while the pointer is over it. */
  headlineRef: RefObject<HTMLElement | null>;
  /** Tagline paragraph — ditto. */
  taglineRef: RefObject<HTMLElement | null>;
};

export default function GridCellHighlight({
  sectionRef,
  headlineRef,
  taglineRef,
}: Props) {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const enabled = fine && !reduced;

  const x = useSpring(0, SNAP);
  const y = useSpring(0, SNAP);
  const opacity = useSpring(0, FADE);

  // Text-block rects in section-local px, refreshed on any resize.
  const avoidRef = useRef<LocalRect[]>([]);
  // False after leaving the section — the next move teleports the cell
  // into place instead of springing across the hero.
  const insideRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const sr = section.getBoundingClientRect();
      avoidRef.current = [headlineRef.current, taglineRef.current]
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            l: r.left - sr.left,
            t: r.top - sr.top,
            r: r.right - sr.left,
            b: r.bottom - sr.top,
          };
        });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    for (const ref of [headlineRef, taglineRef]) {
      if (ref.current) ro.observe(ref.current);
    }

    const onMove = (e: PointerEvent) => {
      const sr = section.getBoundingClientRect();
      const px = e.clientX - sr.left;
      const py = e.clientY - sr.top;
      const overText = avoidRef.current.some(
        (a) => px >= a.l && px <= a.r && py >= a.t && py <= a.b,
      );
      const cx = Math.floor(px / CELL) * CELL;
      const cy = Math.floor(py / CELL) * CELL;
      if (insideRef.current) {
        x.set(cx);
        y.set(cy);
      } else {
        insideRef.current = true;
        x.jump(cx);
        y.jump(cy);
      }
      opacity.set(overText ? 0 : 1);
    };
    const onLeave = () => {
      insideRef.current = false;
      opacity.set(0);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, sectionRef, headlineRef, taglineRef, x, y, opacity]);

  if (!enabled) return null;

  return (
    // left/top of 1px seat the 87px square inside the cell's interior,
    // clear of the 1px grid lines; the transform carries the cell snap.
    <motion.div
      className="pointer-events-none absolute left-px top-px h-[87px] w-[87px] border border-white/[0.06] bg-white/[0.04]"
      aria-hidden="true"
      style={{ x, y, opacity }}
    />
  );
}
