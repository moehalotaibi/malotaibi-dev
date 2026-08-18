"use client";

// About hero — both h1 lines reveal word by word; the wave emoji springs in
// after line one and wiggles on hover. Static under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import StaggerText from "@/components/motion/stagger-text";
import { about } from "@/lib/content";

export default function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <h1 className="text-h1 font-display font-semibold">
      <span className="text-cream">
        <StaggerText text={about.hello} per="word" />{" "}
        {reduced ? (
          <span aria-hidden="true">👋</span>
        ) : (
          <motion.span
            className="inline-block"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0, rotate: -35 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 340,
                damping: 22,
                delay: 0.35,
              },
            }}
            whileHover={{ rotate: 16, scale: 1.12 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
          >
            👋
          </motion.span>
        )}
      </span>
      <br />
      <StaggerText
        text={about.subline}
        per="word"
        delay={0.25}
        className="text-gradient-violet"
      />
    </h1>
  );
}
