"use client";

// Figma-style "Color styles" panel — a compact card parked in the hero's
// empty RIGHT margin, mirroring the pen-tool selection object on the left.
// Unlike the decorative annotations this is a REAL control: each swatch row
// is a <button> (keyboard focusable, aria-pressed) that re-themes the hero
// headline + tagline accents; a Reset row appears while a theme is active.
// The selection-frame chrome is decorative by default; with `resizable`
// (the desktop Throwable instance) its four corner squares become live
// Figma resize grips — drag one and the card scales proportionally around
// the opposite corner, with a blue W × H size badge while dragging.
// Sizing is a toy with a memory: one second after a real resize is
// released the card springs back to 100% around the same anchor corner,
// wobbling home like the hero's throwable annotations (re-grab a grip
// mid-countdown or mid-spring and the hand wins); double-click a grip
// for an instant reset. The hero owns the theme state and wraps this
// panel in its Throwable physics wrapper.

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { ACCENT_HEX } from "@/lib/accents";
import type { Accent } from "@/lib/content";

type Props = {
  /** Currently applied hero theme, or null for the default per-line accents. */
  active: Accent | null;
  onPick: (accent: Accent) => void;
  onReset: () => void;
  /** Selection-frame corners become live resize grips (desktop instance). */
  resizable?: boolean;
};

/** Panel rows — Figma-ish "name / step" style names for the hero accents. */
const SWATCHES: readonly { accent: Accent; name: string }[] = [
  { accent: "violet", name: "violet / 400" },
  { accent: "amber", name: "amber / 400" },
  { accent: "cyan", name: "teal / 400" },
  { accent: "green", name: "green / 400" },
  { accent: "pink", name: "pink / 400" },
];

// ————— Resize plumbing (Figma proportional corner-drag + snap-back) —————

type Corner = "tl" | "tr" | "bl" | "br";

const SCALE_MIN = 0.7;
const SCALE_MAX = 1.6;
const clampScale = (s: number) =>
  Math.min(SCALE_MAX, Math.max(SCALE_MIN, s));

/** How long a released resize holds before the card springs back to 100%. */
const SNAP_BACK_DELAY_MS = 1000;

/** Snap-home spring — same wobbly family as the hero's HOME_SPRING
    (stiffness 90 / damping 11); stiffness nudged up because scale reads
    slower than position at the same rate, damping kept so the overshoot
    wobble speaks the same physics language as the annotations. */
const SNAP_SPRING = { type: "spring", stiffness: 120, damping: 11 } as const;

/** The corner that stays FIXED while `corner` is dragged (Figma: opposite). */
const ANCHOR_OF: Record<Corner, Corner> = {
  tl: "br",
  tr: "bl",
  bl: "tr",
  br: "tl",
};

/** transform-origin keyword for an anchor corner. */
const ORIGIN_OF: Record<Corner, string> = {
  tl: "top left",
  tr: "top right",
  bl: "bottom left",
  br: "bottom right",
};

/** Everything a live drag needs, captured once on pointerdown. */
type ResizeDrag = {
  pointerId: number;
  /** Viewport position of the anchored (opposite) corner — never moves. */
  fixed: { x: number; y: number };
  /** Pointer's Euclidean distance from `fixed` at grab time. */
  startDist: number;
  startScale: number;
  /** Unscaled layout size — badge W × H is base × scale, exact. */
  base: { w: number; h: number };
  /** Did the pointer actually resize? A plain tap at 100% stays inert. */
  moved: boolean;
};

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

/** Per-corner hit-area placement + the Figma diagonal resize cursors
    (element-level, so they override the site-wide Figma arrow cursor). */
const HANDLE_POS: Record<Corner, string> = {
  tl: "-left-[9px] -top-[9px] cursor-nwse-resize",
  tr: "-right-[9px] -top-[9px] cursor-nesw-resize",
  bl: "-bottom-[9px] -left-[9px] cursor-nesw-resize",
  br: "-bottom-[9px] -right-[9px] cursor-nwse-resize",
};

const CORNERS: readonly Corner[] = ["tl", "tr", "bl", "br"];

