import { NextResponse } from "next/server";
import { getAgendaEvents } from "@/sanity/lib/events";

export const revalidate = 60;

export async function GET() {
  const events = await getAgendaEvents();
  return NextResponse.json({ events, total: events.length });
}
