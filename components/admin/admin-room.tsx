"use client";

// Guestbook review room (Moe only). No stored key → a single centered
// password prompt; the key is checked by calling the admin API and kept in
// localStorage on success. A wrong key gets a 401 → the prompt shakes and
// clears. With a key: pending pins as cards (name, email — the admin may
// see emails — message, time, position preview) with Approve / Delete
// pills, and the approved list below with Delete so anything can be
// removed later. A stored key that stops working (rotated env) is dropped
// and the prompt returns. Reduced motion: no shake, instant states.
//
// The stored key is read through useSyncExternalStore (server snapshot:
// none) and verified by a pure checkKey() helper whose result is applied
// inside promise callbacks — no synchronous setState in effects.

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { StoredComment } from "@/lib/comments-store";
import { timeAgo } from "@/lib/time-ago";

const STORAGE_KEY = "guestbook-admin-key";
const API = "/api/admin/comments";

type Lists = { pending: StoredComment[]; approved: StoredComment[] };

type KeyCheck =
  | { status: "ok"; lists: Lists }
  | { status: "unauthorized" }
  | { status: "error" };

// Mini canvas thumbnail — same dot grid at map scale, marker at x/y%.
const MINI_GRID: CSSProperties = {
  backgroundImage: "radial-gradient(#262723 1px, transparent 1px)",
  backgroundSize: "8px 8px",
};

const FIELD_CLASS =
  "mt-3 block w-full rounded-xl border border-rule bg-ink px-4 py-3 text-body text-paper placeholder:text-paper-dim";

function authHeaders(key: string): HeadersInit {
  return { Authorization: `Bearer ${key}` };
}

/** Verify a key against the admin API. Never throws. */
async function checkKey(candidate: string): Promise<KeyCheck> {
  try {
    const res = await fetch(API, {
      headers: authHeaders(candidate),
      cache: "no-store",
    });
    if (res.status === 401) return { status: "unauthorized" };
    if (!res.ok) return { status: "error" };
    const data = (await res.json()) as Partial<Lists>;
    return {
      status: "ok",
      lists: {
        pending: Array.isArray(data.pending) ? data.pending : [],
        approved: Array.isArray(data.approved) ? data.approved : [],
      },
    };
  } catch {
    return { status: "error" };
  }
}

// Stored key as an external store — same pattern as the site's matchMedia
// gates. Own-tab writes re-read on the next render; other tabs via the
// storage event.
function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}
const getStoredKey = () => window.localStorage.getItem(STORAGE_KEY);
const getStoredKeyServer = () => null;

/** Position preview — where the pin sits on the canvas. */
function MiniMap({ x, y, approved }: { x: number; y: number; approved: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-rule bg-ink"
      style={MINI_GRID}
    >
      <span
        className={`absolute block h-2.5 w-2.5 -translate-y-full rounded-full rounded-bl-[2px] ${
          approved ? "bg-accent-green" : "bg-accent-amber"
        }`}
        style={{ left: `${x}%`, top: `${y}%` }}
      />
    </span>
  );
}