type FrameProps = {
  resizable?: boolean;
  onGrab?: (corner: Corner, e: ReactPointerEvent<HTMLSpanElement>) => void;
  onMove?: (e: ReactPointerEvent<HTMLSpanElement>) => void;
  onEnd?: (e: ReactPointerEvent<HTMLSpanElement>) => void;
  onResetScale?: () => void;
};

/**
 * Figma selection chrome around the card. Decorative by default; when
 * `resizable` each 6px corner square sits inside an invisible 18px grip
 * (pointer-events-auto) that drives the proportional resize. The grips are
 * pointer-only affordances and stay inside this aria-hidden layer — the
 * panel's real controls (swatches/Reset) remain the keyboard surface, so
 * no keyboard duplicate of the resize is exposed.
 */
function SelectionFrame({ resizable, onGrab, onMove, onEnd, onResetScale }: FrameProps) {
  const corner = "h-1.5 w-1.5 border border-accent-blue bg-white";
  return (
    <div className="pointer-events-none absolute -inset-1.5" aria-hidden="true">
      <div className="absolute inset-0 border border-accent-blue/60" />
      {CORNERS.map((c) =>
        resizable ? (
          <span
            key={c}
            className={`pointer-events-auto absolute grid h-[18px] w-[18px] touch-none select-none place-items-center ${HANDLE_POS[c]}`}
            // Capture phase: stop the pointerdown BEFORE it descends to the
            // Throwable motion.div's native listener — otherwise a grip grab
            // would also start a throw-drag and the panel would fly.
            onPointerDownCapture={(e) => onGrab?.(c, e)}
            onPointerMoveCapture={onMove}
            onPointerUp={onEnd}
            onPointerCancel={onEnd}
            onDoubleClick={onResetScale}
          >
            <span className={corner} />
          </span>
        ) : (
          <span
            key={c}
            className={`absolute ${corner} ${
              c === "tl"
                ? "-left-[3px] -top-[3px]"
                : c === "tr"
                  ? "-right-[3px] -top-[3px]"
                  : c === "bl"
                    ? "-bottom-[3px] -left-[3px]"
                    : "-bottom-[3px] -right-[3px]"
            }`}
          />
        ),
      )}
    </div>
  );
}

