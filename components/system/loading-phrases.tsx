"use client";

// Cycling "// ..." status line for the route loading screen — the only
// stateful piece, split out so app/loading.tsx can stay a server
// component. motion/react is already in the site's client bundle (hero,
// motion primitives), so AnimatePresence costs nothing new; the interval
// is the only logic here. Under reduced motion — and in the server
// snapshot shown before hydration — the first phrase renders statically.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const PHRASES = [
  "// waking the cursors",
  "// aligning the grid",
  "// sharpening the pen tool",
] as const;

const INTERVAL_MS = 1800;

export default function LoadingPhrases() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % PHRASES.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <span className="label">{PHRASES[0]}</span>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={index}
        className="label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {PHRASES[index]}
      </motion.span>
    </AnimatePresence>
  );
}
