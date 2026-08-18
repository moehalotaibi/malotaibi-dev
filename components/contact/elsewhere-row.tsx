"use client";

// "Elsewhere" pills — social profiles (brand icons) plus the CV, all in
// new tabs. Magnetic pull + press feedback, static under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/magnetic";
import { Brand, UI } from "@/components/icons";
import { site, socials } from "@/lib/content";

const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;

export default function ElsewhereRow() {
  const reduced = useReducedMotion();
  const gestures = reduced
    ? {}
    : { whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 } };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map((item) => (
        <Magnetic key={item.label}>
          <motion.a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
            {...gestures}
            transition={SPRING}
          >
            <Brand slug={item.icon} className="h-3.5 w-3.5" />
            {item.label}
          </motion.a>
        </Magnetic>
      ))}

      <Magnetic>
        <motion.a
          href={site.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="pill"
          {...gestures}
          transition={SPRING}
        >
          View CV
          <UI name="arrow-right" className="h-3.5 w-3.5" />
        </motion.a>
      </Magnetic>
    </div>
  );
}
