"use client";

// About hero — both h1 lines reveal word by word; the wave emoji springs in
// after line one and wiggles on hover. Under the title, a bordered status
// chip (same chrome as the hero's "Let's Connect") carries the NN/g UX
// Certification and links to the certificate. Static under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import StaggerText from "@/components/motion/stagger-text";
import { about } from "@/lib/content";

const SPRING = { type: "spring", stiffness: 340, damping: 24 } as const;

export default function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <>
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
              transition={SPRING}
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

      <motion.a
        href={about.certified.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${about.certified.label}, ${about.certified.detail} — open the certificate`}
        className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-rule-strong bg-ink/70 px-4 py-2 font-sans text-[0.9375rem] font-medium text-cream backdrop-blur-sm"
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0, y: 8 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.97 },
            })}
        transition={{ ...SPRING, delay: reduced ? 0 : 0.6 }}
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-green"
          aria-hidden="true"
        />
        {about.certified.label}
        <span className="label normal-case tracking-normal text-paper-dim">
          {about.certified.detail}
        </span>
      </motion.a>
    </>
  );
}
