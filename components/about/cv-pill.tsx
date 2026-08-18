"use client";

// "View CV" pill — outline style, magnetic pull plus press feedback, opens
// the CV in a new tab. Static under reduced motion (Magnetic no-ops;
// gestures disabled).

import { motion, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/magnetic";
import { UI } from "@/components/icons";
import { site } from "@/lib/content";

export default function CvPill() {
  const reduced = useReducedMotion();

  return (
    <Magnetic>
      <motion.a
        href={site.cv}
        target="_blank"
        rel="noopener noreferrer"
        className="pill"
        whileHover={reduced ? undefined : { scale: 1.04 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        View CV
        <UI name="arrow-right" className="h-3.5 w-3.5" />
      </motion.a>
    </Magnetic>
  );
}