export default function ColorStylesPanel({
  active,
  onPick,
  onReset,
  resizable = false,
}: Props) {
  const reduced = useReducedMotion();

  // Figma-rectangle resize state (resizable instance only). Scale lives
  // here, not in the hero — it's the card's own toy state, reset on reload.
  // It's a MOTION VALUE, not state: pointermove writes it synchronously
  // (1:1 under the hand, no re-render), and the snap-back spring animates
  // the same value home.
  const rootRef = useRef<HTMLDivElement>(null);
  const scaleMv = useMotionValue(1);
  // Anchor corner = transform-origin. Set per grab (opposite the grip),
  // kept after the drag so the card doesn't shift when the drag ends —
  // and so the snap-back bounces from where the card was stretched.
  const [anchor, setAnchor] = useState<Corner>("tl");
  const [badge, setBadge] = useState<string | null>(null);
  const drag = useRef<ResizeDrag | null>(null);
  // Pending snap-back: the 1s countdown, then the spring itself.
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapAnim = useRef<ReturnType<typeof animate> | null>(null);

  /** Kill any pending snap-back — countdown and spring both. */
  const cancelSnapBack = useCallback(() => {
    if (snapTimer.current !== null) {
      clearTimeout(snapTimer.current);
      snapTimer.current = null;
    }
    snapAnim.current?.stop();
    snapAnim.current = null;
  }, []);

  // A timer/spring left running past unmount would write to a dead node.
  useEffect(() => cancelSnapBack, [cancelSnapBack]);

  const beginResize = (corner: Corner, e: ReactPointerEvent<HTMLSpanElement>) => {
    const root = rootRef.current;
    if (!root) return;
    // Keep the event away from the Throwable wrapper (see SelectionFrame).
    // No preventDefault: cancelling pointerdown would suppress the click /
    // dblclick compat events, breaking the double-click-to-reset grip.
    e.stopPropagation();
    // Reclaim mid-countdown or mid-spring: the hand wins (same rule as the
    // Throwable's home spring). Stop BEFORE measuring so the rect and the
    // motion value snapshot the same frozen scale.
    cancelSnapBack();
    const rect = root.getBoundingClientRect();
    const s0 = scaleMv.get();
    const w = rect.width / s0;
    const h = rect.height / s0;
    // Recover the UNSCALED layout box from the measured (scaled) rect using
    // the current origin, then pin the new anchor corner at its unscaled
    // spot — with transform-origin on that corner it stays put at any scale.
    const ox = anchor === "tr" || anchor === "br" ? w : 0;
    const oy = anchor === "bl" || anchor === "br" ? h : 0;
    const left0 = rect.left - ox * (1 - s0);
    const top0 = rect.top - oy * (1 - s0);
    const next = ANCHOR_OF[corner];
    const fixed = {
      x: left0 + (next === "tr" || next === "br" ? w : 0),
      y: top0 + (next === "bl" || next === "br" ? h : 0),
    };
    const startDist = Math.hypot(e.clientX - fixed.x, e.clientY - fixed.y);
    if (startDist < 4) return; // degenerate grab — ratio would explode
    drag.current = {
      pointerId: e.pointerId,
      fixed,
      startDist,
      startScale: s0,
      base: { w, h },
      moved: false,
    };
    setAnchor(next);
    setBadge(`${Math.round(w * s0)} × ${Math.round(h * s0)}`);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const moveResize = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointerId) return;
    e.stopPropagation();
    // Proportional like Figma: scale by the pointer's distance ratio from
    // the fixed corner, so the grabbed corner tracks the hand diagonally.
    const dist = Math.hypot(e.clientX - d.fixed.x, e.clientY - d.fixed.y);
    const next = clampScale(d.startScale * (dist / d.startDist));
    // Synchronous write — the card tracks the hand 1:1, no render between.
    scaleMv.set(next);
    // ~1px of real diagonal travel before this counts as a resize — the
    // micro-jitter inside a click/double-click must not arm the snap-back.
    if (Math.abs(next - d.startScale) > 0.005) d.moved = true;
    setBadge(`${Math.round(d.base.w * next)} × ${Math.round(d.base.h * next)}`);
  };

  const endResize = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointerId) return;
    drag.current = null;
    setBadge(null);
    // Arm on a real resize, or on letting go while still away from 100%
    // (a moveless grab that reclaimed the countdown must not strand the
    // card scaled — like the Throwable, it always finds its way home).
    // A plain tap at 100% stays inert.
    if (!d.moved && Math.abs(scaleMv.get() - 1) < 0.001) return;
    // Hold the new size for a beat, then spring home to 100% around the
    // release-time anchor (it bounces from where it was stretched). Under
    // reduced motion: same 1s hold, then a quick even return — no wobble.
    snapTimer.current = setTimeout(() => {
      snapTimer.current = null;
      snapAnim.current = animate(
        scaleMv,
        1,
        reduced ? { duration: 0.15, ease: "easeOut" } : SNAP_SPRING,
      );
    }, SNAP_BACK_DELAY_MS);
  };

  /** Double-click reset — instant 100%, and no snap-back sneaking in later. */
  const resetScale = () => {
    cancelSnapBack();
    scaleMv.set(1);
  };

  return (
    <motion.div
      ref={rootRef}
      className="relative w-44 rounded-xl border border-rule bg-raised/95 backdrop-blur-sm"
      style={
        resizable
          ? { scale: scaleMv, transformOrigin: ORIGIN_OF[anchor] }
          : undefined
      }
    >
      <SelectionFrame
        resizable={resizable}
        onGrab={beginResize}
        onMove={moveResize}
        onEnd={endResize}
        onResetScale={resetScale}
      />

      {/* Figma size badge — live W × H while a grip is being dragged. */}
      {resizable && (
        <div
          className="pointer-events-none absolute left-0 right-0 top-full flex justify-center"
          aria-hidden="true"
        >
          <AnimatePresence>
            {badge !== null && (
              <motion.span
                className="mt-2.5 whitespace-nowrap rounded bg-accent-blue px-1.5 py-0.5 font-mono text-micro text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.12 }}
              >
                {badge}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}

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
    </motion.div>
  );
}
