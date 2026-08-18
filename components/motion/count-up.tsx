"use client";

// Animated stat: every integer run in the string ("6 → 2" → 6 and 2;
// "14" → 14) counts 0→N with a spring the first time it scrolls into view.
// Non-numeric text (arrows, "RTL", …) renders as-is. Wrapper carries
// `aria-label={value}`; the animated content is aria-hidden. Renders the
// final value immediately under reduced motion.

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  value: string;
  className?: string;
};

function AnimatedInt({ target, play }: { target: number; play: boolean }) {
  const spring = useSpring(0, { stiffness: 260, damping: 34 });
  const text = useTransform(spring, (v) => String(Math.round(v)));

  useEffect(() => {
    if (play) spring.set(target);
  }, [play, spring, target]);

  return <motion.span>{text}</motion.span>;
}

export default function CountUp({ value, className }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  if (reduced) {
    return <span className={className}>{value}</span>;
  }

  const parts = value.split(/(\d+)/);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {parts.map((part, i) =>
          /^\d+$/.test(part) ? (
            <AnimatedInt key={i} target={parseInt(part, 10)} play={inView} />
          ) : (
            part
          ),
        )}
      </span>
    </span>
  );
}
