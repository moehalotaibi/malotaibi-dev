// Guestbook API (public).
//
// GET  /api/comments  → { comments: PublicComment[] } — APPROVED pins only,
//      WITHOUT email. Hard privacy rule: emails never leave the server, so
//      the strip happens here, server-side, not in the client.
// POST /api/comments  → validates { name, email, message, x, y, botcheck },
//      saves via the store as approved: false (held for review in /admin),
//      returns { comment: PublicComment } (sans email).
//      - "botcheck" is a honeypot: non-empty → 200 with an unsaved echo, so
//        bots can't tell they were caught.
//      - Naive in-memory per-IP throttle: max 5 posts / 10 min (dev-grade;
//        resets on reload/redeploy — a production build would use a shared
//        rate limiter).

import type { NextRequest } from "next/server";
import {
  commentsStore,
  type NewComment,
  type StoredComment,
} from "@/lib/comments-store";

type PublicComment = Omit<StoredComment, "email" | "approved">;

/** The only shape that ever reaches a client — no email, ever. */
function toPublic(c: StoredComment | NewComment, id?: string): PublicComment {
  return {
    id: "id" in c && typeof c.id === "string" ? c.id : (id ?? "echo"),
    name: c.name,
    message: c.message,
    x: c.x,
    y: c.y,
    createdAt:
      "createdAt" in c && typeof c.createdAt === "string"
        ? c.createdAt
        : new Date().toISOString(),
  };
}

export async function GET() {
  const comments = await commentsStore.listApproved();
  return Response.json({ comments: comments.map((c) => toPublic(c)) });
}

// ------------------------------------------------------------ validation

// Same pragmatic pattern as the contact form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<
  Record<"name" | "email" | "message" | "position", string>
>;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function validPercent(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 100;
}

// --------------------------------------------------------------- throttle

const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 5;
const postTimes = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (postTimes.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_POSTS) {
    postTimes.set(ip, recent);
    return true;
  }
  recent.push(now);
  postTimes.set(ip, recent);
  return false;
}

// ------------------------------------------------------------------ POST

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ errors: { form: "Invalid JSON body." } }, { status: 400 });
  }
  if (!isRecord(raw)) {
    return Response.json({ errors: { form: "Invalid body." } }, { status: 400 });
  }

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  // Renamed from "company" — Chrome autofilled that name for a real visitor
  // and their pin was silently dropped. "botcheck" matches no autofill vocab.
  const botcheck = typeof raw.botcheck === "string" ? raw.botcheck.trim() : "";
  const x = validPercent(raw.x) ? raw.x : null;
  const y = validPercent(raw.y) ? raw.y : null;

  const errors: Errors = {};
  if (name.length < 1 || name.length > 50) errors.name = "1–50 characters.";
  if (email.length > 200 || !EMAIL_RE.test(email))
    errors.email = "Enter a valid email.";
  if (message.length < 1 || message.length > 500)
    errors.message = "1–500 characters.";
  if (x === null || y === null)
    errors.position = "Pin position must be 0–100 numbers.";

  if (x === null || y === null || Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  const comment: NewComment = { name, email, message, x, y };

  // Honeypot filled → pretend it worked, save nothing.
  if (botcheck !== "") {
    return Response.json({ comment: toPublic(comment) });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (throttled(ip)) {
    return Response.json(
      { errors: { form: "Too many pins — try again later." } },
      { status: 429 },
    );
  }

  const saved = await commentsStore.add(comment);
  return Response.json({ comment: toPublic(saved) });
}