function PinCard({
  comment,
  approved,
  busy,
  onApprove,
  onDelete,
}: {
  comment: StoredComment;
  approved: boolean;
  busy: boolean;
  onApprove?: () => void;
  onDelete: () => void;
}) {
  return (
    <li className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 basis-64">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-meta font-medium text-cream">{comment.name}</p>
            <p className="label normal-case tracking-normal text-paper-dim">
              {comment.email}
            </p>
          </div>
          <p className="mt-3 whitespace-pre-wrap break-words text-meta text-paper">
            {comment.message}
          </p>
          <p className="label mt-3 normal-case tracking-normal text-paper-dim">
            {timeAgo(comment.createdAt)} · x {Math.round(comment.x)} / y{" "}
            {Math.round(comment.y)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <MiniMap x={comment.x} y={comment.y} approved={approved} />
          <div className="flex flex-col gap-2">
            {onApprove ? (
              <button
                type="button"
                disabled={busy}
                onClick={onApprove}
                aria-label={`Approve pin from ${comment.name}`}
                className="pill min-h-11 justify-center disabled:opacity-40"
              >
                ✓ Approve
              </button>
            ) : null}
            <button
              type="button"
              disabled={busy}
              onClick={onDelete}
              aria-label={`Delete pin from ${comment.name}`}
              className="pill min-h-11 justify-center disabled:opacity-40"
            >
              ✗ Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function AdminRoom() {
  const reduced = useReducedMotion();
  const storedKey = useSyncExternalStore(
    subscribeStorage,
    getStoredKey,
    getStoredKeyServer,
  );

  const [key, setKey] = useState<string | null>(null); // verified key
  const [lists, setLists] = useState<Lists | null>(null);
  const [bootDone, setBootDone] = useState(false); // stored-key check finished
  const [checking, setChecking] = useState(false);
  const [denied, setDenied] = useState(0); // increments → prompt shake
  const [promptError, setPromptError] = useState(false); // network, not 401
  const [input, setInput] = useState("");
  const [busyIds, setBusyIds] = useState<ReadonlySet<string>>(() => new Set());
  const [actionError, setActionError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const applyCheck = useCallback(
    (candidate: string, result: KeyCheck, fromStorage: boolean) => {
      if (result.status === "ok") {
        window.localStorage.setItem(STORAGE_KEY, candidate);
        setKey(candidate);
        setLists(result.lists);
        return;
      }
      if (result.status === "unauthorized") {
        window.localStorage.removeItem(STORAGE_KEY);
        setKey(null);
        setLists(null);
        setInput("");
        // A stale stored key just returns to the prompt; a typed wrong key
        // shakes it.
        if (!fromStorage) setDenied((d) => d + 1);
        return;
      }
      setPromptError(true);
    },
    [],
  );

  // Boot: try the stored key once. All setState lives in the callbacks.
  const attemptedRef = useRef(false);
  useEffect(() => {
    if (!storedKey || attemptedRef.current) return;
    attemptedRef.current = true;
    let cancelled = false;
    checkKey(storedKey)
      .then((result) => {
        if (!cancelled) applyCheck(storedKey, result, true);
      })
      .finally(() => {
        if (!cancelled) setBootDone(true);
      });
    return () => {
      cancelled = true;
    };
  }, [storedKey, applyCheck]);

  // Refocus the key field after a shake clears it.
  useEffect(() => {
    if (denied > 0) inputRef.current?.focus();
  }, [denied]);

  const onPromptSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const candidate = input.trim();
    if (!candidate || checking) return;
    setChecking(true);
    setPromptError(false);
    void checkKey(candidate).then((result) => {
      applyCheck(candidate, result, false);
      setChecking(false);
    });
  };

  const act = async (id: string, kind: "approve" | "delete") => {
    if (!key || busyIds.has(id)) return;
    setActionError(false);
    setBusyIds((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(API, {
        method: kind === "approve" ? "POST" : "DELETE",
        headers: { ...authHeaders(key), "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.status === 401) {
        // Key rotated under us — back to the prompt.
        window.localStorage.removeItem(STORAGE_KEY);
        setKey(null);
        setLists(null);
        setInput("");
        return;
      }
      if (!res.ok) throw new Error();
      setLists((prev) => {
        if (!prev) return prev;
        if (kind === "delete") {
          return {
            pending: prev.pending.filter((c) => c.id !== id),
            approved: prev.approved.filter((c) => c.id !== id),
          };
        }
        const moved = prev.pending.find((c) => c.id === id);
        return {
          pending: prev.pending.filter((c) => c.id !== id),
          approved: moved
            ? [...prev.approved, { ...moved, approved: true }]
            : prev.approved,
        };
      });
    } catch {
      setActionError(true);
    } finally {
      setBusyIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // ------------------------------------------------------------ states

  const authed = key !== null && lists !== null;

  // A stored key is still being checked — hold the room, not the prompt.
  if (!authed && storedKey && !bootDone) {
    return (
      <section className="shell flex min-h-[70vh] items-center justify-center pb-section pt-24">
        <p className="label">{"// loading"}</p>
      </section>
    );
  }

  // Key prompt — one field, no explanation.
  if (!authed) {
    return (
      <section className="shell flex min-h-[70vh] items-center justify-center pb-section pt-24">
        <motion.form
          key={denied}
          onSubmit={onPromptSubmit}
          className="card w-full max-w-sm p-6"
          initial={false}
          animate={
            denied > 0 && !reduced ? { x: [0, -10, 10, -6, 6, 0] } : undefined
          }
          transition={{ duration: 0.4 }}
        >
          <label htmlFor="admin-key" className="label block">
            {"// admin key"}
          </label>
          <input
            ref={inputRef}
            id="admin-key"
            name="key"
            type="password"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={checking}
            className={FIELD_CLASS}
            aria-invalid={denied > 0}
          />
          {promptError ? (
            <p className="mt-3 text-micro normal-case text-accent-pink" role="alert">
              Couldn&apos;t reach the API. Try again.
            </p>
          ) : null}
        </motion.form>
      </section>
    );
  }

  // ------------------------------------------------------------- room

  return (
    <section className="shell pb-section pt-24 md:pt-28">
      <p className="label">{"// guestbook — review room"}</p>
      <h1 className="mt-6 font-display text-h2 font-semibold text-cream">
        Guestbook admin.
      </h1>

      {actionError ? (
        <p className="mt-6 text-meta text-accent-pink" role="alert">
          Action failed. Try again.
        </p>
      ) : null}

      <h2 className="label mt-12">{"// pending"}</h2>
      {lists.pending.length === 0 ? (
        <p className="label mt-4 normal-case tracking-normal text-paper-dim">
          {"// nothing pending"}
        </p>
      ) : (
        <ul className="mt-4 grid gap-4">
          {lists.pending.map((comment) => (
            <PinCard
              key={comment.id}
              comment={comment}
              approved={false}
              busy={busyIds.has(comment.id)}
              onApprove={() => void act(comment.id, "approve")}
              onDelete={() => void act(comment.id, "delete")}
            />
          ))}
        </ul>
      )}

      <h2 className="label mt-14">{"// approved"}</h2>
      {lists.approved.length === 0 ? (
        <p className="label mt-4 normal-case tracking-normal text-paper-dim">
          {"// none approved"}
        </p>
      ) : (
        <ul className="mt-4 grid gap-4">
          {lists.approved.map((comment) => (
            <PinCard
              key={comment.id}
              comment={comment}
              approved
              busy={busyIds.has(comment.id)}
              onDelete={() => void act(comment.id, "delete")}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
