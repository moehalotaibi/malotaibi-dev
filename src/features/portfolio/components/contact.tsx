"use client";

import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Panel, PanelHeader, PanelTitle } from "./panel";

const CONTACT_LINKS = [
  {
    icon: MailIcon,
    label: "Email",
    value: "moe.halotaibi@gmail.com",
    href: "mailto:moe.halotaibi@gmail.com",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+966 553 012 825",
    href: "tel:+966553012825",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "mohammed-alotaibi",
    href: "https://www.linkedin.com/in/mohammed-alotaibi-1aa047311/",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "moehalotaibi",
    href: "https://github.com/moehalotaibi",
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errors: Record<string, boolean> = {};

    if (!data.get("name")) errors.name = true;
    if (!data.get("email")) errors.email = true;
    if (!data.get("message")) errors.message = true;

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSending(true);
    setError(false);

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/moe.halotaibi@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: new FormData(form).get("name"),
            email: new FormData(form).get("email"),
            message: new FormData(form).get("message"),
            _subject: `Portfolio message from ${new FormData(form).get("name")}`,
          }),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <Panel id="contact">
      <PanelHeader>
        <PanelTitle>Get in Touch</PanelTitle>
      </PanelHeader>

      <div className="border-b border-edge">
        {CONTACT_LINKS.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className={cn(
              "group/contact flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent2",
              index < CONTACT_LINKS.length - 1 && "border-b border-edge"
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background">
              <link.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium underline-offset-4 group-hover/contact:underline">
                {link.label}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {link.value}
              </p>
            </div>
            <ArrowUpRightIcon className="size-4 text-muted-foreground" />
          </a>
        ))}
      </div>

      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-edge">
          <div className="border-b border-edge bg-muted/30 px-4 py-3">
            <h3 className="text-sm font-medium">Send a Message</h3>
            <p className="text-xs text-muted-foreground">
              Fill out the form below and I&apos;ll get back to you as soon as
              possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  onChange={() =>
                    setFieldErrors((p) => ({ ...p, name: false }))
                  }
                  className={cn(
                    "w-full rounded-lg border bg-background px-3 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/40 focus:border-info focus:ring-1 focus:ring-info",
                    fieldErrors.name ? "border-red-500" : "border-edge"
                  )}
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-500">Please enter your name</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  onChange={() =>
                    setFieldErrors((p) => ({ ...p, email: false }))
                  }
                  className={cn(
                    "w-full rounded-lg border bg-background px-3 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/40 focus:border-info focus:ring-1 focus:ring-info",
                    fieldErrors.email ? "border-red-500" : "border-edge"
                  )}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-500">
                    Please enter your email
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project or idea..."
                onChange={() =>
                  setFieldErrors((p) => ({ ...p, message: false }))
                }
                className={cn(
                  "w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/40 focus:border-info focus:ring-1 focus:ring-info",
                  fieldErrors.message ? "border-red-500" : "border-edge"
                )}
              />
              {fieldErrors.message && (
                <p className="text-xs text-red-500">Please enter a message</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              {error ? (
                <p className="text-xs text-red-500">
                  Something went wrong. Please try again.
                </p>
              ) : submitted ? (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Message sent successfully!
                </p>
              ) : (
                <p className="text-xs text-muted-foreground/60">
                  Your message will be sent directly to my inbox.
                </p>
              )}
              <button
                type="submit"
                disabled={sending || submitted}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed",
                  submitted
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-foreground text-background hover:opacity-90 disabled:opacity-60"
                )}
              >
                {submitted ? (
                  <>
                    Sent!
                    <CheckCircleIcon className="size-4" />
                  </>
                ) : sending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <SendIcon className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Panel>
  );
}
