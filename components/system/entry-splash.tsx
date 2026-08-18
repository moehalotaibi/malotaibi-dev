"use client";

// First-entry splash — covers the page the moment SSR HTML arrives (it is
// part of the server-rendered payload) and fades out once the page has
// hydrated and finished loading, with a small minimum display so it reads
// as an intentional beat instead of a flicker. Rendered only when scripts
// can run (.entry-splash is display:none otherwise — see globals.css), so
// no-JS visitors never get stuck behind it. Purely decorative: aria-hidden
// and pointer-events-none throughout; it never traps focus or clicks.

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import OpeningFile from "@/components/system/opening-file";

const MIN_DISPLAY_MS = 500;
const FADE_MS = 450;

export default function EntrySplash() {
  const reduced = useReducedMotion() ?? false;
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const shownAt = performance.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let goneTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      const wait = Math.max(0, MIN_DISPLAY_MS - (performance.now() - shownAt));
      fadeTimer = setTimeout(() => {
        setHiding(true);
        goneTimer = setTimeout(() => setGone(true), reduced ? 0 : FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`entry-splash pointer-events-none fixed inset-0 z-[100] bg-ink transition-opacity ${
        hiding ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: reduced ? "0ms" : `${FADE_MS}ms` }}
    >
      <OpeningFile />
    </div>
  );
}
