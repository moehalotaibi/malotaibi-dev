// Visit counter — one integer in the same Upstash Redis the guestbook uses
// (key "site:visits"). Counted from the day this shipped; there is no way
// to recover visits from before it existed. Server-side only (route
// handler); without the Redis env it is a no-op and the footer shows
// nothing, so local dev and preview builds never fake a number.

// Dev and prod share the same Redis database (same as the guestbook), so
// local runs count against their own key and never touch the live number.
const KEY = process.env.NODE_ENV === "production" ? "site:visits" : "site:visits:dev";

function creds() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command: (string | number)[]): Promise<unknown> {
  const c = creds();
  if (!c) return null;
  const res = await fetch(c.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = (await res.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error(`redis ${command[0]}: ${data.error}`);
  return data.result;
}

export const visitsEnabled = () => creds() !== null;

export async function readVisits(): Promise<number | null> {
  const value = await redis(["GET", KEY]);
  if (value === null || value === undefined) return visitsEnabled() ? 0 : null;
  return Number(value) || 0;
}

export async function countVisit(): Promise<number | null> {
  if (!visitsEnabled()) return null;
  const value = await redis(["INCR", KEY]);
  return Number(value) || 0;
}
