"use client";

// Mailto form — no backend: submit opens the visitor's mail app with the
// subject and body pre-filled. The button stays disabled until both fields
// have content. Static under reduced motion (gestures disabled).

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/magnetic";
import { UI } from "@/components/icons";
import { contact, site } from "@/lib/content";

const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;

const FIELD_CLASS =
  "mt-3 block w-full rounded-xl border border-rule bg-raised px-4 py-3 text-body text-paper placeholder:text-paper-dim";

export default function MailtoForm() {
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const disabled = name.trim() === "" || message.trim() === "";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="card max-w-2xl p-8" noValidate>
      <div className="space-y-6">
        <div>
          <label htmlFor="contact-name" className="label block">
            {contact.form.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={contact.form.namePlaceholder}
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="label block">
            {contact.form.messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={contact.form.messagePlaceholder}
            className={`${FIELD_CLASS} resize-y`}
          />
        </div>
      </div>

      <div className="mt-8">
        <Magnetic>
          <motion.button
            type="submit"
            disabled={disabled}
            className="pill pill-solid disabled:opacity-40 disabled:hover:border-cream disabled:hover:bg-cream disabled:hover:text-ink"
            {...(reduced || disabled
              ? {}
              : { whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 } })}
            transition={SPRING}
          >
            {contact.form.submit}
            <UI name="arrow-right" className="h-3.5 w-3.5" />
          </motion.button>
        </Magnetic>
        <p className="label mt-3">{contact.form.note}</p>
      </div>
    </form>
  );
}
