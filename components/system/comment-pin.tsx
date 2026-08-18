"use client";

// Figma comment pin for the 404 playground — a teardrop bubble (circle with
// a squared bottom-left corner, like Figma's comment markers) carrying the
// "m." monogram. Clicking it toggles a small comment card; Escape or a
// second click dismisses it. The pin is a real button (accessible name +
// aria-expanded); the card is plain text, so focus stays on the pin.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

export default function CommentPin() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Escape dismisses the card from anywhere on the page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls="nf-comment-card"
        aria-label="Comment from Moe"
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full rounded-bl-[4px] border border-rule-strong bg-cream font-mono text-[0.8125rem] font-bold text-ink shadow-lg shadow-black/30"
        whileHover={reduced ? undefined : { scale: 1.1, rotate: -4 }}
        whileTap={reduced ? undefined : { scale: 0.94 }}
        transition={SPRING}
      >
        <span aria-hidden="true">m.</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nf-comment-card"
            className="card absolute right-0 top-full z-10 mt-3 w-60 p-4 text-left text-meta"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
            transition={SPRING}
          >
            <p className="label">{"// 404"}</p>
            <p className="mt-2 text-paper">
              This frame doesn&apos;t exist. &mdash; Moe
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
