"use client";

// Floating "Visit" pill for case-study detail pages — fixed bottom-right,
// hidden over the hero and fading in once the reader scrolls past it
// (~400px, mirroring reading-progress's motion useScroll approach).
// Sits at z-40 with the bottom-left layers breadcrumb (entry splash and
// modals live above at z-50+/z-[100]); the breadcrumb pins bottom-LEFT so
// the two never collide. Static show/hide under reduced motion; magnetic
// hover reuses the shared wrapper (it translates an inner div, so the
// fixed outer shell is unaffected).

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import type { Accent } from "@/lib/content";
import { accentBorder, accentText } from "@/lib/accents";
import { UI } from "@/components/icons";
import Magnetic from "@/components/motion/magnetic";

/** Roughly the hero headline + stats at 1280 — past this, the inline
 *  "Visit →" meta link has scrolled away and the pill takes over. */
const SHOW_AFTER_PX = 400;

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

type Props = {
  href: string;
  /** Study title, for the accessible label only. */
  title: string;
  accent: Accent;
};

export default function VisitPill({ href, title, accent }: Props) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  // Covers restored scroll positions too: useScroll measures on the first
  // frame, so a mid-page reload fires "change" with the restored offset.
  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > SHOW_AFTER_PX);
  });

  const link = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${title}`}
      className={`pill min-h-[44px] bg-raised shadow-lg ${accentBorder[accent]} ${accentText[accent]}`}
    >
      Visit
      <UI name="arrow-right" className="h-3.5 w-3.5" />
    </a>
  );

  const shell = "fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6";

  if (reduced) {
    return visible ? <div className={shell}>{link}</div> : null;
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={shell}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={SPRING}
        >
          <Magnetic strength={0.2}>{link}</Magnetic>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
