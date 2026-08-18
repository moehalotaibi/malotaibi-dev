"use client";

// Compact typing test — lives in the hero's bottom-left corner like a small
// canvas object. Cat peeks over the input, paws slap per keystroke, TAB
// cycles sentences. Timer runs on a motion value (no re-renders per frame).

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { site } from "@/lib/content";

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  site.bio, // "Creating with code. Small details matter."
  "ui/ux designer, visual design and ux research.",
];

/** Cream cat peeking over the input's top edge; paws slap while typing. */
function PeekingCat({ reduced }: { reduced: boolean }) {
  const left = useAnimationControls();
  const right = useAnimationControls();
  const flip = useRef(false);

  const slap = useCallback(() => {
    if (reduced) return;
    flip.current = !flip.current;
    void (flip.current ? left : right).start({
      y: [0, 5, 0],
      transition: { duration: 0.12, ease: "easeOut" },
    });
  }, [left, right, reduced]);

  useEffect(() => {
    const handler = () => slap();
    window.addEventListener("typetest:key", handler);
    return () => window.removeEventListener("typetest:key", handler);
  }, [slap]);

  return (
    <div
      className="pointer-events-none absolute -top-[34px] -right-1 h-[38px] w-[72px]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 52" className="h-full w-full">
        <path d="M22 18 L28 2 L38 14 Z" fill="#f2efe1" />
        <path d="M74 18 L68 2 L58 14 Z" fill="#f2efe1" />
        <path d="M25 15 L28 7 L33 13 Z" fill="#f4b8c4" />
        <path d="M71 15 L68 7 L63 13 Z" fill="#f4b8c4" />
        <ellipse cx="48" cy="34" rx="34" ry="26" fill="#f2efe1" />
        <path d="M34 30 q4 4 8 0" stroke="#111210" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M54 30 q4 4 8 0" stroke="#111210" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M45 38 q3 3 6 0" stroke="#111210" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="37" r="3.5" fill="#f4b8c4" opacity="0.8" />
        <circle cx="68" cy="37" r="3.5" fill="#f4b8c4" opacity="0.8" />
      </svg>
      <motion.span
        animate={left}
        className="absolute -bottom-1 left-2.5 h-2.5 w-4 rounded-b-full bg-[#f2efe1]"
      />
      <motion.span
        animate={right}
        className="absolute -bottom-1 right-2.5 h-2.5 w-4 rounded-b-full bg-[#f2efe1]"
      />
    </div>
  );
}

type Result = { seconds: number; wpm: number; accuracy: number };

export default function TypeTest() {
  const reduced = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number | null>(null);
  const lastKeyRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);
  const errorsRef = useRef(0);
  const rafRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const elapsed = useMotionValue(0);
  const clock = useTransform(elapsed, (v) => v.toFixed(3));

  const target = SENTENCES[idx % SENTENCES.length];

  const stopClock = useCallback(() => cancelAnimationFrame(rafRef.current), []);

  const tick = useCallback(
    function loop() {
      if (startRef.current === null) return;
      const now = performance.now();
      // Idle for 3s → freeze the clock until the next keystroke.
      if (now - lastKeyRef.current > 3000) {
        pausedAtRef.current = now;
        setPaused(true);
        return;
      }
      elapsed.set((now - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(loop);
    },
    [elapsed],
  );

  useEffect(() => stopClock, [stopClock]);

  const restart = useCallback(() => {
    stopClock();
    startRef.current = null;
    pausedAtRef.current = null;
    errorsRef.current = 0;
    elapsed.set(0);
    setTyped("");
    setResult(null);
    setPaused(false);
    setIdx((i) => i + 1);
    inputRef.current?.focus();
  }, [elapsed, stopClock]);

  const onChange = (value: string) => {
    if (result) return;
    const now = performance.now();
    lastKeyRef.current = now;
    if (startRef.current === null && value.length > 0) {
      startRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    } else if (pausedAtRef.current !== null) {
      // Resume: shift the start so the frozen stretch doesn't count twice.
      startRef.current! += now - pausedAtRef.current;
      pausedAtRef.current = null;
      setPaused(false);
      rafRef.current = requestAnimationFrame(tick);
    }
    if (value.length > typed.length) {
      const i = value.length - 1;
      if (value[i] !== target[i]) errorsRef.current += 1;
      window.dispatchEvent(new Event("typetest:key"));
    }
    setTyped(value);

    if (value === target) {
      stopClock();
      const seconds = (performance.now() - (startRef.current ?? performance.now())) / 1000;
      elapsed.set(seconds);
      const wpm = Math.round(target.length / 5 / (seconds / 60));
      const accuracy = Math.max(
        0,
        Math.round((1 - errorsRef.current / target.length) * 100),
      );
      setResult({ seconds, wpm, accuracy });
      startRef.current = null;
    }
  };

  return (
    <div
      className="card w-[19.5rem] p-4"
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          restart();
        }
      }}
    >
      {/* Sentence with per-character state */}
      <p className="font-sans text-micro font-medium normal-case leading-relaxed tracking-normal" aria-hidden="true">
        {target.split("").map((ch, i) => {
          const state =
            i < typed.length
              ? typed[i] === ch
                ? "text-paper"
                : "text-accent-pink underline decoration-accent-pink/60"
              : "text-paper-dim";
          return (
            <span key={i} className={state}>
              {ch}
            </span>
          );
        })}
      </p>

      {/* Input with the cat peeking over it */}
      <div className="relative mt-4">
        <PeekingCat reduced={reduced} />
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={(e) => onChange(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          disabled={result !== null}
          aria-label={`Typing test. Type the sentence: ${target}`}
          placeholder="Start typing here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="relative w-full rounded-lg border border-rule bg-raised px-3 py-2 font-sans text-meta text-paper placeholder:text-paper-dim disabled:opacity-60"
        />
      </div>

      {/* Footer: restart hint + clock / result */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={restart}
          className="group flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper-mid transition-colors hover:text-paper"
        >
          <kbd className="rounded border border-rule-strong bg-raised px-1.5 py-0.5 font-mono text-[0.625rem] text-paper transition-colors group-hover:border-paper">
            TAB
          </kbd>
          <span>- restart</span>
        </button>

        {result ? (
          <p className="font-mono text-[0.6875rem] tabular-nums" aria-live="polite">
            <span className="text-accent-green">{result.seconds.toFixed(2)}s</span>
            <span className="text-paper-dim">{" · "}</span>
            <span className="text-accent-violet">{result.wpm}wpm</span>
            <span className="text-paper-dim">{" · "}</span>
            <span className="text-accent-cyan">{result.accuracy}%</span>
          </p>
        ) : paused ? (
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-amber">
            paused — keep typing
          </span>
        ) : (
          <motion.span className="font-mono text-[0.6875rem] tabular-nums text-paper-mid">
            {clock}
          </motion.span>
        )}
      </div>
    </div>
  );
}
