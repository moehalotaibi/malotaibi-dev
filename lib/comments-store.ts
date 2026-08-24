// Guestbook pins — storage behind a tiny interface so the backend can swap
// without touching the API routes.
//
// Two implementations, picked by env at module load:
// - Upstash Redis over its REST API (KV_REST_API_URL/TOKEN — the same vars
//   Vercel injects for the connected database). One hash, field per pin, so
//   concurrent writes can't clobber each other. This is production.
// - A JSON file at .data/comments.json (gitignored) when the env is absent —
//   keeps local dev working with zero setup.
//
// Moderation: new pins save as approved: false and only show publicly after
// Moe approves them in /admin (approve()). remove() deletes outright.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type StoredComment = {
  id: string;
  name: string;
  /** PRIVATE — never reaches a public payload. Only the admin API may send it. */
  email: string;
  message: string;
  /** Canvas position, percentages 0–100 of the canvas width/height. */
  x: number;
  y: number;
  /** ISO 8601. */
  createdAt: string;
  approved: boolean;
};

export type NewComment = Pick<
  StoredComment,
  "name" | "email" | "message" | "x" | "y"
>;

/** The swap point: the API routes only know this interface. */
export interface CommentsStore {
  /** Approved pins, oldest first. */
  listApproved(): Promise<StoredComment[]>;
  /** Pins awaiting review, oldest first. */
  listPending(): Promise<StoredComment[]>;
  /** Persist a new pin (approved: false); returns it with id/createdAt filled. */
  add(comment: NewComment): Promise<StoredComment>;
  /** Mark a pin approved. Returns the updated pin, or null if unknown id. */
  approve(id: string): Promise<StoredComment | null>;
  /** Delete a pin (pending or approved). Returns false if unknown id. */
  remove(id: string): Promise<boolean>;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "comments.json");

// First read seeds one approved pin from Moe so the canvas never looks dead.
// (Seed copy flagged for Moe's review — reword freely.)
const SEED: StoredComment[] = [
  {
    id: "seed-moe",
    name: "moe.",
    email: "moe.halotaibi@gmail.com",
    message: "drop a pin anywhere — welcome to my canvas",
    x: 18,
    y: 35,
    createdAt: "2026-08-24T09:00:00.000Z",
    approved: true,
  },
];

// Reads and writes run through one promise chain so concurrent requests
// can't interleave partial file writes.
let queue: Promise<unknown> = Promise.resolve();
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<StoredComment[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) throw new Error("comments.json is not a list");
    return parsed as StoredComment[];
  } catch {
    // Missing (first run) or unreadable file — recreate it with the seed.
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(SEED, null, 2), "utf8");
    return [...SEED];
  }
}

async function writeAll(all: StoredComment[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf8");
}

const jsonFileStore: CommentsStore = {
  listApproved() {
    return enqueue(async () => (await readAll()).filter((c) => c.approved));
  },
  listPending() {
    return enqueue(async () => (await readAll()).filter((c) => !c.approved));
  },
  add(comment) {
    return enqueue(async () => {
      const all = await readAll();
      const saved: StoredComment = {
        id: randomUUID(),
        ...comment,
        createdAt: new Date().toISOString(),
        approved: false, // held for review in /admin
      };
      all.push(saved);
      await writeAll(all);
      return saved;
    });
  },
  approve(id) {
    return enqueue(async () => {
      const all = await readAll();
      const found = all.find((c) => c.id === id);
      if (!found) return null;
      found.approved = true;
      await writeAll(all);
      return found;
    });
  },
  remove(id) {
    return enqueue(async () => {
      const all = await readAll();
      const next = all.filter((c) => c.id !== id);
      if (next.length === all.length) return false;
      await writeAll(next);
      return true;
    });
  },
};

// ---------------------------------------------------------------- redis
// Upstash REST: POST the command as a JSON array; response is { result }.
// Pins live in one hash — field = pin id, value = the pin as JSON.

const REDIS_URL = process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN;
const HASH_KEY = "guestbook:comments";

async function redis(command: (string | number)[]): Promise<unknown> {
  const response = await fetch(REDIS_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`redis ${command[0]} failed: ${response.status}`);
  }
  const data = (await response.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error(`redis ${command[0]}: ${data.error}`);
  return data.result;
}

async function redisReadAll(): Promise<StoredComment[]> {
  // HGETALL returns a flat [field, value, field, value, ...] array.
  const flat = (await redis(["HGETALL", HASH_KEY])) as string[] | null;
  if (!flat || flat.length === 0) {
    // First run on an empty database — plant the seed pin.
    await redis(["HSET", HASH_KEY, SEED[0].id, JSON.stringify(SEED[0])]);
    return [...SEED];
  }
  const all: StoredComment[] = [];
  for (let i = 1; i < flat.length; i += 2) {
    try {
      all.push(JSON.parse(flat[i]) as StoredComment);
    } catch {
      // Skip an unparseable field rather than failing the whole list.
    }
  }
  all.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return all;
}

const redisStore: CommentsStore = {
  async listApproved() {
    return (await redisReadAll()).filter((c) => c.approved);
  },
  async listPending() {
    return (await redisReadAll()).filter((c) => !c.approved);
  },
  async add(comment) {
    const saved: StoredComment = {
      id: randomUUID(),
      ...comment,
      createdAt: new Date().toISOString(),
      approved: false, // held for review in /admin
    };
    await redis(["HSET", HASH_KEY, saved.id, JSON.stringify(saved)]);
    return saved;
  },
  async approve(id) {
    const raw = (await redis(["HGET", HASH_KEY, id])) as string | null;
    if (!raw) return null;
    const found = JSON.parse(raw) as StoredComment;
    found.approved = true;
    await redis(["HSET", HASH_KEY, id, JSON.stringify(found)]);
    return found;
  },
  async remove(id) {
    const removed = (await redis(["HDEL", HASH_KEY, id])) as number;
    return removed > 0;
  },
};

export const commentsStore: CommentsStore =
  REDIS_URL && REDIS_TOKEN ? redisStore : jsonFileStore;
