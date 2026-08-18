"use client";

// Figma-style "Color styles" panel — a compact card parked in the hero's
// empty RIGHT margin, mirroring the pen-tool selection object on the left.
// Unlike the decorative annotations this is a REAL control: each swatch row
// is a <button> (keyboard focusable, aria-pressed) that re-themes the hero
// headline + tagline accents; a Reset row appears while a theme is active.
// Only the selection-frame chrome around the card is decorative
// (pointer-events-none + aria-hidden). The hero owns the theme state and
// wraps this panel in its Throwable physics wrapper.

import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ACCENT_HEX } from "@/lib/accents";
import type { Accent } from "@/lib/content";

type Props = {
  /** Currently applied hero theme, or null for the default per-line accents. */
  active: Accent | null;
  onPick: (accent: Accent) => void;
  onReset: () => void;
};

/** Panel rows — Figma-ish "name / step" style names for the hero accents. */
const SWATCHES: readonly { accent: Accent; name: string }[] = [
  { accent: "violet", name: "violet / 400" },
  { accent: "amber", name: "amber / 400" },
  { accent: "cyan", name: "teal / 400" },
  { accent: "green", name: "green / 400" },
  { accent: "pink", name: "pink / 400" },
];

/** Tiny 2×2 dot-grid glyph for the header row (styles-panel affordance). */
function DotGridGlyph() {
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-paper-dim" aria-hidden="true">
      <circle cx="3" cy="3" r="1.2" fill="currentColor" />
      <circle cx="7" cy="3" r="1.2" fill="currentColor" />
      <circle cx="3" cy="7" r="1.2" fill="currentColor" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Undo-ish glyph for the Reset row — counter-clockwise arrow. */
function UndoGlyph() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className="h-3 w-3 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M2 2v3h3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2 5A4.2 4.2 0 1 0 3 3.2L2 4.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma selection chrome around the card — decorative only. */
function SelectionFrame() {
  const corner = "absolute h-1.5 w-1.5 border border-accent-blue bg-white";
  return (
    <div className="pointer-events-none absolute -inset-1.5" aria-hidden="true">
      <div className="absolute inset-0 border border-accent-blue/60" />
      <span className={`${corner} -left-[3px] -top-[3px]`} />
      <span className={`${corner} -right-[3px] -top-[3px]`} />
      <span className={`${corner} -bottom-[3px] -left-[3px]`} />
      <span className={`${corner} -bottom-[3px] -right-[3px]`} />
    </div>
  );
}

export default function ColorStylesPanel({ active, onPick, onReset }: Props) {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-44 rounded-xl border border-rule bg-raised/95 backdrop-blur-sm">
      <SelectionFrame />

      {/* Header row */}
      <div className="flex items-center justify-between px-3 pb-1 pt-2.5">
        <span className="label">Color styles</span>
        <DotGridGlyph />
      </div>

      {/* Swatch rows — real buttons; a clean click applies the theme. */}
      <div className="px-1 pb-1" role="group" aria-label="Color styles">
        {SWATCHES.map(({ accent, name }) => {
          const selected = active === accent;
          return (
            <button
              key={accent}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(accent)}
              className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.04] max-lg:min-h-[44px]"
            >
              <span
                className={`h-3.5 w-3.5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] ${
                  selected ? "ring-2 ring-offset-0" : ""
                }`}
                style={
                  {
                    backgroundColor: ACCENT_HEX[accent],
                    ...(selected
                      ? { "--tw-ring-color": ACCENT_HEX[accent] }
                      : null),
                  } as CSSProperties
                }
                aria-hidden="true"
              />
              <span
                className={`font-mono text-micro transition-colors ${
                  selected ? "text-paper" : "text-paper-mid"
                }`}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reset row — slides in while a theme is active. */}
      <AnimatePresence initial={false}>
        {active !== null && (
          <motion.div
            key="reset"
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
          >
            <div className="mx-1 mb-1 border-t border-rule pt-1">
              <button
                type="button"
                onClick={onReset}
                className="label flex w-full items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.04] hover:text-paper max-lg:min-h-[44px]"
              >
                <UndoGlyph />
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
