"use client";

// Contact pill — magnetic pull toward the cursor plus press feedback.
// Links to the contact page. Static under reduced motion (Magnetic
// no-ops; gestures disabled).

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/magnetic";
import { UI } from "@/components/icons";

const MotionLink = motion.create(Link);

export default function ContactCta() {
  const reduced = useReducedMotion();

  return (
    <Magnetic>
      <MotionLink
        href="/contact"
        className="pill pill-solid"
        whileHover={reduced ? undefined : { scale: 1.04 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        Contact me
        <UI name="arrow-right" className="h-3.5 w-3.5" />
      </MotionLink>
    </Magnetic>
  );
}
