"use client";

// Split-text reveal: chars (or words) rise/fade in with a tight stagger.
// The wrapper keeps `aria-label={text}`; everything animated is inside an
// aria-hidden container. Words are grouped in `inline-block` spans so lines
// never break mid-word, and real space text nodes between the groups keep
// spacing intact (non-collapsing). Static under reduced motion.

import { Fragment } from "react";
import { motion, stagger, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

type Props = {
  text: string;
  className?: string;
  per?: "char" | "word";
  /** Delay before the first unit, in **seconds**. */
  delay?: number;
};

const unitVariants: Variants = {
  hidden: { opacity: 0, y: "0.35em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

export default function StaggerText({
  text,
  className,
  per = "char",
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(/\s+/).filter(Boolean);

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: stagger(per === "char" ? 0.02 : 0.05, {
          startDelay: delay,
        }),
      },
    },
  };

  return (
    <motion.span
      className={className}
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 ? " " : null}
            {per === "word" ? (
              <motion.span className="inline-block" variants={unitVariants}>
                {word}
              </motion.span>
            ) : (
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    variants={unitVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            )}
          </Fragment>
        ))}
      </span>
    </motion.span>
  );
}
