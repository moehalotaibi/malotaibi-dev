"use client";

// Grabbable physics wrapper for the 404 playground — same pattern as the
// hero's floating annotations (components/home/hero.tsx), copied here so
// system pages never reach into hero internals. All drag math lives on
// motion values (no state on pointermove); a released throw keeps its
// momentum and bounces off the section's edges (dragConstraints + elastic),
// and once the bounce settles the piece springs back home to (0, 0). The
// isDragging ref guards the settle callback: if the visitor grabbed the
// piece again mid-settle, it must not be yanked home.

import { useRef } from "react";
import type { MouseEventHandler, ReactNode, RefObject } from "react";
import { animate, motion, useMotionValue } from "motion/react";

/** Return-home spring — soft and bouncy, so pieces wobble back into place. */
const HOME_SPRING = { type: "spring", stiffness: 90, damping: 11 } as const;

/** Throw physics — momentum carries the piece and bounces it off the walls. */
const THROW_TRANSITION = {
  bounceStiffness: 320,
  bounceDamping: 13,
  power: 0.8,
  timeConstant: 240,
} as const;

type ThrowableProps = {
  /** pointer-fine && !reduced-motion; when false, children render untouched. */
  enabled: boolean;
  /** The playground <section> — drag constraints, i.e. the bounce walls. */
  constraintsRef: RefObject<HTMLElement | null>;
  /** Fires once per real drag, after the pointer actually moves (not taps). */
  onGrab?: () => void;
  /** Capture-phase click hook — link children veto post-drag clicks. */
  onClickCapture?: MouseEventHandler<HTMLDivElement>;
  /** Fires when a throw's bounce animation fully settles. */
  onSettle?: () => void;
  children: ReactNode;
};

export default function Throwable({
  enabled,
  constraintsRef,
  onGrab,
  onClickCapture,
  onSettle,
  children,
}: ThrowableProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDragging = useRef(false);
  const homing = useRef<ReturnType<typeof animate>[]>([]);

  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      className="pointer-events-auto cursor-grab touch-none select-none active:cursor-grabbing"
      style={{ x, y }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      dragMomentum
      dragTransition={THROW_TRANSITION}
      onDragStart={() => {
        isDragging.current = true;
        // Reclaim mid-return: the home spring must not fight the hand.
        for (const anim of homing.current) anim.stop();
        homing.current = [];
        onGrab?.();
      }}
      onDragEnd={() => {
        isDragging.current = false;
      }}
      onDragTransitionEnd={() => {
        onSettle?.();
        if (isDragging.current) return; // grabbed again mid-settle — stay held
        homing.current = [animate(x, 0, HOME_SPRING), animate(y, 0, HOME_SPRING)];
      }}
      onClickCapture={onClickCapture}
    >
      {children}
    </motion.div>
  );
}
