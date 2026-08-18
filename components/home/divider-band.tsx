"use client";

// Divider band — label, magnetic social icons, mailto. Classes unchanged.

import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import Magnetic from "@/components/motion/magnetic";
import { Brand } from "@/components/icons";
import { divider, site, socials } from "@/lib/content";
import { SPRING } from "./motion-kit";

export default function DividerBand() {
  const reduced = useReducedMotion();

  return (
    <section className="border-y border-rule">
      <MotionReveal>
        <div className="shell flex items-center justify-between gap-6 py-4">
          <span className="label hidden sm:block">{divider.label}</span>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Magnetic key={s.label}>
                <motion.a
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-rule text-paper-mid transition-colors hover:border-rule-strong hover:text-paper"
                  whileHover={reduced ? undefined : { scale: 1.15 }}
                  whileTap={reduced ? undefined : { scale: 0.97 }}
                  transition={SPRING}
                >
                  <Brand slug={s.icon} className="h-4 w-4" />
                </motion.a>
              </Magnetic>
            ))}
          </div>
          <motion.a
            href={`mailto:${site.email}`}
            className="label hidden normal-case transition-colors hover:text-paper md:block"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            transition={SPRING}
          >
            {site.email}
          </motion.a>
        </div>
      </MotionReveal>
    </section>
  );
}
