// Guestbook API (admin — Moe only).
//
// All methods require Authorization: Bearer <COMMENTS_ADMIN_KEY>; anything
// else gets a 401. Admin responses MAY include emails — this is the one
// place they're allowed to leave the server (Moe reviews who wrote what).
//
// GET    → { pending, approved } — full stored pins, oldest first.
// POST   → { id } — approve a pending pin; returns the updated pin.
// DELETE → { id } — delete any pin (pending spam or an approved one later).

import type { NextRequest } from "next/server";
import { commentsStore } from "@/lib/comments-store";

function authorized(request: NextRequest): boolean {
  const key = process.env.COMMENTS_ADMIN_KEY;
  if (!key) return false;
  return request.headers.get("authorization") === `Bearer ${key}`;
}

const unauthorized = () =>
  Response.json({ error: "Unauthorized." }, { status: 401 });

async function readId(request: NextRequest): Promise<string | null> {
  const raw = (await request.json().catch(() => null)) as unknown;
  if (typeof raw !== "object" || raw === null) return null;
  const id = (raw as Record<string, unknown>).id;
  return typeof id === "string" && id.length > 0 ? id : null;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return unauthorized();
  const [pending, approved] = await Promise.all([
    commentsStore.listPending(),
    commentsStore.listApproved(),
  ]);
  return Response.json({ pending, approved });
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return unauthorized();
  const id = await readId(request);
  if (!id) {
    return Response.json({ error: "Missing id." }, { status: 400 });
  }
  const approved = await commentsStore.approve(id);
  if (!approved) {
    return Response.json({ error: "Unknown id." }, { status: 404 });
  }
  return Response.json({ comment: approved });
}

export async function DELETE(request: NextRequest) {
  if (!authorized(request)) return unauthorized();
  const id = await readId(request);
  if (!id) {
    return Response.json({ error: "Missing id." }, { status: 400 });
  }
  const removed = await commentsStore.remove(id);
  if (!removed) {
    return Response.json({ error: "Unknown id." }, { status: 404 });
  }
  return Response.json({ ok: true });
}
