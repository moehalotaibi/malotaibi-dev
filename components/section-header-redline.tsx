"use client";

// Hover redline for SectionHeader — a Figma-style spec line measuring the
// REAL pixel gap between the title's text box and the rule below it.
// Vocabulary: 1px solid accent-pink line, 6px perpendicular end caps, and a
// tiny pink value chip (white 10px mono) centered on the line. Pointer-fine
// only; fades in/out over 150ms (instant under reduced motion); purely
// decorative (aria-hidden + pointer-events-none); measured on hover and
// re-measured on resize — never hardcoded.
//
// This is the client half of the server-compatible SectionHeader: it finds
// the heading and rule through its parent block, so SectionHeader itself
// stays importable from server pages.

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeFinePointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const readFinePointer = () => window.matchMedia(FINE_POINTER_QUERY).matches;
const readFinePointerServer = () => false;

type Box = {
  top: number;
  left: number;
  height: number;
  /** Rounded integer gap shown in the value chip. */
  gap: number;
};

export default function SectionHeaderRedline() {
  const reduced = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    readFinePointer,
    readFinePointerServer,
  );

  const anchorRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    if (!finePointer) return;
    const block = anchorRef.current?.parentElement;
    if (!block) return;

    const measure = () => {
      const heading = block.querySelector("h1, h2");
      const rule = block.querySelector(".rule");
      if (!heading || !rule) return false;
      const blockRect = block.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      const ruleRect = rule.getBoundingClientRect();
      const gap = ruleRect.top - headingRect.bottom;
      if (gap < 2) return false;
      setBox({
        top: headingRect.bottom - blockRect.top,
        left: headingRect.left - blockRect.left + 10,
        height: gap,
        gap: Math.round(gap),
      });
      return true;
    };

    const onEnter = () => setShown(measure());
    const onLeave = () => setShown(false);

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!measure()) setShown(false);
      });
    };

    block.addEventListener("pointerenter", onEnter);
    block.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      block.removeEventListener("pointerenter", onEnter);
      block.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [finePointer]);

  const visible = finePointer && shown && box !== null;

  return (
    <span
      ref={anchorRef}
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 w-px bg-accent-pink ${
        reduced ? "" : "transition-opacity duration-150"
      }`}
      style={{
        top: box?.top ?? 0,
        left: box?.left ?? 0,
        height: box?.height ?? 0,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* 6px perpendicular end caps, centered on the 1px line */}
      <span className="absolute -left-[2.5px] top-0 h-px w-1.5 bg-accent-pink" />
      <span className="absolute -left-[2.5px] bottom-0 h-px w-1.5 bg-accent-pink" />
      {/* value chip — the real measured gap, centered on the line */}
      {box ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-accent-pink px-1 font-mono text-[10px] leading-[1.4] text-white">
          {box.gap}
        </span>
      ) : null}
    </span>
  );
}
