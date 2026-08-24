"use client";

// Guestbook — an embedded-Figma-file canvas under the tech stack, framed in
// ShotFrame-style chrome (traffic dots + "guestbook.fig" file-tab + a
// "// canvas" label, decorative zoom chip bottom-right). Approved pins come
// from GET /api/comments and render as Figma comment markers (rounded
// bubble, sharp bottom-left corner, accent-cycled) at stored x/y% positions
// on a dot-grid canvas. Hovering the empty canvas swaps to a comment-tool
// pin cursor (scoped data-URI SVG, same technique as the site cursor).
//
// Clicking a pin opens its thread card; clicking empty canvas drops a
// provisional pin and opens a compact composer (name / email / message +
// honeypot) that POSTs to /api/comments. New pins save as approved: false —
// after a successful submit the visitor keeps a dimmed outlined "pending"
// pin with a "// sent for review" chip (local only; gone on reload) and a
// fire-and-forget Web3Forms notification goes to Moe (browser-direct like
// the contact form — failures are swallowed, never surfacing to the UI).
// Emails never come back from the API — thread cards only know name /
// message / time.
//
// Cards flip near edges and stay inside the canvas; on small screens the
// composer bottom-anchors inside the canvas (pin-anchored is too tight at
// 375) and thread cards go full-width. Pins stagger-pop the first time the
// canvas scrolls into view; reduced motion renders everything instantly.

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, FormEvent, RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import MotionReveal from "@/components/motion/motion-reveal";
import SectionHeader from "@/components/section-header";
import { accentBg, accentText } from "@/lib/accents";
import type { Accent } from "@/lib/content";
import { site } from "@/lib/content";
import { timeAgo } from "@/lib/time-ago";
import { SPRING } from "./motion-kit";

// Shape returned by the API — the server strips emails before responding.
type PublicComment = {
  id: string;
  name: string;
  message: string;
  x: number;
  y: number;
  createdAt: string;
};

/** A just-submitted pin, visible only to its author until Moe approves it. */
type PendingPin = { id: string; name: string; x: number; y: number };

// One accent per pin, cycled in pin order (cream stays off the cycle —
// it's the site's neutral, not a marker color).
const PIN_ACCENTS: Accent[] = [
  "violet",
  "amber",
  "cyan",
  "pink",
  "blue",
  "green",
];
const pinAccent = (index: number) => PIN_ACCENTS[index % PIN_ACCENTS.length];

// Same pragmatic email check as the contact form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Comment-tool cursor for the empty canvas — a teardrop outline (rounded
// bubble, sharp bottom-left tip), dark fill + white stroke like the
// site-wide Figma cursor in globals.css. Hotspot at the tip (3, 29).
const PIN_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M3 29 L3 13 Q3 3 13 3 L19 3 Q29 3 29 13 L29 19 Q29 29 19 29 Z' fill='%23333333' stroke='white' stroke-width='2.5'/%3E%3C/svg%3E") 3 29, crosshair`;

