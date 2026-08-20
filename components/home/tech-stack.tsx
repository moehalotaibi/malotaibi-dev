"use client";

// Tech stack — blurb + a grabbable left-to-right marquee of full-color
// brand logos. The track is driven by a motion value instead of a CSS
// animation: an unwrapped offset lives in a ref and the rendered x is
// wrapped into [-half, 0) (half = one IconRun copy) so the two copies
// loop seamlessly, same visual range as the old keyframes. Idle drift
// covers half the track per ~34s, paused on hover (pointer-fine only).
// Grab anywhere on the band to scrub 1:1 — x is set synchronously in
// pointermove, not on the next frame — and release flings with the
// smoothed pointer velocity, which decays exponentially back to the
// lazy drift. touch-action: pan-y keeps vertical page scroll working
// over the band on touch. Reduced motion: no drift, flings decay to a
// stop, dragging still works (user-initiated). Each logo keeps its
// shadcn tooltip and hover scale.

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Segments from "@/components/segments";
import { Brand } from "@/components/icons";
import { techStack } from "@/lib/content";
import { SPRING } from "./motion-kit";

// Half the track drifts by in this many seconds (the old --marquee-t).
const DRIFT_SECONDS = 34;
// Fling decay time constant (s) and the snap-to-drift threshold (px/s).
const DECAY_TAU = 0.75;
const SNAP_VELOCITY = 20;
// Pointer flings are capped to something sane (px/s).
const MAX_VELOCITY = 4000;

// matchMedia store for pointer-fine gating (server snapshot: coarse) —
// same pattern as headline-redlines.
function subscribeFine(onChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getFine = () => window.matchMedia("(pointer: fine)").matches;
const getFineServer = () => false;

/** Wrap an unwrapped offset into the seamless-loop range [-half, 0). */
const wrap = (offset: number, half: number) =>
  half > 0 ? ((offset % half) + half) % half - half : 0;

const clampVelocity = (v: number) =>
  Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, v));

function IconRun({ decorative = false }: { decorative?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div
      className="flex items-center"
      aria-hidden={decorative ? "true" : undefined}
    >
      {techStack.icons.map((item) => (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild>
            <motion.span
              role={decorative ? undefined : "img"}
              aria-label={decorative ? undefined : item.title}
              className="grid h-16 w-20 shrink-0 place-items-center"
              whileHover={reduced ? undefined : { scale: 1.2, y: -3 }}
              transition={SPRING}
            >
              {item.img ? (
                // Official colored logo (self-hosted devicon SVG)
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.img}
                  alt=""
                  draggable={false}
                  className="h-10 w-10 object-contain"
                />
              ) : item.brand ? (
                // Pure-black brands: monochrome glyph, lightened to cream
                <Brand slug={item.brand} colored className="h-10 w-10" />
              ) : null}
            </motion.span>
          </TooltipTrigger>
          <TooltipContent>{item.title}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

function Marquee() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);

  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const offsetRef = useRef(0); // unwrapped px offset
  const halfRef = useRef(0); // one IconRun copy's width
  const velocityRef = useRef(0); // px/s; smoothed estimate while dragging
  const draggingRef = useRef(false);
  const hoverRef = useRef(false);
  const lastRef = useRef({ x: 0, t: 0 });
  const [grabbing, setGrabbing] = useState(false);

  // Measure half = scrollWidth / 2 (two copies); re-measure when logos
  // load or the layout resizes. Never affects server output — x starts 0.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
      offsetRef.current = wrap(offsetRef.current, halfRef.current);
      x.set(offsetRef.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [x]);

  // Idle drift + fling decay. Velocity eases toward the target drift
  // (0 while hovered on pointer-fine, or under reduced motion) with a
  // ~750ms time constant, snapping once it's within SNAP_VELOCITY.
  useAnimationFrame((_, delta) => {
    const half = halfRef.current;
    if (half <= 0 || draggingRef.current) return;
    const dt = Math.min(delta, 100) / 1000; // clamp tab-switch jumps
    if (dt <= 0) return;

    const base = reduced ? 0 : half / DRIFT_SECONDS;
    const target = fine && hoverRef.current ? 0 : base;
    let v = velocityRef.current;
    v += (target - v) * (1 - Math.exp(-dt / DECAY_TAU));
    if (Math.abs(v - target) < SNAP_VELOCITY) v = target;
    velocityRef.current = v;

    if (v !== 0) {
      offsetRef.current = wrap(offsetRef.current + v * dt, half);
      x.set(offsetRef.current);
    }
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault(); // no image-drag ghosting / text selection
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setGrabbing(true);
    velocityRef.current = 0;
    lastRef.current = { x: e.clientX, t: e.timeStamp };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastRef.current.x;
    const dt = (e.timeStamp - lastRef.current.t) / 1000;
    lastRef.current = { x: e.clientX, t: e.timeStamp };

    // 1:1 scrub — x.set alone paints on the next frame, so also write the
    // style directly: the track must follow the pointer inside this very
    // handler, even when rAF is throttled. Motion's own render then writes
    // the same value, so nothing fights.
    offsetRef.current = wrap(offsetRef.current + dx, halfRef.current);
    x.set(offsetRef.current);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }

    if (dt > 0) {
      velocityRef.current = clampVelocity(
        0.8 * velocityRef.current + 0.2 * (dx / dt),
      );
    }
  };

  const endDrag = (cancelled: boolean) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setGrabbing(false);
    // Keep the fling velocity; the rAF loop decays it back to the drift.
    // A cancel (browser took the gesture, e.g. pan-y scroll) flings nothing.
    if (cancelled) velocityRef.current = 0;
  };

  return (
    <div
      className={`marquee mt-10 select-none ${
        grabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => endDrag(false)}
      onPointerCancel={() => endDrag(true)}
      onPointerEnter={() => (hoverRef.current = true)}
      onPointerLeave={() => (hoverRef.current = false)}
    >
      <motion.div ref={trackRef} className="marquee-track" style={{ x }}>
        <IconRun />
        <IconRun decorative />
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      className="shell pb-section text-center"
      aria-labelledby="tech-stack"
    >
      <MotionReveal>
        <h2 id="tech-stack" className="label">
          My tech stack.
        </h2>
      </MotionReveal>
      <MotionReveal delay={80}>
        <p className="mx-auto mt-6 max-w-[52ch] text-lead text-paper-mid">
          <Segments segments={techStack.blurb} />
        </p>
      </MotionReveal>

      <MotionReveal delay={160}>
        <Marquee />
      </MotionReveal>
    </section>
  );
}
