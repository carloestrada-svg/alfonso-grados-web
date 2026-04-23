import { NextResponse } from "next/server";

import {
  GHL_WEBHOOKS,
  GHL_COMPLIANCE_WEBHOOK,
  baseFields,
  postGhlWebhooksParallel
} from "@/lib/ghl";
import { normalizePhoneForSubmit } from "@/lib/phone";

const WEBHOOK_URLS = [GHL_WEBHOOKS.rsvp, GHL_COMPLIANCE_WEBHOOK];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone = "",
      eventName = "",
      eventDate = "",
      eventTime = "",
      eventCategory = "",
      sms_updates = "No",
      sms_promo = "No"
    } = body ?? {};

    if (!firstName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      ...baseFields("Event_RSVP", "src_event"),
      firstName,
      lastName,
      email,
      phone: normalizePhoneForSubmit(phone),
      eventName,
      eventDate,
      eventTime,
      eventCategory,
      sms_updates,
      sms_promo
    };

    const { anySuccess } = await postGhlWebhooksParallel(
      WEBHOOK_URLS,
      payload
    );

    if (!anySuccess) {
      return NextResponse.json(
        { error: "Webhook delivery failed" },
        { status: 502 }
      );
    }

    // Optional: appointment creation (extended RSVP flow). Requires GHL REST API
    // credentials in env vars. If missing, skip — the webhook already ran.
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    let contactId: string | null = null;

    if (apiKey && locationId) {
      try {
        await new Promise((r) => setTimeout(r, 2000));

        const search = await fetch(
          `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(email)}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Version: "2021-07-28"
            }
          }
        );
        if (search.ok) {
          const data = (await search.json()) as {
            contact?: { id?: string };
          };
          contactId = data.contact?.id ?? null;
        }

        if (contactId && eventDate && eventTime) {
          const startTime = new Date(
            `${eventDate}T${toIsoTime(eventTime)}`
          ).toISOString();
          const endTime = new Date(
            new Date(startTime).getTime() + 60 * 60 * 1000
          ).toISOString();

          await fetch(
            "https://services.leadconnectorhq.com/calendars/events/appointments",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                Version: "2021-07-28",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                calendarId: "UTM5EkrGwiZjQyc19WGN",
                locationId,
                contactId,
                title: `RSVP: ${eventName}`,
                appointmentStatus: "confirmed",
                startTime,
                endTime,
                timezone: "America/Los_Angeles",
                notes: "RSVP submitted via campaign website"
              })
            }
          );
        }
      } catch {
        /* appointment failure is non-fatal — the webhook already succeeded */
      }
    }

    return NextResponse.json({ success: true, contactId });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function toIsoTime(t: string): string {
  const match = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return "00:00:00";
  let h = Number(match[1]);
  const m = match[2];
  const ap = match[3]?.toUpperCase();
  if (ap === "PM" && h < 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m}:00`;
}
