"use client";

// Testimonials — each quote is a card that reveals on scroll and tilts
// subtly under the cursor. The whole card links out when a source URL
// exists. Static under reduced motion (handled by the primitives).

import type { ReactNode } from "react";
import MotionReveal from "@/components/motion/motion-reveal";
import TiltCard from "@/components/motion/tilt-card";
import { accentText } from "@/lib/accents";
import { testimonials, type Testimonial } from "@/lib/content";

function CardBody({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure>
      <span
        aria-hidden="true"
        className={`block font-display text-h1 font-semibold leading-none ${accentText.cyan}`}
      >
        “
      </span>
      <blockquote className="mt-2 text-lead leading-relaxed font-display">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6">
        <p className="text-meta font-medium text-paper">
          {testimonial.authorName}
        </p>
        <p className="label mt-1">{testimonial.authorTagline}</p>
      </figcaption>
    </figure>
  );
}

function CardShell({
  testimonial,
  children,
}: {
  testimonial: Testimonial;
  children: ReactNode;
}) {
  if (testimonial.href) {
    return (
      <a
        href={testimonial.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card block max-w-2xl p-8 transition-colors hover:border-rule-strong"
      >
        {children}
      </a>
    );
  }
  return <div className="card max-w-2xl p-8">{children}</div>;
}

export default function TestimonialCards() {
  return (
    <div className="mt-2 space-y-6">
      {testimonials.map((testimonial) => (
        <MotionReveal key={testimonial.authorName}>
          <TiltCard max={3} className="max-w-2xl">
            <CardShell testimonial={testimonial}>
              <CardBody testimonial={testimonial} />
            </CardShell>
          </TiltCard>
        </MotionReveal>
      ))}
    </div>
  );
}
