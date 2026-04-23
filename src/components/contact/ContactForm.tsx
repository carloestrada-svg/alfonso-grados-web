"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  FieldLabel,
  TextField,
  TextAreaField
} from "@/components/shared/FormField";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { formatPhoneInput } from "@/lib/phone";

export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [smsPromo, setSmsPromo] = useState(false);

  const hasPhone = phone.trim().length > 0;

  useEffect(() => {
    if (!hasPhone) {
      setSmsUpdates(false);
      setSmsPromo(false);
    }
  }, [hasPhone]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              message,
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
          <FieldLabel index="01" label="First name" htmlFor="cf-first" />
          <TextField
            id="cf-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Alex"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="02" label="Last name" htmlFor="cf-last" />
          <TextField
            id="cf-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Morgan"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="03" label="Email" htmlFor="cf-email" />
          <TextField
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="04"
            label="Phone"
            htmlFor="cf-phone"
            hint="Optional"
          />
          <TextField
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 555-0123"
            value={phone}
            onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="05"
          label="Message"
          htmlFor="cf-message"
          hint="Keep it short — we read every one"
        />
        <TextAreaField
          id="cf-message"
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Tell us what's on your mind…"
        />
      </div>

      <div className="flex flex-col gap-4">
        <FieldLabel index="06" label="SMS consent" hint="A2P-compliant" />
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
            Message frequency may vary. Msg &amp; data rates may apply. Text
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
          Press: replies within 24 hours. All others within 2 days.
        </p>
        <SubmitButton dependencies={[submitting]}>
          {submitting ? "Sending…" : "Send message"}
        </SubmitButton>
      </div>
    </form>
  );
}
