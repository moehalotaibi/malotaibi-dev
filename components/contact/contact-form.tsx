"use client";

// Contact form — posts straight from the browser to Web3Forms so messages
// land in Moe's inbox (no mail app). Client-direct is deliberate: their API
// sits behind Cloudflare bot checks that reject server-side relays, and the
// access key is public-by-design (domain-locked on their side). The server
// page passes the key in from env. Same card chrome as the old mailto form,
// with name / email / phone fields, inline validation, and idle → sending →
// success/error states. On failure a mailto link keeps a way out. The
// hidden "company" input is a bot honeypot: filled in → fake success,
// nothing sent. Static under reduced motion.

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/magnetic";
import { UI } from "@/components/icons";
import { contact, site } from "@/lib/content";

const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;

const FIELD_CLASS =
  "mt-3 block w-full rounded-xl border bg-raised px-4 py-3 text-body text-paper placeholder:text-paper-dim";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FieldName = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (name.length < 1 || name.length > 100)
    errors.name = contact.form.errors.name;
  if (!EMAIL_RE.test(email)) errors.email = contact.form.errors.email;
  if (phone.length > 30) errors.phone = contact.form.errors.phone;
  if (message.length < 1 || message.length > 5000)
    errors.message = contact.form.errors.message;

  return errors;
}

/** Label + input wrapper — error text sits under the field in accent-pink. */
function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="label block">
          {label}
        </label>
        {hint ? (
          <span className="label normal-case text-paper-dim">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-meta text-accent-pink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({ accessKey }: { accessKey: string }) {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const setValue = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as it's edited again.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const fieldClass = (field: FieldName) =>
    `${FIELD_CLASS} ${errors[field] ? "border-accent-pink" : "border-rule"}`;

  const ariaProps = (field: FieldName) =>
    errors[field]
      ? ({
          "aria-invalid": true,
          "aria-describedby": `contact-${field}-error`,
        } as const)
      : ({ "aria-invalid": false } as const);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (
      ["name", "email", "phone", "message"] as FieldName[]
    ).find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)
        ?.focus();
      return;
    }

    const company =
      formRef.current?.querySelector<HTMLInputElement>("#contact-company")
        ?.value ?? "";
    if (company !== "") {
      // Bot filled the honeypot: pretend it worked, send nothing.
      setStatus("success");
      return;
    }
    if (!accessKey) {
      // Env not configured — the error state carries the mailto way out.
      setStatus("error");
      return;
    }

    setStatus("sending");
    const name = values.name.trim();
    const phone = values.phone.trim();
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${name}`,
          from_name: name,
          email: values.email.trim(),
          ...(phone ? { phone } : {}),
          message: values.message.trim(),
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      setStatus(response.ok && data?.success ? "success" : "error");
    } catch {
      // Network failure — same fallback as a rejected submit.
      setStatus("error");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  // ---------------------------------------------------------- success
  if (status === "success") {
    return (
      <motion.div
        className="card flex min-h-[20rem] max-w-2xl flex-col items-start justify-center gap-6 p-8"
        {...(reduced ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } })}
        transition={SPRING}
        role="status"
      >
        {/* Same chip chrome as the hero's "Let's Connect" status. */}
        <span className="flex items-center gap-2.5 rounded-full border border-rule-strong bg-ink/70 px-5 py-3 font-sans text-[0.9375rem] font-medium text-cream">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
          </span>
          {contact.form.success.chip}
        </span>
        <p className="max-w-[40ch] text-body text-paper-mid">
          {contact.form.success.body}
        </p>
        <Magnetic>
          <motion.button
            type="button"
            onClick={reset}
            className="pill min-h-11"
            {...(reduced
              ? {}
              : { whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 } })}
            transition={SPRING}
          >
            {contact.form.success.again}
            <UI name="arrow-right" className="h-3.5 w-3.5" />
          </motion.button>
        </Magnetic>
      </motion.div>
    );
  }

  const sending = status === "sending";

  // ------------------------------------------------------------- form
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="card relative max-w-2xl p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          label={contact.form.nameLabel}
          error={errors.name}
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValue("name", e.target.value)}
            placeholder={contact.form.namePlaceholder}
            className={fieldClass("name")}
            {...ariaProps("name")}
          />
        </Field>

        <Field
          id="contact-email"
          label={contact.form.emailLabel}
          error={errors.email}
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValue("email", e.target.value)}
            placeholder={contact.form.emailPlaceholder}
            className={fieldClass("email")}
            {...ariaProps("email")}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="contact-phone"
            label={contact.form.phoneLabel}
            hint={contact.form.phoneHint}
            error={errors.phone}
          >
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => setValue("phone", e.target.value)}
              placeholder={contact.form.phonePlaceholder}
              className={fieldClass("phone")}
              {...ariaProps("phone")}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id="contact-message"
            label={contact.form.messageLabel}
            error={errors.message}
          >
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              value={values.message}
              onChange={(e) => setValue("message", e.target.value)}
              placeholder={contact.form.messagePlaceholder}
              className={`${fieldClass("message")} resize-y`}
              {...ariaProps("message")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — invisible to people (and their screen readers), tempting
          to bots. Filled in → the API pretends success and sends nothing. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="mt-8">
        <Magnetic>
          <motion.button
            type="submit"
            disabled={sending}
            className="pill pill-solid min-h-11 disabled:opacity-40 disabled:hover:border-cream disabled:hover:bg-cream disabled:hover:text-ink"
            {...(reduced || sending
              ? {}
              : { whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 } })}
            transition={SPRING}
          >
            {sending ? contact.form.sending : contact.form.submit}
            <UI name="arrow-right" className="h-3.5 w-3.5" />
          </motion.button>
        </Magnetic>

        {status === "error" ? (
          <p className="mt-4 text-meta text-accent-pink" role="alert">
            {contact.form.error.line}{" "}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center gap-1 align-baseline font-medium text-paper underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-paper"
            >
              {contact.form.error.mailto}
            </a>
          </p>
        ) : (
          <p className="label mt-3">{contact.form.note}</p>
        )}
      </div>
    </form>
  );
}
