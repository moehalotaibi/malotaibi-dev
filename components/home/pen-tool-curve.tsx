"use client";

// Draggable bezier dressed as a Figma SELECTION BOX — the gradient curve
// reads as a selected object: a blue bounding rectangle hugs the live
// bounding box of the four bezier points, with white corner handles at the
// bbox corners. The whole object rests as a COMPACT selected shape parked
// in the hero's empty left margin (~min(19vw, 272px) wide), so its stroke
// never crosses the headline. Each corner is bound (once, from the rest
// shape) to its nearest bezier point; dragging a corner moves that point
// 1:1 while held (motion-value .jump) so the curve warps and the frame
// stretches with it, like scaling a selection. On release everything
// settles home on a slow, bouncy spring (explicit animate() per
// coordinate). Touch devices and reduced motion get the static gradient
// path only — no frame, no handles, no listeners.
//
// Coordinate strategy: the viewBox mirrors the measured pixel size of the
// hero (ResizeObserver), so 1 user unit == 1 CSS px — stroke widths and
// the 8px handle chrome are exact, and drag deltas map through the svg's
// screen CTM with no scale fudging. Resting points are fractions of the
// measured size, re-derived on resize. Frame edges snap to half-pixels so
// the 1.5px stroke stays crisp.
//
// Layering: two sibling SVGs share the same coordinate space. The visual
// layer sits before .shell in the DOM (below the headline, above the
// .line-grid backdrop). The hit layer carries z-10 so its four invisible
// grab circles rise above the transparent .shell box — they ride the bbox
// corners, whose resting spots are the compact box's corners in the
// hero's empty left margin, so no real content is ever covered.

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ACCENT_HEX } from "@/lib/accents";

/** Release spring — slow, satisfying settle. */
const SETTLE = { type: "spring", stiffness: 120, damping: 14 } as const;

const CHROME = ACCENT_HEX.blue; // #60a5fa — Figma selection chrome
const HANDLE = 8; // corner handle square edge (px)
const HIT_R = 14; // invisible grab-circle radius (px)
const EDGE = 8; // drag clamp inset from the svg edges (px)
const GRADIENT_ID = "pen-curve-grad"; // single hero instance — fixed id is safe

type PointKey = "p0" | "c0" | "c1" | "p1";
type CornerKey = "tl" | "tr" | "bl" | "br";
type XY = { x: number; y: number };
type Rests = Record<PointKey, XY>;
type Size = { w: number; h: number };

const POINT_KEYS: readonly PointKey[] = ["p0", "c0", "c1", "p1"];
const CORNER_KEYS: readonly CornerKey[] = ["tl", "tr", "bl", "br"];

/** Figma shows diagonal resize cursors on selection corners. */
const CORNER_CURSOR: Record<CornerKey, string> = {
  tl: "cursor-nwse-resize",
  br: "cursor-nwse-resize",
  tr: "cursor-nesw-resize",
  bl: "cursor-nesw-resize",
};

/**
 * Resting layout — a compact selected object parked in the hero's empty
 * left margin (owner feedback: the stroke must not cross the headline).
 * The box is ~min(19% of hero width, 272px) wide with a 0.66 aspect,
 * left edge at 2% of the hero, vertically centered inside the 28–58%
 * band. The same S-curve as before is normalized into that box, so the
 * live bbox (selection frame) equals the box exactly. Measured clear of
 * the headline glyphs at 1024/1280/1440: leftmost glyph sits at ≥234px
 * (section-local, 1024) while the frame's right edge + 4px handle stays
 * ≤220px; clearance only grows with the viewport.
 */
