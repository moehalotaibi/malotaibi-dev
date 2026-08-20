import type { Metadata } from "next";
import MotionReveal from "@/components/motion/motion-reveal";
import MethodCards from "@/components/contact/method-cards";
import ElsewhereRow from "@/components/contact/elsewhere-row";
import ContactForm from "@/components/contact/contact-form";
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

      {/* Hairline between the hero and the working area */}
      <div className="shell" aria-hidden="true">
        <hr className="rule" />
      </div>

      {/* Two columns from lg: methods + elsewhere as the left rail, the
          message form as the primary column. Mobile keeps the original
          stacked order — methods, elsewhere, form. */}
      <div className="shell grid gap-14 pb-section pt-12 md:pt-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          {/* Method cards */}
          <section aria-label="Contact methods">
            <MethodCards className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1" />
          </section>

          {/* Elsewhere */}
          <section className="mt-12" aria-labelledby="elsewhere">
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
        </div>

        {/* Write a message */}
        <section aria-labelledby="write-message">
          <MotionReveal>
            <h2 id="write-message" className="label">
              {contact.form.label}
            </h2>
          </MotionReveal>
          <MotionReveal delay={80}>
            <div className="mt-6">
              {/* Key is public-by-design (domain-locked at Web3Forms); baked
                  into the static page at build time from the server env. */}
              <ContactForm accessKey={process.env.WEB3FORMS_ACCESS_KEY ?? ""} />
            </div>
          </MotionReveal>
        </section>
      </div>
    </>
  );
}
