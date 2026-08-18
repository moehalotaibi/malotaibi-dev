"use client";

// Tech stack — blurb + a left-to-right marquee of full-color brand logos.
// Hovering the marquee pauses it; each logo carries a shadcn tooltip.
// Reduced motion: the global CSS zeroes the marquee animation.

import { motion, useReducedMotion } from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Segments from "@/components/segments";
import { Brand } from "@/components/icons";
import { techStack } from "@/lib/content";
import { SPRING } from "./motion-kit";

function IconRun({ decorative = false }: { decorative?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div
      className="flex items-center"
      aria-hidden={decorative ? "true" : undefined}
    >
      {techStack.icons.map((item) => (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild>
            <motion.span
              role={decorative ? undefined : "img"}
              aria-label={decorative ? undefined : item.title}
              className="grid h-16 w-20 shrink-0 place-items-center"
              whileHover={reduced ? undefined : { scale: 1.2, y: -3 }}
              transition={SPRING}
            >
              {item.img ? (
                // Official colored logo (self-hosted devicon SVG)
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.img}
                  alt=""
                  className="h-10 w-10 object-contain"
                />
              ) : item.brand ? (
                // Pure-black brands: monochrome glyph, lightened to cream
                <Brand slug={item.brand} colored className="h-10 w-10" />
              ) : null}
            </motion.span>
          </TooltipTrigger>
          <TooltipContent>{item.title}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      className="shell pb-section text-center"
      aria-labelledby="tech-stack"
    >
      <MotionReveal>
        <h2 id="tech-stack" className="label">
          My tech stack.
        </h2>
      </MotionReveal>
      <MotionReveal delay={80}>
        <p className="mx-auto mt-6 max-w-[52ch] text-lead text-paper-mid">
          <Segments segments={techStack.blurb} />
        </p>
      </MotionReveal>

      <MotionReveal delay={160}>
        <div className="marquee mt-10">
          <div className="marquee-track" style={{ "--marquee-t": "34s" } as React.CSSProperties}>
            <IconRun />
            <IconRun decorative />
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
