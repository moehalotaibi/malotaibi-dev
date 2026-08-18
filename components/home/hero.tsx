"use client";

// Home hero — per-char headline reveal, mouse-parallax annotation layer,
// magnetic chips. On pointer-fine, motion-full devices the six floating
// annotations are physics toys: grab one, throw it, it carries momentum,
// bounces off the hero's edges, and springs back home once the bounce
// settles. Figma-file extras: hovering the h1 reveals pink measurement
// redlines between the headline lines (HeadlineRedlines), and a faint
// highlight snaps to the 88px canvas grid cell under the pointer
// (GridCellHighlight). A Figma-style color-styles panel parked in the
// right margin (ColorStylesPanel) re-themes the headline + tagline accents
// — real buttons, throwable card, theme state lives here (heroAccent).
// Copy and classes are unchanged from the server
// version; only motion was added. Static under reduced motion and on
// touch (primitives handle their own gating; local hover/drag props are
// gated here).

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import StaggerText from "@/components/motion/stagger-text";
import Magnetic from "@/components/motion/magnetic";
import { MouseParallax } from "@/components/motion/parallax";
import { CursorArrow } from "@/components/icons";
import PenToolCurve from "@/components/home/pen-tool-curve";
import HeadlineRedlines from "@/components/home/headline-redlines";
import GridCellHighlight from "@/components/home/grid-cell-highlight";
import ColorStylesPanel from "@/components/home/color-styles-panel";
import TypeTest from "@/components/home/type-test";
import ClickMe from "@/components/home/click-me";
import { ACCENT_HEX, accentBg, accentText, gradientText } from "@/lib/accents";
import { hero, type Accent } from "@/lib/content";
import { MotionLink, SPRING, WIGGLE, WIGGLE_TRANSITION } from "./motion-kit";

/** Figma-style name tag — accent background, white text, fully rounded. */
const tagPill = (accent: Accent) =>
  `rounded-full px-3.5 py-1 font-sans text-[0.8125rem] font-medium text-white ${accentBg[accent]}`;

/** Bordered chip shared by the greeting and the "Let's Connect" status. */
const CHIP =
  "flex items-center gap-2.5 rounded-full border border-rule-strong bg-ink/70 px-5 py-3 font-sans text-[0.9375rem] font-medium text-cream backdrop-blur-sm";

// matchMedia store for pointer-fine gating (server snapshot: coarse) —
// same pattern as pen-tool-curve.
function subscribeFine(onChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getFine = () => window.matchMedia("(pointer: fine)").matches;
const getFineServer = () => false;

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
  /** The hero <section> — drag constraints, i.e. the bounce walls. */
  constraintsRef: RefObject<HTMLElement | null>;
  /** Fires once per real drag, after the pointer actually moves (not taps). */
  onGrab?: () => void;
  /** Capture-phase click hook — the link chip vetoes post-drag clicks. */
  onClickCapture?: MouseEventHandler<HTMLDivElement>;
  /** Fires when a throw's bounce animation fully settles. */
  onSettle?: () => void;
  children: ReactNode;
};

/**
 * Grabbable physics wrapper for one floating annotation. All drag math
 * lives on motion values (no state on pointermove); a released throw keeps
 * its momentum and bounces off the hero's edges (dragConstraints +
 * elastic), and once the bounce settles the piece springs back home to
 * (0, 0). The isDragging ref guards the settle callback: if the visitor
 * grabbed the piece again mid-settle, it must not be yanked home.
 */
