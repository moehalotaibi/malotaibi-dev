// GET  /api/visits → { visits }        current total (null when not configured)
// POST /api/visits → { visits }        counts this browser once per day, then
//                                       returns the total
//
// Dedupe is a plain cookie holding today's date (no id, no IP, nothing
// personal): a browser that already counted today is not counted again.
// Only real browsers run the client that POSTs, so crawlers and curl don't
// inflate it. Dynamic route: never cached.

import { NextResponse } from "next/server";
import { countVisit, readVisits } from "@/lib/visits";

export const dynamic = "force-dynamic";

const COOKIE = "counted";

const today = () => new Date().toISOString().slice(0, 10);

export async function GET() {
  try {
    return NextResponse.json({ visits: await readVisits() });
  } catch {
    return NextResponse.json({ visits: null }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const cookie = request.headers
      .get("cookie")
      ?.split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${COOKIE}=`))
      ?.slice(COOKIE.length + 1);
    const date = today();
    const visits = cookie === date ? await readVisits() : await countVisit();
    const res = NextResponse.json({ visits });
    if (cookie !== date) {
      res.cookies.set(COOKIE, date, {
        path: "/",
        maxAge: 60 * 60 * 36,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      });
    }
    return res;
  } catch {
    return NextResponse.json({ visits: null }, { status: 503 });
  }
}
