// GHL integration — webhooks, forms, and custom-object events.
// Never import this in a client component; keep URLs/keys server-only.

import { events as localEvents } from "@/lib/data/events";
import type { CampaignEvent as LocalEvent } from "@/lib/data/events";

const GHL_BASE =
  "https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger";

// Shared across all forms that collect a phone number.
// Override at deploy time with GHL_COMPLIANCE_WEBHOOK env var.
export const GHL_COMPLIANCE_WEBHOOK =
  process.env.GHL_COMPLIANCE_WEBHOOK ??
  `${GHL_BASE}/00000000-0000-0000-0000-000000000000`;

export const GHL_WEBHOOKS = {
  contact: `${GHL_BASE}/cf2eced9-14ad-4109-ba4f-fd244858af10`,
  volunteer: [
    `${GHL_BASE}/23834100-4e00-4579-82e7-f9ec69ed8542`,
    `${GHL_BASE}/df947411-0c7e-4a6c-8c2e-7f20291c333f`,
    `${GHL_BASE}/19e7758c-f5c5-44fa-a770-5c18cefa0645`
  ] as const,
  issue: `${GHL_BASE}/3c2d23be-00aa-49d5-9d14-6597d2e93123`,
  rsvp: `${GHL_BASE}/b8b53720-18c4-4cde-9db9-c549de6264ee`
} as const;

export const GHL_APPOINTMENT_CALENDAR_ID = "UTM5EkrGwiZjQyc19WGN";

const GHL_REST_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const EVENTS_SCHEMA_KEY = "custom_objects.events";

export function baseFields(type: string, source: string) {
  return {
    type,
    source,
    submitted_at: new Date().toISOString()
  };
}

export function splitName(full: string): {
  firstName: string;
  lastName: string;
} {
  const parts = full.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" ")
  };
}

export async function postGhlWebhook(
  url: string,
  payload: Record<string, unknown>
) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function postGhlWebhooksParallel(
  urls: readonly string[],
  payload: Record<string, unknown>
) {
  const results = await Promise.all(
    urls.map((u) =>
      postGhlWebhook(u, payload).catch(
        () =>
          ({ ok: false, status: 0 }) as Pick<Response, "ok" | "status">
      )
    )
  );
  return {
    anySuccess: results.some((r) => r.ok),
    results
  };
}

// A2P-compliant SMS consent copy, keyed to Alex Morgan for Senate.
export const SMS_CONSENT_UPDATES =
  "By checking this box, I consent to receive campaign updates from Alex Morgan for Senate via automated text messages at the phone number provided. Message frequency may vary. Message and data rates may apply. Text STOP to opt out or HELP for help. View our Privacy Policy and Terms of Service.";

export const SMS_CONSENT_PROMO =
  "By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from Alex Morgan for Senate via automated text messages. Message frequency may vary. Message and data rates may apply. Text STOP to opt out or HELP for help.";

// ------------------------------------------------------------------
// Events — GHL Custom Object (custom_objects.events)
// ------------------------------------------------------------------

export const TIME_LABELS: Record<string, string> = {
  "600_am": "6:00 AM",
  "630_am": "6:30 AM",
  "700_am": "7:00 AM",
  "730_am": "7:30 AM",
  "800_am": "8:00 AM",
  "830_am": "8:30 AM",
  "900_am": "9:00 AM",
  "930_am": "9:30 AM",
  "1000_am": "10:00 AM",
  "1030_am": "10:30 AM",
  "1100_am": "11:00 AM",
  "1130_am": "11:30 AM",
  "1200_pm": "12:00 PM",
  "1230_pm": "12:30 PM",
  "100_pm": "1:00 PM",
  "130_pm": "1:30 PM",
  "200_pm": "2:00 PM",
  "230_pm": "2:30 PM",
  "300_pm": "3:00 PM",
  "330_pm": "3:30 PM",
  "400_pm": "4:00 PM",
  "430_pm": "4:30 PM",
  "500_pm": "5:00 PM",
  "530_pm": "5:30 PM",
  "600_pm": "6:00 PM",
  "630_pm": "6:30 PM",
  "700_pm": "7:00 PM",
  "730_pm": "7:30 PM",
  "800_pm": "8:00 PM",
  "830_pm": "8:30 PM",
  "900_pm": "9:00 PM"
};

export const CATEGORY_LABELS: Record<string, string> = {
  rally: "Rally",
  town_hall: "Town Hall",
  fundraiser: "Fundraiser",
  debate: "Debate",
  press_conference: "Press Conference",
  community_meetup: "Community Meetup",
  volunteer_drive: "Volunteer Drive",
  doortodoor_campaign: "Door-to-Door Campaign",
  victory_celebration: "Victory Celebration",
  protest__march: "Protest / March",
  other: "Other"
};

export type NormalizedEventDate = {
  month: string;
  day: string;
  year: string;
  raw: string;
};

