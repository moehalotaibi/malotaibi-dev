"use client";

// Before/after comparison slider — the redesign money shot. The after
// image is the base layer; the before image sits on top, clipped by a
// motion-value-driven inset so a divider + drag handle sweeps between
// them. Pointer drag (with capture, clamped 5–95%) and keyboard arrows
// both drive one raw motion value; a spring smooths the rendered
// position, bypassed under reduced motion. No setState per pointermove —
// aria-valuenow is kept fresh imperatively via useMotionValueEvent.

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type Side = { src: string; alt: string };

type Props = {
  before: Side;
  after: Side;
};

const MIN = 5;
const MAX = 95;
const STEP = 5;
const INITIAL = 50;

const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

export default function BeforeAfter({ before, after }: Props) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Raw divider position, % of container width revealed as "before".
  const raw = useMotionValue(INITIAL);
  const smoothed = useSpring(raw, { stiffness: 300, damping: 32 });
  const pos = reduced ? raw : smoothed;

  const clipPath = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(pos, (v) => `${v}%`);
  // Cross-fade chip emphasis toward whichever side is majority-revealed.
  const beforeOpacity = useTransform(pos, [38, 62], [0.35, 1]);
  const afterOpacity = useTransform(pos, [38, 62], [1, 0.35]);

  // Keep the slider's announced value current without React re-renders.
  useMotionValueEvent(raw, "change", (v) => {
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(v)));
  });

  const setFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    raw.set(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    try {
      // Capture so fast drags don't slip off the 36px handle.
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // NotFoundError if the pointer is already gone — drag still works
      // while the cursor stays over the handle.
    }
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = clamp(raw.get() - STEP);
    else if (e.key === "ArrowRight") next = clamp(raw.get() + STEP);
    else if (e.key === "Home") next = MIN;
    else if (e.key === "End") next = MAX;
    if (next === null) return;
    e.preventDefault();
    raw.set(next);
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[9/16] max-w-sm select-none overflow-hidden rounded-xl border border-rule bg-raised"
    >
      {/* After — base layer */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(min-width: 480px) 384px, 100vw"
        className="object-cover object-top"
      />

      {/* Before — top layer, clipped to the left of the divider */}
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 480px) 384px, 100vw"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Label chips — decorative; the slider itself carries the semantics */}
      <motion.span
        aria-hidden="true"
        className="label pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-cream backdrop-blur"
        style={{ opacity: beforeOpacity }}
      >
        Before
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="label pointer-events-none absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-cream backdrop-blur"
        style={{ opacity: afterOpacity }}
      >
        After
      </motion.span>

      {/* Divider + handle */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 z-10 w-0"
        style={{ left: dividerLeft }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-cream"
        />
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-orientation="horizontal"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={INITIAL}
          className="pointer-events-auto absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          {/* ⟷ affordance — two mirrored chevrons */}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 6-6 6 6 6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