function restsFor(w: number, h: number): Rests {
  const r = (v: number) => Math.round(v);
  const bw = Math.min(0.19 * w, 272);
  const bh = Math.min(0.66 * bw, 0.3 * h);
  const x0 = 0.02 * w;
  const y0 = 0.28 * h + (0.3 * h - bh) / 2;
  // Original S-curve shape, normalized to a 0..1 box: p0 and p1 are the
  // horizontal extremes, c1 the top, c0 the bottom — bbox == box.
  return {
    p0: { x: r(x0), y: r(y0 + 0.214 * bh) },
    c0: { x: r(x0 + 0.28 * bw), y: r(y0 + bh) },
    c1: { x: r(x0 + 0.676 * bw), y: r(y0) },
    p1: { x: r(x0 + bw), y: r(y0 + 0.738 * bh) },
  };
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** Half-pixel snap so the 1.5px frame stroke renders crisp. */
const snapHalf = (v: number) => Math.round(v - 0.5) + 0.5;

// matchMedia store for pointer-fine gating (server snapshot: coarse).
function subscribeFine(onChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getFine = () => window.matchMedia("(pointer: fine)").matches;
const getFineServer = () => false;

export default function PenToolCurve() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const interactive = fine && !reduced;

  const wrapRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [active, setActive] = useState<CornerKey | null>(null);

  // One motion value per coordinate. While held, jump() tracks the pointer
  // 1:1 (and kills any in-flight animation on that coordinate); on release,
  // explicit animate(value, home, SETTLE) drives the slow spring settle.
  // Driving the settle with animate() rather than a follower spring keeps
  // it deterministic — a jump can never detach a follower mid-flight. All
  // drag math lives on these motion values; no state updates on pointermove.
  const p0x = useMotionValue(0);
  const p0y = useMotionValue(0);
  const c0x = useMotionValue(0);
  const c0y = useMotionValue(0);
  const c1x = useMotionValue(0);
  const c1y = useMotionValue(0);
  const p1x = useMotionValue(0);
  const p1y = useMotionValue(0);

  type Coord = { x: MotionValue<number>; y: MotionValue<number> };
  const points = useMemo<Record<PointKey, Coord>>(
    () => ({
      p0: { x: p0x, y: p0y },
      c0: { x: c0x, y: c0y },
      c1: { x: c1x, y: c1y },
      p1: { x: p1x, y: p1y },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- all stable motion values
    [],
  );

  // Path "d" recomputed from the springs.
  const d = useTransform(
    [p0x, p0y, c0x, c0y, c1x, c1y, p1x, p1y],
    ([ax, ay, bx, by, cx, cy, ex, ey]: number[]) =>
      `M ${ax} ${ay} C ${bx} ${by}, ${cx} ${cy}, ${ex} ${ey}`,
  );

  // Live bounding box of the four points — the selection frame hugs these,
  // stretching as any point moves. Snapped to half-pixels for crispness.
  const minX = useTransform([p0x, c0x, c1x, p1x], (v: number[]) =>
    snapHalf(Math.min(...v)),
  );
  const maxX = useTransform([p0x, c0x, c1x, p1x], (v: number[]) =>
    snapHalf(Math.max(...v)),
  );
  const minY = useTransform([p0y, c0y, c1y, p1y], (v: number[]) =>
    snapHalf(Math.min(...v)),
  );
  const maxY = useTransform([p0y, c0y, c1y, p1y], (v: number[]) =>
    snapHalf(Math.max(...v)),
  );

  // Frame outline as a path "d" (M/H/V/Z) — same proven motion-value →
  // attribute pipeline as the curve itself.
  const frameD = useTransform(
    [minX, minY, maxX, maxY],
    ([x0, y0, x1, y1]: number[]) => `M ${x0} ${y0} H ${x1} V ${y1} H ${x0} Z`,
  );

  // Corner handle squares are positioned by their top-left corner.
  const hMinX = useTransform(minX, (v) => v - HANDLE / 2);
  const hMaxX = useTransform(maxX, (v) => v - HANDLE / 2);
  const hMinY = useTransform(minY, (v) => v - HANDLE / 2);
  const hMaxY = useTransform(maxY, (v) => v - HANDLE / 2);

  const cornerX: Record<CornerKey, MotionValue<number>> = {
    tl: minX,
    tr: maxX,
    bl: minX,
    br: maxX,
  };
  const cornerY: Record<CornerKey, MotionValue<number>> = {
    tl: minY,
    tr: minY,
    bl: maxY,
    br: maxY,
  };
  const handleX: Record<CornerKey, MotionValue<number>> = {
    tl: hMinX,
    tr: hMaxX,
    bl: hMinX,
    br: hMaxX,
  };
  const handleY: Record<CornerKey, MotionValue<number>> = {
    tl: hMinY,
    tr: hMinY,
    bl: hMaxY,
    br: hMaxY,
  };

  const rests = useMemo(() => (size ? restsFor(size.w, size.h) : null), [size]);

  // Corner → bezier point, bound ONCE from the rest shape: each point is
  // assigned to its nearest rest-bbox corner. The rest S-curve yields four
  // distinct assignments (tl→p0, tr→c1, bl→c0, br→p1) at any aspect ratio
  // the fractions produce; the fallback guards the degenerate case anyway.
  const binding = useMemo<Record<CornerKey, PointKey>>(() => {
    const fallback: Record<CornerKey, PointKey> = {
      tl: "p0",
      tr: "c1",
      bl: "c0",
      br: "p1",
    };
    if (!rests) return fallback;
    const xs = POINT_KEYS.map((k) => rests[k].x);
    const ys = POINT_KEYS.map((k) => rests[k].y);
    const corner: Record<CornerKey, XY> = {
      tl: { x: Math.min(...xs), y: Math.min(...ys) },
      tr: { x: Math.max(...xs), y: Math.min(...ys) },
      bl: { x: Math.min(...xs), y: Math.max(...ys) },
      br: { x: Math.max(...xs), y: Math.max(...ys) },
    };
    const assigned: Partial<Record<CornerKey, PointKey>> = {};
    for (const p of POINT_KEYS) {
      let best: CornerKey = "tl";
      let bestD = Infinity;
      for (const c of CORNER_KEYS) {
        const dist = Math.hypot(
          rests[p].x - corner[c].x,
          rests[p].y - corner[c].y,
        );
        if (dist < bestD) {
          bestD = dist;
          best = c;
        }
      }
      assigned[best] = p;
    }
    return CORNER_KEYS.every((c) => assigned[c])
      ? (assigned as Record<CornerKey, PointKey>)
      : fallback;
  }, [rests]);

  const sizeRef = useRef<Size | null>(null);
  const restsRef = useRef<Rests | null>(null);

  // Drag session — refs only, so pointermove never touches React state.
  const dragRef = useRef<{
    key: PointKey;
    pointerId: number;
    start: XY; // pointer position at grab, in viewBox units
    origin: XY; // bound bezier point at grab
  } | null>(null);

  // Measure the hero-filling wrapper; viewBox tracks its pixel size.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const apply = (w: number, h: number) => {
      if (w < 1 || h < 1) return;
      const next = { w: Math.round(w), h: Math.round(h) };
      if (
        sizeRef.current &&
        sizeRef.current.w === next.w &&
        sizeRef.current.h === next.h
      ) {
        return;
      }
      sizeRef.current = next;
      setSize(next);
    };
    const rect = node.getBoundingClientRect();
    apply(rect.width, rect.height);
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) apply(r.width, r.height);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // Seat the points at their resting spots whenever layout changes
  // (instant — a resize shouldn't animate; jump also cancels any settle
  // still in flight). Skipped mid-drag; the release then targets the
  // fresh rests.
  useEffect(() => {
    restsRef.current = rests;
    if (!rests || dragRef.current) return;
    for (const k of POINT_KEYS) {
      points[k].x.jump(rests[k].x);
      points[k].y.jump(rests[k].y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- points are stable
  }, [rests]);

  /** Screen px → viewBox units via the hit svg's CTM (re-read per event, so
   *  scroll/resize mid-drag can't skew the mapping). */
  const toLocal = (e: { clientX: number; clientY: number }): XY | null => {
    const ctm = hitRef.current?.getScreenCTM();
    if (!ctm) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  const startDrag =
    (corner: CornerKey) => (e: ReactPointerEvent<SVGCircleElement>) => {
      if (dragRef.current) return;
      const local = toLocal(e);
      if (!local) return;
      e.preventDefault();
      try {
        // Capture so fast drags don't slip off the 14px hit circle.
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // NotFoundError if the pointer is already gone — drag still works
        // while the cursor stays over the circle.
      }
      const key = binding[corner];
      dragRef.current = {
        key,
        pointerId: e.pointerId,
        start: local,
        origin: { x: points[key].x.get(), y: points[key].y.get() },
      };
      setActive(corner);
    };

  const moveDrag = (e: ReactPointerEvent<SVGCircleElement>) => {
    const drag = dragRef.current;
    const s = sizeRef.current;
    if (!drag || !s || e.pointerId !== drag.pointerId) return;
    const local = toLocal(e);
    if (!local) return;
    const dx = local.x - drag.start.x;
    const dy = local.y - drag.start.y;
    points[drag.key].x.jump(clamp(drag.origin.x + dx, EDGE, s.w - EDGE));
    points[drag.key].y.jump(clamp(drag.origin.y + dy, EDGE, s.h - EDGE));
  };

  const endDrag = (e: ReactPointerEvent<SVGCircleElement>) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    setActive(null);
    const home = restsRef.current;
    if (!home) return;
    for (const k of POINT_KEYS) {
      // Explicit spring back to rest — the slow, satisfying settle.
      animate(points[k].x, home[k].x, SETTLE);
      animate(points[k].y, home[k].y, SETTLE);
    }
  };

  const viewBox = size ? `0 0 ${size.w} ${size.h}` : undefined;

  // Static fallback — touch devices and reduced motion get the bare path:
  // no selection frame, no handles.
  if (!interactive) {
    return (
      <div
        ref={wrapRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {size && rests && (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Violet → cyan across the compact object's rest span, not
                  the whole hero — the parked shape keeps the full ramp. */}
              <linearGradient
                id={GRADIENT_ID}
                gradientUnits="userSpaceOnUse"
                x1={rests.p0.x}
                y1="0"
                x2={rests.p1.x}
                y2="0"
              >
                <stop offset="0" stopColor={ACCENT_HEX.violet} />
                <stop offset="1" stopColor={ACCENT_HEX.cyan} />
              </linearGradient>
            </defs>
            <path
              d={`M ${rests.p0.x} ${rests.p0.y} C ${rests.c0.x} ${rests.c0.y}, ${rests.c1.x} ${rests.c1.y}, ${rests.p1.x} ${rests.p1.y}`}
              fill="none"
              stroke={`url(#${GRADIENT_ID})`}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.55}
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {size && rests && (
        <>
          {/* Visual layer — below the headline (DOM order), above .line-grid. */}
          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <defs>
              {/* Violet → cyan across the compact object's rest span, not
                  the whole hero — the parked shape keeps the full ramp. */}
              <linearGradient
                id={GRADIENT_ID}
                gradientUnits="userSpaceOnUse"
                x1={rests.p0.x}
                y1="0"
                x2={rests.p1.x}
                y2="0"
              >
                <stop offset="0" stopColor={ACCENT_HEX.violet} />
                <stop offset="1" stopColor={ACCENT_HEX.cyan} />
              </linearGradient>
            </defs>

            <motion.path
              d={d}
              fill="none"
              stroke={`url(#${GRADIENT_ID})`}
              strokeWidth={2}
              strokeLinecap="round"
              animate={{ opacity: active ? 0.85 : 0.55 }}
              transition={{ duration: 0.25 }}
            />

            {/* Selection frame — hugs the live bbox, brightens while held. */}
            <motion.path
              d={frameD}
              fill="none"
              stroke={CHROME}
              strokeWidth={1.5}
              initial={false}
              animate={{ strokeOpacity: active ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
            />

            {/* Corner handles — 8px white squares, blue stroke; the grabbed
                corner fills blue, exactly like Figma's selection chrome. */}
            {CORNER_KEYS.map((c) => (
              <motion.rect
                key={c}
                x={handleX[c]}
                y={handleY[c]}
                width={HANDLE}
                height={HANDLE}
                fill={active === c ? CHROME : "#ffffff"}
                stroke={CHROME}
                strokeWidth={1.5}
              />
            ))}
          </motion.svg>

          {/* Hit layer — z-10 lifts the grab circles above the transparent
              .shell box. Everything here is invisible; the circles ride the
              bbox corners, which rest on the compact box in the hero's
              empty left margin, so no real content sits underneath. Not
              focusable — this is a decorative toy, no tab stops. */}
          <svg
            ref={hitRef}
            className="absolute inset-0 z-10 h-full w-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
          >
            {CORNER_KEYS.map((c) => (
              <motion.circle
                key={c}
                cx={cornerX[c]}
                cy={cornerY[c]}
                r={HIT_R}
                fill="transparent"
                className={`pointer-events-auto touch-none ${CORNER_CURSOR[c]}`}
                onPointerDown={startDrag(c)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
              />
            ))}
          </svg>
        </>
      )}
    </div>
  );
}
