import { NextResponse } from "next/server";

import { GHL_WEBHOOKS, baseFields, postGhlWebhook, splitName } from "@/lib/ghl";

// Maps our "Ask Alex" form to the Issue_Report GHL workflow:
//  - name          → firstName + lastName (split)
//  - city          → issue_location
//  - topic         → issue_category
//  - subject       → issue_subject
//  - question      → issue_description
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      city = "",
      topic = "",
      subject = "",
      question
    } = body ?? {};

    if (
      !name?.trim() ||
      !email?.trim() ||
      !question?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { firstName, lastName } = splitName(name);

    const payload = {
      ...baseFields("Issue_Report", "src_ask"),
      firstName,
      lastName,
      email,
      issue_category: topic,
      issue_location: city,
      issue_subject:
        subject?.trim() || `Question from ${firstName || "a supporter"}`,
      issue_description: question,
      issue_image: ""
    };

    const res = await postGhlWebhook(GHL_WEBHOOKS.issue, payload);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream failure" },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
