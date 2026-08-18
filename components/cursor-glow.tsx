"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/** Diameter of the glow dot in px — must match `.cursor-glow` in globals.css. */
const GLOW_SIZE = 28;

const SPRING = { stiffness: 300, damping: 28 };

const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeFinePointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readFinePointer() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function readFinePointerServer() {
  return false;
}

/**
 * A soft violet glow that trails the pointer with a slight spring lag and
 * grows while hovering interactive elements. Never hides the system cursor.
 * Hidden on touch devices and under reduced motion.
 */
export default function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    readFinePointer,
    readFinePointerServer,
  );

  const x = useMotionValue(-GLOW_SIZE * 2);
  const y = useMotionValue(-GLOW_SIZE * 2);
  const scale = useMotionValue(1);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springScale = useSpring(scale, { stiffness: 320, damping: 26 });

  useEffect(() => {
    if (!finePointer || reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - GLOW_SIZE / 2);
      y.set(event.clientY - GLOW_SIZE / 2);
    };

    // Event delegation: grow over anything interactive, settle back elsewhere.
    const onOver = (event: PointerEvent) => {
      const interactive =
        event.target instanceof Element &&
        event.target.closest("a, button, [role=button]") !== null;
      scale.set(interactive ? 1.8 : 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [finePointer, reducedMotion, x, y, scale]);

  if (!finePointer || reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-50"
      style={{ x: springX, y: springY, scale: springScale }}
    />
  );
}