// Figma dot grid — smaller pitch than the 88px .line-grid so the canvas
// reads as zoomed-out Figma, not the hero backdrop.
const DOT_GRID: CSSProperties = {
  backgroundImage: "radial-gradient(#262723 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

// Compact take on contact-form.tsx's field chrome (card is bg-raised, so
// inputs sit on bg-ink to read as inset).
const FIELD_CLASS =
  "mt-1.5 block w-full rounded-lg border bg-ink px-3 py-2 text-meta text-paper placeholder:text-paper-dim";

// The visitor-notification path from contact-form.tsx — browser-direct
// (server-side relays get rejected by their bot checks), key public-by-design.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// matchMedia store for the compact layout (server snapshot: desktop) —
// same pattern as tech-stack's pointer-fine gate.
function subscribeSmall(onChange: () => void) {
  const mql = window.matchMedia("(max-width: 639px)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getSmall = () => window.matchMedia("(max-width: 639px)").matches;
const getSmallServer = () => false;

/** Pin bubble size in px (h-9/w-9) — card offsets are measured from it. */
const PIN_SIZE = 36;
/** Minimum gap between a card and the canvas edges, px. */
const EDGE = 12;

/**
 * Measured card placement near a pin tip at (x, y)%: prefer opening below
 * the tip, then above the bubble, and always clamp fully inside the canvas —
 * cards are taller than the mid-canvas leaves room for, so pure CSS flips
 * would clip against overflow-hidden. Runs pre-paint (layout effect). When
 * `anchor` goes null the last position is kept so the exit animation
 * doesn't jump. `small` screens skip the horizontal anchor (cards go
 * full-width via classes there). `deps` re-clamps when card height changes
 * (e.g. validation errors appearing). The caller owns `cardRef` (attached
 * to the card element); the hook only returns position state.
 */
function useCardPosition(
  canvasRef: RefObject<HTMLDivElement | null>,
  cardRef: RefObject<HTMLElement | null>,
  anchor: { x: number; y: number } | null,
  small: boolean,
  deps: unknown[],
) {
  const [pos, setPos] = useState<CSSProperties | undefined>(undefined);

  useLayoutEffect(() => {
    if (!anchor) return;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    const tipX = (anchor.x / 100) * cw;
    const tipY = (anchor.y / 100) * ch;

    let top = tipY + EDGE; // below the tip…
    if (top + h > ch - EDGE) top = tipY - PIN_SIZE - 8 - h; // …or above the bubble
    top = clamp(top, EDGE, Math.max(EDGE, ch - h - EDGE));

    const style: CSSProperties = { top };
    if (!small) {
      let left = tipX + PIN_SIZE + 8; // right of the bubble…
      if (left + w > cw - EDGE) left = tipX - EDGE - w; // …or flipped left
      style.left = clamp(left, EDGE, Math.max(EDGE, cw - w - EDGE));
    }
    setPos(style);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor?.x, anchor?.y, small, ...deps]);

  return pos;
}

// ------------------------------------------------------------------ pin

function Pin({
  comment,
  accent,
  open,
  delay,
  animate,
  onClick,
}: {
  comment: PublicComment;
  accent: Accent;
  open: boolean;
  /** Stagger delay in seconds for the initial in-view pop. */
  delay: number;
  animate: boolean;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const initial = comment.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <motion.button
      type="button"
      aria-label={`Guestbook pin from ${comment.name}`}
      aria-expanded={open}
      aria-controls={open ? `guestbook-thread-${comment.id}` : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute grid h-9 w-9 place-items-center rounded-full rounded-bl-[4px] border border-white/30 font-mono text-[0.8125rem] font-bold text-white shadow-lg shadow-black/40 after:absolute after:-inset-1.5 after:content-[''] ${accentBg[accent]}`}
      style={{
        left: `${comment.x}%`,
        top: `${comment.y}%`,
        transformOrigin: "bottom left",
      }}
      // The pin's sharp bottom-left corner is the anchor: y -100% lifts the
      // bubble so that corner sits exactly on the stored point.
      initial={reduced ? false : { scale: 0, opacity: 0, y: "-100%" }}
      animate={
        reduced || animate
          ? { scale: 1, opacity: 1, y: "-100%" }
          : { scale: 0, opacity: 0, y: "-100%" }
      }
      whileHover={reduced ? undefined : { scale: 1.12, y: "-108%" }}
      whileTap={reduced ? undefined : { scale: 0.94 }}
      transition={{ ...SPRING, delay }}
    >
      <span aria-hidden="true">{initial}</span>
    </motion.button>
  );
}

// ---------------------------------------------------------- pending pin

/** Dimmed outlined marker + "// sent for review" chip — author-only. */
function PendingMarker({
  pin,
  canvasRef,
  small,
}: {
  pin: PendingPin;
  canvasRef: RefObject<HTMLDivElement | null>;
  small: boolean;
}) {
  const reduced = useReducedMotion();
  const initial = pin.name.trim().charAt(0).toUpperCase() || "?";
  // The chip is a mini-card: same measured flip/clamp as the thread card,
  // always horizontally anchored (it's small enough even at 375).
  const chipRef = useRef<HTMLParagraphElement>(null);
  const chipPos = useCardPosition(canvasRef, chipRef, pin, false, [small]);

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="absolute grid h-9 w-9 place-items-center rounded-full rounded-bl-[4px] border border-dashed border-paper-mid bg-raised/70 font-mono text-[0.8125rem] font-bold text-paper-mid"
        style={{
          left: `${pin.x}%`,
          top: `${pin.y}%`,
          transformOrigin: "bottom left",
        }}
        initial={reduced ? { opacity: 1, y: "-100%" } : { scale: 0, opacity: 0, y: "-100%" }}
        animate={{ scale: 1, opacity: 1, y: "-100%" }}
        transition={SPRING}
      >
        {initial}
      </motion.span>
      <motion.p
        ref={chipRef}
        role="status"
        className="label absolute z-10 whitespace-nowrap rounded-full border border-rule bg-raised/90 px-2.5 py-1 normal-case tracking-normal"
        style={chipPos}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: reduced ? 0 : 0.12 }}
      >
        {"// sent for review"}
      </motion.p>
    </>
  );
}

// -------------------------------------------------------------- section

type Compose = { x: number; y: number };
type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

export default function Guestbook({ web3formsKey }: { web3formsKey: string }) {
  const reduced = useReducedMotion();
  const small = useSyncExternalStore(subscribeSmall, getSmall, getSmallServer);

  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasRef, { once: true, margin: "0px 0px -10% 0px" });

  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [pendings, setPendings] = useState<PendingPin[]>([]);

  const [openId, setOpenId] = useState<string | null>(null);
  const [compose, setCompose] = useState<Compose | null>(null);
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);

  // ------------------------------------------------------------- load
  useEffect(() => {
    let cancelled = false;
    fetch("/api/comments", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { comments?: PublicComment[] }) => {
        if (cancelled) return;
        setComments(Array.isArray(data.comments) ? data.comments : []);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const closeCompose = useCallback(() => {
    setCompose(null);
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setFormError(null);
    setSending(false);
  }, []);

  const anythingOpen = openId !== null || compose !== null;

  // Esc closes whichever card is open.
  useEffect(() => {
    if (!anythingOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenId(null);
      closeCompose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anythingOpen, closeCompose]);

  // Clicking outside the canvas also closes (cards inside stop propagation).
  useEffect(() => {
    if (!anythingOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (canvasRef.current?.contains(e.target as Node)) return;
      setOpenId(null);
      closeCompose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [anythingOpen, closeCompose]);

  // Focus the first field once the composer mounts.
  useEffect(() => {
    if (compose) nameRef.current?.focus();
  }, [compose]);

  // ------------------------------------------------------ interactions

  const onCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // A first click with a card open just closes it.
    if (anythingOpen) {
      setOpenId(null);
      closeCompose();
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 2, 98);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 6, 96);
    setCompose({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
  };

  const openThread = (id: string) => {
    closeCompose();
    setOpenId((current) => (current === id ? null : id));
  };

  const setValue = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  // Fire-and-forget notification to Moe's inbox — must never affect the
  // visitor's success UI (localhost may even get a 403 from Web3Forms;
  // both branches of the promise are swallowed so nothing goes unhandled).
  const notifyMoe = (name: string, email: string, message: string) => {
    if (!web3formsKey) return;
    try {
      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New guestbook pin from ${name}`,
          from_name: name,
          email,
          message: `${message}\n\nApprove at ${site.url}/admin`,
        }),
      }).then(
        () => undefined,
        () => undefined,
      );
    } catch {
      // Ignored by design.
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!compose || sending) return;

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    const nextErrors: Errors = {};
    if (name.length < 1 || name.length > 50)
      nextErrors.name = "1–50 characters.";
    if (email.length > 200 || !EMAIL_RE.test(email))
      nextErrors.email = "Enter a valid email.";
    if (message.length < 1 || message.length > 500)
      nextErrors.message = "1–500 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    setFormError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          x: compose.x,
          y: compose.y,
          botcheck: companyRef.current?.value ?? "",
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        comment?: PublicComment;
        errors?: Record<string, string>;
      } | null;

      if (res.ok && data?.comment) {
        // Held for review — keep an author-only pending marker, tell Moe.
        // The honeypot's fake-success echo (id "echo") stays quiet: nothing
        // was saved, so an email about it would only mislead.
        const saved = data.comment;
        setPendings((prev) => [
          ...prev,
          { id: saved.id, name: saved.name, x: saved.x, y: saved.y },
        ]);
        if (saved.id !== "echo") notifyMoe(name, email, message);
        closeCompose();
        return;
      }
      if (res.status === 400 && data?.errors) {
        setErrors({
          name: data.errors.name,
          email: data.errors.email,
          message: data.errors.message,
        });
        setFormError(data.errors.form ?? null);
        setSending(false);
        return;
      }
      setFormError(
        res.status === 429
          ? "Too many pins — try again later."
          : "Couldn't post. Try again.",
      );
      setSending(false);
    } catch {
      setFormError("Couldn't post. Try again.");
      setSending(false);
    }
  };

  // ------------------------------------------------------------ render

  const openComment = openId
    ? (comments.find((c) => c.id === openId) ?? null)
    : null;
  const openIndex = openComment ? comments.indexOf(openComment) : -1;
  const composeAccent = pinAccent(comments.length + pendings.length);

  const threadCardRef = useRef<HTMLDivElement>(null);
  const threadCardPos = useCardPosition(canvasRef, threadCardRef, openComment, small, []);
  const composeCardRef = useRef<HTMLFormElement>(null);
  const composeCardPos = useCardPosition(canvasRef, composeCardRef, compose, small, [
    errors,
    formError,
  ]);

  const cardMotion = reduced
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 6, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 6, scale: 0.96 },
      };

  const fieldClass = (field: FieldName) =>
    `${FIELD_CLASS} ${errors[field] ? "border-accent-pink" : "border-rule"}`;

  const ariaProps = (field: FieldName) =>
    errors[field]
      ? ({
          "aria-invalid": true,
          "aria-describedby": `gb-${field}-error`,
        } as const)
      : ({ "aria-invalid": false } as const);

  return (
    <section className="shell pb-section" aria-labelledby="guestbook">
      <MotionReveal>
        <SectionHeader id="guestbook" title="Guestbook" badge="pen" />
      </MotionReveal>

      <MotionReveal delay={80}>
        <p className="label mb-5">{"// drop a pin — say hi"}</p>
      </MotionReveal>

      <MotionReveal delay={160}>
        {/* Embedded-file frame — same chrome language as ShotFrame. */}
        <div className="overflow-hidden rounded-xl border border-rule bg-raised">
          {/* Chrome bar: traffic dots + active file-tab + canvas label. */}
          <div className="flex items-center gap-3 border-b border-rule px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-rule-strong" />
              <span className="h-2 w-2 rounded-full bg-rule-strong" />
              <span className="h-2 w-2 rounded-full bg-rule-strong" />
            </span>
            <span className="label truncate rounded-md border border-rule bg-ink px-2.5 py-1 normal-case tracking-normal text-paper">
              guestbook.fig
            </span>
            <span className="label ml-auto shrink-0 normal-case tracking-normal text-paper-dim">
              {"// canvas"}
            </span>
          </div>

          {/* Canvas interior. */}
          <div ref={canvasRef} className="relative h-[320px] bg-ink sm:h-[420px]">
            {/* Click layer — dot grid + scoped comment-tool cursor. Pins and
                cards sit above it, so they keep the normal site cursor. */}
            <div
              onClick={onCanvasClick}
              className="absolute inset-0"
              style={{ ...DOT_GRID, cursor: PIN_CURSOR }}
            />

            {/* Approved pins — stagger-pop on first in-view. */}
            {comments.map((comment, i) => (
              <Pin
                key={comment.id}
                comment={comment}
                accent={pinAccent(i)}
                open={openId === comment.id}
                animate={inView && loaded}
                delay={reduced ? 0 : i * 0.06}
                onClick={() => openThread(comment.id)}
              />
            ))}

            {/* The visitor's own just-submitted pins, awaiting review. */}
            {pendings.map((pin) => (
              <PendingMarker
                key={pin.id}
                pin={pin}
                canvasRef={canvasRef}
                small={small}
              />
            ))}

            {/* Provisional pin while composing. */}
            <AnimatePresence>
              {compose && (
                <motion.span
                  aria-hidden="true"
                  className={`absolute grid h-9 w-9 place-items-center rounded-full rounded-bl-[4px] border border-white/30 font-mono text-[0.8125rem] font-bold text-white shadow-lg shadow-black/40 ${accentBg[composeAccent]}`}
                  style={{
                    left: `${compose.x}%`,
                    top: `${compose.y}%`,
                    y: "-100%",
                    transformOrigin: "bottom left",
                  }}
                  initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                  transition={SPRING}
                >
                  ?
                </motion.span>
              )}
            </AnimatePresence>

            {/* Thread card. */}
            <AnimatePresence>
              {openComment && (
                <motion.div
                  key={openComment.id}
                  ref={threadCardRef}
                  id={`guestbook-thread-${openComment.id}`}
                  role="dialog"
                  aria-label={`Guestbook pin from ${openComment.name}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`card absolute z-10 bg-raised p-4 shadow-lg shadow-black/30 ${
                    small ? "inset-x-3" : "w-60"
                  }`}
                  style={threadCardPos}
                  {...cardMotion}
                  transition={SPRING}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p
                      className={`min-w-0 truncate text-meta font-medium ${accentText[pinAccent(openIndex)]}`}
                    >
                      {openComment.name}
                    </p>
                    <p className="label shrink-0 normal-case tracking-normal text-paper-dim">
                      {timeAgo(openComment.createdAt)}
                    </p>
                  </div>
                  <p className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap break-words text-meta text-paper">
                    {openComment.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Composer — Figma comment composer × contact-form fields. */}
            <AnimatePresence>
              {compose && (
                <motion.form
                  ref={composeCardRef}
                  onSubmit={onSubmit}
                  onClick={(e) => e.stopPropagation()}
                  noValidate
                  className={`card absolute z-10 bg-raised p-4 shadow-lg shadow-black/30 ${
                    small ? "inset-x-3 bottom-3" : "w-80"
                  }`}
                  style={small ? undefined : composeCardPos}
                  {...cardMotion}
                  transition={SPRING}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="gb-name" className="label block">
                        Name
                      </label>
                      <input
                        ref={nameRef}
                        id="gb-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => setValue("name", e.target.value)}
                        placeholder="Your name"
                        className={fieldClass("name")}
                        {...ariaProps("name")}
                      />
                      {errors.name ? (
                        <p
                          id="gb-name-error"
                          className="mt-1 text-micro normal-case text-accent-pink"
                        >
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="gb-email" className="label block">
                        Email
                      </label>
                      <input
                        id="gb-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => setValue("email", e.target.value)}
                        placeholder="you@example.com"
                        className={fieldClass("email")}
                        {...ariaProps("email")}
                      />
                      {errors.email ? (
                        <p
                          id="gb-email-error"
                          className="mt-1 text-micro normal-case text-accent-pink"
                        >
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="gb-message" className="label block">
                        Message
                      </label>
                      <textarea
                        id="gb-message"
                        name="message"
                        rows={2}
                        value={values.message}
                        onChange={(e) => setValue("message", e.target.value)}
                        placeholder="Say hi"
                        className={`${fieldClass("message")} resize-none`}
                        {...ariaProps("message")}
                      />
                      {errors.message ? (
                        <p
                          id="gb-message-error"
                          className="mt-1 text-micro normal-case text-accent-pink"
                        >
                          {errors.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Honeypot — invisible to people, tempting to bots. The
                      name/label must never match autofill vocabulary: a real
                      visitor's Chrome autofilled the old "Company" field and
                      their pin was silently dropped as a bot. */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="gb-botcheck">Leave this field empty</label>
                    <input
                      ref={companyRef}
                      id="gb-botcheck"
                      name="botcheck"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="label">{"// email stays private"}</p>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      className="pill pill-solid min-h-11 disabled:opacity-40"
                      {...(reduced || sending
                        ? {}
                        : {
                            whileHover: { scale: 1.04 },
                            whileTap: { scale: 0.97 },
                          })}
                      transition={SPRING}
                    >
                      {sending ? "Posting…" : "Post"}
                    </motion.button>
                  </div>

                  {formError ? (
                    <p
                      className="mt-3 text-micro normal-case text-accent-pink"
                      role="alert"
                    >
                      {formError}
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>

            {/* Empty state. */}
            {loaded &&
            comments.length === 0 &&
            pendings.length === 0 &&
            !compose ? (
              <p className="label pointer-events-none absolute inset-0 flex items-center justify-center text-center">
                {"// no pins yet — drop the first one"}
              </p>
            ) : null}

            {/* Decorative zoom chip — Figma's bottom-right zoom control. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 z-10 select-none rounded-full border border-rule bg-raised/90 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-paper-dim"
            >
              100%
            </span>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
