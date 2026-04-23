import { NextResponse } from "next/server";

import {
  GHL_WEBHOOKS,
  GHL_COMPLIANCE_WEBHOOK,
  baseFields,
  postGhlWebhooksParallel
} from "@/lib/ghl";
import { normalizePhoneForSubmit } from "@/lib/phone";

const WEBHOOK_URLS = [
  ...GHL_WEBHOOKS.volunteer,
  GHL_COMPLIANCE_WEBHOOK
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone = "",
      zipCode = "",
      county = "",
      region = "",
      registeredVoter = "",
      campaignExperience = "",
      helpOptions = "",
      availability = "",
      issues = "",
      anythingElse = "",
      sms_updates = "No",
      sms_promo = "No"
    } = body ?? {};

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      ...baseFields("Volunteer_Form", "src_volunteer"),
      firstName,
      lastName,
      email,
      phone: normalizePhoneForSubmit(phone),
      zipCode,
      county,
      region,
      registeredVoter,
      campaignExperience,
      helpOptions,
      availability,
      issues,
      anythingElse,
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
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
