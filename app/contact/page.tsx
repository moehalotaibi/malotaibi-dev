import type { Metadata } from "next";
import MotionReveal from "@/components/motion/motion-reveal";
import MethodCards from "@/components/contact/method-cards";
import ElsewhereRow from "@/components/contact/elsewhere-row";
import MailtoForm from "@/components/contact/mailto-form";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.fullName} — ${site.role}, ${site.location}.`,
  alternates: { canonical: "/contact" },
};

// Server page (metadata) — interactivity lives in the client components.
export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="shell pb-12 pt-24 md:pt-28">
        <MotionReveal>
          <p className="label">{contact.eyebrow}</p>
        </MotionReveal>
        <MotionReveal delay={80}>
          <h1 className="mt-8 font-display text-h1 font-semibold text-cream">
            Let&apos;s <span className="text-gradient-violet">Connect</span>.
          </h1>
        </MotionReveal>
        <MotionReveal delay={140} y={12}>
          <p className="mt-6 max-w-[48ch] text-lead text-paper-mid">
            {site.bio}
          </p>
        </MotionReveal>
      </section>

      {/* Method cards */}
      <section className="shell pb-16" aria-label="Contact methods">
        <MethodCards />
      </section>

      {/* Elsewhere */}
      <section className="shell pb-16" aria-labelledby="elsewhere">
        <MotionReveal>
          <h2 id="elsewhere" className="label">
            {contact.elsewhereLabel}
          </h2>
        </MotionReveal>
        <MotionReveal delay={80}>
          <div className="mt-6">
            <ElsewhereRow />
          </div>
        </MotionReveal>
      </section>

      {/* Mailto form */}
      <section className="shell pb-section" aria-labelledby="write-message">
        <MotionReveal>
          <h2 id="write-message" className="label">
            {contact.form.label}
          </h2>
        </MotionReveal>
        <MotionReveal delay={80}>
          <div className="mt-6">
            <MailtoForm />
          </div>
        </MotionReveal>
      </section>
    </>
  );
}

