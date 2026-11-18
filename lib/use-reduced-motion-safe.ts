"use client";

// Hydration-safe replacement for `useReducedMotion` from "motion/react".
//
// motion's hook reads the media query during the very first client render,
// so a visitor with "reduce motion" on gets the static branch while the
// server (which cannot know the preference) rendered the animated one, and
// React reports a hydration mismatch and rebuilds the tree.
//
// This hook answers `false` on the server AND while hydrating, so the first
// client render always matches the server HTML. React then re-renders the
// components that read it, before the browser paints again, with the real
// preference. Components mounted later (client-side navigation) get the
// real value on their first render, so nothing animates in first. It also
// follows live changes to the OS setting.
//
// Always use this instead of motion's `useReducedMotion` (eslint enforces
// it). Prefer changing props on the same element over returning a different
// element for the reduced branch: a different element remounts its children
// when the flag flips after hydration.

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

let query: MediaQueryList | null = null;

function getQuery() {
  query ??= window.matchMedia(QUERY);
  return query;
}

function subscribe(onChange: () => void) {
  const mq = getQuery();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return getQuery().matches;
}

function getServerSnapshot() {
  return false;
}

/** `true` when the visitor asked for reduced motion. Never `true` during SSR or hydration. */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
