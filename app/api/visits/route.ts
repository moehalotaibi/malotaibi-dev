// GET  /api/visits → { visits }   current total (null when not configured)
// POST /api/visits → { visits }   counts one visit, returns the new total
//
// Every page load counts (Moe's call: "make it refresh every time"). Only
// real browsers run the client that POSTs, so crawlers and curl don't
// inflate it. Nothing about the visitor is stored. Dynamic route: never
// cached.

import { NextResponse } from "next/server";
import { countVisit, readVisits } from "@/lib/visits";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ visits: await readVisits() });
  } catch {
    return NextResponse.json({ visits: null }, { status: 503 });
  }
}

export async function POST() {
  try {
    return NextResponse.json({ visits: await countVisit() });
  } catch {
    return NextResponse.json({ visits: null }, { status: 503 });
  }
}
