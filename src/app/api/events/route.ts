import { NextResponse } from "next/server";

import { events } from "@/lib/data/events";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({ events, total: events.length });
}