function Throwable({
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

export default function HomeHero() {
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const throwable = fine && !reduced;

  const heroRef = useRef<HTMLElement>(null);

  // Measurement anchors for the Figma-file micro-interactions: the h1
  // (headline redlines), the headline block and tagline (the grid-cell
  // highlight hides while the pointer is over either).
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const headlineBlockRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // "Let's Connect" is draggable AND a link: a real drag sets this flag so
  // the click fired on release is vetoed; a clean click still navigates.
  const chipDragged = useRef(false);

  // The color-styles panel is draggable AND full of buttons — same
  // drag-vs-click disambiguation as the chip, one flag for the whole card.
  const panelDragged = useRef(false);

  // Hero theme picked from the color-styles panel. null = the default
  // per-line accents from content. Gradient text can't transition its
  // background-image, so accent changes run a brief opacity dip on the h1
  // (crossfade); solid colors also CSS-transition over ~300ms.
  const [heroAccent, setHeroAccent] = useState<Accent | null>(null);
  const prevAccent = useRef<Accent | null>(null);
  useEffect(() => {
    if (prevAccent.current === heroAccent) return;
    prevAccent.current = heroAccent;
    const h1 = h1Ref.current;
    if (reduced || !h1) return; // reduced motion: colors just swap
    const dip = animate(
      h1,
      { opacity: [1, 0.35, 1] },
      { duration: 0.25, ease: "easeInOut" },
    );
    return () => dip.stop();
  }, [heroAccent, reduced]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pb-section pt-20 md:pt-28"
    >
      <div className="line-grid dot-fade absolute inset-0" aria-hidden="true" />

      {/* Grid-cell highlight — snaps to the 88px canvas cell under the
          pointer, above the grid backdrop, below all real content. */}
      <GridCellHighlight
        sectionRef={heroRef}
        headlineRef={headlineBlockRef}
        taglineRef={taglineRef}
      />

      {/* Draggable pen-tool bezier — a compact selected shape parked in the
          hero's empty left margin, above the line grid. Its grab circles
          ride on their own z-10 hit layer. */}
      <PenToolCurve />

      <div className="shell relative text-center">
        <MotionReveal>
          <div className="inline-flex items-center gap-3">
            <motion.span
              className="grid h-11 w-11 place-items-center rounded-full border border-rule-strong bg-raised font-mono text-meta"
              whileHover={reduced ? undefined : { ...WIGGLE, scale: 1.06 }}
              transition={WIGGLE_TRANSITION}
            >
              m.
            </motion.span>
            <Magnetic strength={0.2}>
              <span className={CHIP}>{hero.greeting}</span>
            </Magnetic>
          </div>
        </MotionReveal>

        {/* Headline block — annotations anchor to this, not the viewport. */}
        <div ref={headlineBlockRef} className="relative mx-auto w-fit">
          <h1 ref={h1Ref} className="mt-6 font-display text-hero font-extrabold uppercase">
            {hero.lines.map((line, i) => {
              // Panel theme override — accent lines take the picked color;
              // the cream line stays cream. Gradient lines keep their
              // bg-clip-text class (clip + transparent color) and only the
              // background-image is swapped inline; solid lines get an
              // inline color over their accentText class.
              const themed = heroAccent !== null && line.accent !== "cream";
              const hex = heroAccent ? ACCENT_HEX[heroAccent] : "";
              const themedStyle: CSSProperties | undefined = !themed
                ? undefined
                : line.gradient
                  ? {
                      backgroundImage: `linear-gradient(100deg, color-mix(in srgb, ${hex} 45%, white) 0%, ${hex} 100%)`,
                    }
                  : { color: hex };
              return (
                <span
                  key={line.text}
                  className={`block transition-colors duration-300 ${
                    (line.gradient && gradientText[line.accent]) ||
                    accentText[line.accent]
                  }`}
                  style={themedStyle}
                >
                  <StaggerText
                    text={line.text}
                    per="char"
                    delay={0.12 + i * 0.18}
                  />
                </span>
              );
            })}
          </h1>

          {/* Figma measurement redlines between the headline lines — fade
              in while the h1 is hovered. This wrapper's box coincides with
              the h1 box (collapsed top margin), so inset-0 overlays it. */}
          <HeadlineRedlines h1Ref={h1Ref} />

          {/* Floating annotations — hug the headline, decorative, lg+ only,
              drifting opposite the pointer. On pointer-fine devices each one
              is a Throwable toy (its wrapper is the explicit hit area inside
              this otherwise inert layer). The "status" chip is rendered
              separately below: it's a real link, so it can't live inside
              this aria-hidden layer. */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <MouseParallax className="absolute inset-0" strength={10}>
              {hero.annotations.map((a, i) =>
                a.kind === "status" ? null : (
                  <MotionReveal
                    key={`${a.kind}-${a.text}`}
                    delay={200 + i * 60}
                    className={`absolute hidden lg:block ${a.className}`}
                  >
                    <Throwable enabled={throwable} constraintsRef={heroRef}>
                      {a.kind === "comment" ? (
                        <span className="block font-sans text-[0.8125rem] font-medium leading-snug text-paper">
                          {a.text}
                        </span>
                      ) : (
                        /* Cursor cluster — mirrored Figma cursor with the name
                           tag hanging below-left, drifting in a slow circle.
                           The orbit stays on this inner span, so it keeps
                           circling even while the cluster is carried. */
                        <span
                          className="orbit flex flex-col items-start gap-0.5 whitespace-nowrap"
                          style={
                            {
                              "--orbit-t": `${8 + i * 1.5}s`,
                              "--orbit-r": `${7 + (i % 3) * 2}px`,
                            } as CSSProperties
                          }
                        >
                          <CursorArrow
                            className={`h-7 w-7 ${accentText[a.accent ?? "cream"]}`}
                          />
                          {/* Label hangs below-right of the cursor tip, like
                              Figma. pointer-events-auto so it can pop on hover
                              inside the inert layer. */}
                          <motion.span
                            className={`pointer-events-auto ml-4 ${tagPill(a.accent ?? "cream")}`}
                            whileHover={
                              reduced ? undefined : { scale: 1.1, rotate: 4 }
                            }
                            transition={SPRING}
                          >
                            {a.text}
                          </motion.span>
                        </span>
                      )}
                    </Throwable>
                  </MotionReveal>
                ),
              )}
            </MouseParallax>
          </div>

          {/* "Let's Connect" — interactive, so it lives outside the
              decorative layer: a link to /contact with a pulsing dot. It is
              also a Throwable, so a capture-phase handler swallows the click
              that follows a real drag; a clean click still navigates. */}
          {hero.annotations
            .filter((a) => a.kind === "status")
            .map((a) => (
              <MotionReveal
                key={a.text}
                delay={320}
                className={`absolute hidden lg:block ${a.className}`}
              >
                <Throwable
                  enabled={throwable}
                  constraintsRef={heroRef}
                  onGrab={() => {
                    chipDragged.current = true;
                  }}
                  onSettle={() => {
                    // Safety net: a hard throw can release with the pointer
                    // off the chip (elastic lag), so no click ever fires to
                    // clear the flag. Once the bounce settles, forget it.
                    chipDragged.current = false;
                  }}
                  onClickCapture={(e) => {
                    if (!chipDragged.current) return;
                    e.preventDefault();
                    e.stopPropagation();
                    // Clear on the next tick — this drag's click has now
                    // been swallowed; the next clean click must navigate.
                    window.setTimeout(() => {
                      chipDragged.current = false;
                    }, 0);
                  }}
                >
                  <Magnetic strength={0.3}>
                    <MotionLink
                      href="/contact"
                      draggable={false}
                      className={`${CHIP} whitespace-nowrap transition-colors hover:border-paper`}
                      whileHover={reduced ? undefined : { scale: 1.03 }}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                      transition={SPRING}
                    >
                      <span
                        className="relative flex h-2.5 w-2.5"
                        aria-hidden="true"
                      >
                        <span
                          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${accentBg[a.accent ?? "green"]}`}
                        />
                        <span
                          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${accentBg[a.accent ?? "green"]}`}
                        />
                      </span>
                      {a.text}
                    </MotionLink>
                  </Magnetic>
                </Throwable>
              </MotionReveal>
            ))}
        </div>

        <MotionReveal delay={160}>
          <p
            ref={taglineRef}
            className="mx-auto mt-8 max-w-[42ch] text-lead font-medium text-paper"
          >
            {hero.tagline.map((seg, i) =>
              seg.accent ? (
                <motion.span
                  key={i}
                  className={`inline-block font-medium underline-offset-4 transition-colors duration-300 hover:underline ${accentText[seg.accent]}`}
                  // Panel theme: every accent word takes the picked color.
                  style={
                    heroAccent ? { color: ACCENT_HEX[heroAccent] } : undefined
                  }
                  whileHover={reduced ? undefined : { y: -2 }}
                  transition={SPRING}
                >
                  {seg.text}
                </motion.span>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </p>
        </MotionReveal>
      </div>

      {/* Color-styles panel — a real control (buttons re-theme the hero),
          parked in the empty right margin to mirror the pen-tool object on
          the left. Throwable like the annotations; the capture-phase click
          handler swallows the click that follows a real drag so a clean
          click on a swatch always lands. Hidden below lg, where the margin
          doesn't exist. */}
      {/* top: at lg (1024–1279) the "Let's Connect" chip pokes to ~x823 and
          the panel starts at ~x813, so the panel drops to the bottom of the
          30–58% band, below the chip (measured clear at 1024); from xl the
          margin is wide enough to sit at 34%, mirroring the curve's band. */}
      <div
        data-hero-panel
        className="absolute right-[2%] top-[58%] z-10 hidden lg:block xl:right-[4%] xl:top-[34%]"
      >
        <MotionReveal delay={380}>
          <Throwable
            enabled={throwable}
            constraintsRef={heroRef}
            onGrab={() => {
              panelDragged.current = true;
            }}
            onSettle={() => {
              // Same safety net as the chip: a hard throw can release with
              // the pointer off the card, so no click ever clears the flag.
              panelDragged.current = false;
            }}
            onClickCapture={(e) => {
              if (!panelDragged.current) return;
              e.preventDefault();
              e.stopPropagation();
              window.setTimeout(() => {
                panelDragged.current = false;
              }, 0);
            }}
          >
            <ColorStylesPanel
              active={heroAccent}
              onPick={setHeroAccent}
              onReset={() => setHeroAccent(null)}
            />
          </Throwable>
        </MotionReveal>
      </div>

      {/* Bottom-left: compact typing test (contains an input — not throwable). */}
      <div className="absolute bottom-6 left-[3%] z-10 hidden lg:block">
        <MotionReveal delay={440}>
          <TypeTest />
        </MotionReveal>
      </div>

      {/* Bottom-right: the "click me" microinteraction toy. */}
      <div className="absolute bottom-8 right-[4%] z-10 hidden lg:block">
        <MotionReveal delay={500}>
          <ClickMe />
        </MotionReveal>
      </div>
    </section>
  );
}
