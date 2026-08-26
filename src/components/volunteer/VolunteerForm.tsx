"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  FieldLabel,
  TextField,
  TextAreaField
} from "@/components/shared/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { CA_COUNTIES, CA_REGIONS } from "@/lib/data/california";
import { formatPhoneInput } from "@/lib/phone";

const helpChoices = [
  { value: "Phone Banking", label: "Phone banking" },
  { value: "Volunteer Coordination", label: "Volunteer coordination" },
  { value: "Digital/Social Media", label: "Digital / social media" },
  { value: "Door Knocking", label: "Door knocking" },
  { value: "Host a Meet & Greet", label: "Host a meet & greet" },
  { value: "Event Planning", label: "Event planning" },
  { value: "Media", label: "Media" }
];

export function VolunteerForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [helpOptions, setHelpOptions] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [smsPromo, setSmsPromo] = useState(false);

  const hasPhone = phone.trim().length > 0;

  useEffect(() => {
    if (!hasPhone) {
      setSmsUpdates(false);
      setSmsPromo(false);
    }
  }, [hasPhone]);

  const toggleHelp = (value: string) => {
    setHelpOptions((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);

        if (helpOptions.length === 0) {
          setError("Pick at least one way to help.");
          return;
        }

        setSubmitting(true);
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
          const res = await fetch("/api/volunteer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: data.get("firstName"),
              lastName: data.get("lastName"),
              email: data.get("email"),
              phone,
              zipCode: data.get("zipCode") ?? "",
              county: data.get("county") ?? "",
              region: data.get("region") ?? "",
              registeredVoter: data.get("registeredVoter") ?? "",
              campaignExperience: data.get("campaignExperience") ?? "",
              helpOptions: helpOptions.join(", "),
              availability: data.get("availability") ?? "",
              issues: data.get("issues") ?? "",
              anythingElse: data.get("anythingElse") ?? "",
              sms_updates: smsUpdates ? "Yes" : "No",
              sms_promo: smsPromo ? "Yes" : "No"
            })
          });
          if (!res.ok) throw new Error("Submission failed");
          router.push("/thank-you");
        } catch {
          setError("Something went wrong. Please try again.");
          setSubmitting(false);
        }
      }}
      className="flex flex-col gap-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="flex flex-col gap-3">
          <FieldLabel index="01" label="First name" htmlFor="vf-first" />
          <TextField
            id="vf-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Alex"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="02" label="Last name" htmlFor="vf-last" />
          <TextField
            id="vf-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Morgan"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="03" label="Email" htmlFor="vf-email" />
          <TextField
            id="vf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="04"
            label="Phone"
            htmlFor="vf-phone"
            hint="Optional · For shift reminders"
          />
          <TextField
            id="vf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (916) 555-0123"
            value={phone}
            onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="05"
            label="Zip code"
            htmlFor="vf-zip"
            hint="For neighborhood matching"
          />
          <TextField
            id="vf-zip"
            name="zipCode"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            autoComplete="postal-code"
            placeholder="95814"
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="06" label="County" htmlFor="vf-county" />
          <Select name="county">
            <SelectTrigger id="vf-county">
              <SelectValue placeholder="Select your county" />
            </SelectTrigger>
            <SelectContent>
              {CA_COUNTIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="07" label="Region" htmlFor="vf-region" />
          <Select name="region" required>
            <SelectTrigger id="vf-region">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {CA_REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="08"
            label="Registered to vote in CA?"
            htmlFor="vf-voter"
          />
          <Select name="registeredVoter" required>
            <SelectTrigger id="vf-voter">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="09"
          label="Prior campaign experience?"
          htmlFor="vf-exp"
        />
        <Select name="campaignExperience" required>
          <SelectTrigger id="vf-exp">
            <SelectValue placeholder="Select one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Some Volunteering">
              Some volunteering
            </SelectItem>
            <SelectItem value="Regular Volunteer">Regular volunteer</SelectItem>
            <SelectItem value="Campaign Staff">Campaign staff</SelectItem>
            <SelectItem value="Campaign Management">
              Campaign management
            </SelectItem>
            <SelectItem value="Elected/Appointed Office">
              Elected / appointed office
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <FieldLabel
          index="10"
          label="How would you like to help?"
          hint="Pick as many as you'd like"
        />
        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3">
          {helpChoices.map((h) => {
            const checked = helpOptions.includes(h.value);
            return (
              <label
                key={h.value}
                className="group flex cursor-pointer items-center gap-3 text-[14px] text-foreground/70 transition-colors hover:text-foreground"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleHelp(h.value)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-foreground/35 peer-checked:border-brand-red peer-checked:bg-brand-red"
                />
                {h.label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="11"
          label="Availability"
          htmlFor="vf-availability"
        />
        <Select name="availability" required>
          <SelectTrigger id="vf-availability">
            <SelectValue placeholder="How much time can you give?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-2 hours/week">1–2 hours / week</SelectItem>
            <SelectItem value="3-5 hours/week">3–5 hours / week</SelectItem>
            <SelectItem value="5-10 hours/week">5–10 hours / week</SelectItem>
            <SelectItem value="10-20 hours/week">10–20 hours / week</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Remote Help Only">Remote help only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="12"
          label="Which issues matter most to you?"
          htmlFor="vf-issues"
        />
        <TextAreaField
          id="vf-issues"
          name="issues"
          rows={3}
          placeholder="Housing, healthcare, climate, democracy…"
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="13"
          label="Anything else to share?"
          htmlFor="vf-note"
          hint="Optional"
        />
        <TextAreaField
          id="vf-note"
          name="anythingElse"
          rows={3}
          placeholder="Languages, skills, accessibility needs…"
        />
      </div>

      <div className="flex flex-col gap-4">
        <FieldLabel index="14" label="SMS consent" hint="A2P-compliant" />
        {!hasPhone ? (
          <p className="text-[13px] italic text-foreground/45">
            Enter a phone number above to opt in to SMS messages.
          </p>
        ) : null}
        <label
          className={cn(
            "flex items-start gap-3 text-[14px] leading-[1.5]",
            hasPhone
              ? "cursor-pointer text-foreground/65"
              : "cursor-not-allowed text-foreground/35"
          )}
        >
          <input
            type="checkbox"
            checked={smsUpdates}
            onChange={(e) => setSmsUpdates(e.target.checked)}
            disabled={!hasPhone}
            required={hasPhone}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={cn(
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
              hasPhone
                ? "border-foreground/35 peer-checked:border-brand-red peer-checked:bg-brand-red"
                : "border-foreground/20 opacity-40"
            )}
          />
          <span>
            I consent to receive campaign updates from Alex Morgan for
            Senate via automated text messages at the phone number provided.
            Msg frequency may vary. Msg &amp; data rates may apply. Text
            STOP to opt out, HELP for help.
          </span>
        </label>
        <label
          className={cn(
            "flex items-start gap-3 text-[14px] leading-[1.5]",
            hasPhone
              ? "cursor-pointer text-foreground/65"
              : "cursor-not-allowed text-foreground/35"
          )}
        >
          <input
            type="checkbox"
            checked={smsPromo}
            onChange={(e) => setSmsPromo(e.target.checked)}
            disabled={!hasPhone}
            required={hasPhone}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={cn(
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
              hasPhone
                ? "border-foreground/35 peer-checked:border-brand-red peer-checked:bg-brand-red"
                : "border-foreground/20 opacity-40"
            )}
          />
          <span>
            I also consent to receive event invitations and fundraising
            communications via automated text messages.
          </span>
        </label>
      </div>

      {error ? (
        <p className="text-[14px] text-brand-red">{error}</p>
      ) : null}

      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/45">
          By signing up you agree to be contacted by the campaign.
        </p>
        <SubmitButton dependencies={[submitting]}>
          {submitting ? "Sending…" : "Sign me up"}
        </SubmitButton>
      </div>
    </form>
  );
}
