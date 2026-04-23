import { NextResponse } from "next/server";

import { fetchGHLEvent } from "@/lib/ghl";

export const revalidate = 60;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await fetchGHLEvent(id);
    return event
      ? NextResponse.json({ event })
      : NextResponse.json({ event: null }, { status: 404 });
  } catch (error) {
    console.error("[Event API]:", error);
    return NextResponse.json({ event: null }, { status: 500 });
  }
}