export type NormalizedEvent = {
  id: string;
  title: string;
  description: string;
  date: NormalizedEventDate;
  endDate: NormalizedEventDate | null;
  time: string;
  endTime: string;
  location: string;
  address: string;
  image: string;
  type: string;
  source: string;
  // Non-spec extensions kept so existing UI can still show city/venue split.
  city: string;
  venue: string;
  rsvpUrl: string;
};

const EMPTY_DATE: NormalizedEventDate = {
  month: "",
  day: "",
  year: "",
  raw: ""
};

export function parseDate(
  dateStr: string | null | undefined
): NormalizedEventDate | null {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: String(d.getDate()).padStart(2, "0"),
    year: String(d.getFullYear()),
    raw: dateStr
  };
}

type GhlRecord = {
  id?: string;
  properties?: {
    event_name?: string;
    event_description?: string;
    event_date?: string;
    event_end_date?: string;
    select_time?: string;
    end_time?: string;
    event_location?: string;
    event_category?: string;
    event_image?: Array<{ url?: string } | undefined>;
  };
};

export function normalizeEvent(record: GhlRecord): NormalizedEvent {
  const props = record.properties ?? {};
  const date = parseDate(props.event_date) ?? EMPTY_DATE;
  const endDate = parseDate(props.event_end_date);
  const timeSlug = props.select_time ?? "";
  const endTimeSlug = props.end_time ?? "";
  const categorySlug = props.event_category ?? "";
  const image =
    Array.isArray(props.event_image) && props.event_image[0]?.url
      ? (props.event_image[0].url as string)
      : "/placeholder-event.svg";

  const location = props.event_location ?? "";
  // Best-effort split: "Crest Theatre, 1013 K Street, Sacramento"
  //                    → venue "Crest Theatre, 1013 K Street", city "Sacramento"
  const parts = location.split(",").map((s) => s.trim()).filter(Boolean);
  const city = parts.length > 1 ? (parts[parts.length - 1] as string) : "";
  const venue =
    parts.length > 1 ? parts.slice(0, -1).join(", ") : location;

  return {
    id: record.id ?? "",
    title: props.event_name ?? "",
    description: props.event_description ?? "",
    date,
    endDate,
    time: TIME_LABELS[timeSlug] ?? timeSlug ?? "",
    endTime: TIME_LABELS[endTimeSlug] ?? endTimeSlug ?? "",
    location,
    address: location,
    image,
    type: CATEGORY_LABELS[categorySlug] ?? categorySlug ?? "",
    source: "ghl",
    city,
    venue,
    rsvpUrl: "#rsvp"
  };
}

// Convert a local static event (src/lib/data/events.ts shape) to NormalizedEvent
function localToNormalized(e: LocalEvent): NormalizedEvent {
  const date = parseDate(e.date) ?? EMPTY_DATE;
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    date,
    endDate: null,
    time: e.time,
    endTime: "",
    location: `${e.venue}, ${e.city}`,
    address: e.venue,
    image: "/placeholder-event.svg",
    type: "Event",
    source: "local",
    city: e.city,
    venue: e.venue,
    rsvpUrl: e.rsvpUrl
  };
}

function ghlConfigured(): boolean {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

export async function fetchGHLEvents(): Promise<NormalizedEvent[]> {
  if (!ghlConfigured()) {
    return localEvents
      .map(localToNormalized)
      .sort((a, b) => {
        const da = a.date.raw ? new Date(a.date.raw).getTime() : 0;
        const db = b.date.raw ? new Date(b.date.raw).getTime() : 0;
        return da - db;
      });
  }

  try {
    const res = await fetch(
      `${GHL_REST_BASE}/objects/${EVENTS_SCHEMA_KEY}/records/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          Version: GHL_VERSION,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locationId: process.env.GHL_LOCATION_ID,
          page: 1,
          pageLimit: 50,
          query: "",
          searchAfter: []
        }),
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) return [];
    const data = (await res.json()) as { records?: GhlRecord[] };
    const records = data.records ?? [];

    return records
      .map(normalizeEvent)
      .sort((a, b) => {
        const da = a.date.raw ? new Date(a.date.raw).getTime() : 0;
        const db = b.date.raw ? new Date(b.date.raw).getTime() : 0;
        return da - db;
      });
  } catch {
    return [];
  }
}

export async function fetchGHLEvent(
  eventId: string
): Promise<NormalizedEvent | null> {
  if (!ghlConfigured()) {
    const event = localEvents.find((e) => e.id === eventId);
    return event ? localToNormalized(event) : null;
  }

  try {
    const res = await fetch(
      `${GHL_REST_BASE}/objects/${EVENTS_SCHEMA_KEY}/records/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          Version: GHL_VERSION,
          Accept: "application/json"
        },
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) return null;
    const data = (await res.json()) as
      | { record?: GhlRecord }
      | GhlRecord;
    const record: GhlRecord =
      (data as { record?: GhlRecord }).record ?? (data as GhlRecord);
    if (!record?.id && !record?.properties) return null;
    return normalizeEvent(record);
  } catch {
    return null;
  }
}
