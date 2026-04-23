"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        router.push("/thank-you");
      }}
      className="flex flex-col gap-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="flex flex-col gap-3">
          <FieldLabel index="01" label="Full name" htmlFor="cf-name" />
          <TextField
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="02" label="Email" htmlFor="cf-email" />
          <TextField
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel index="03" label="Topic" htmlFor="cf-topic" />
        <Select name="topic" required>
          <SelectTrigger id="cf-topic">
            <SelectValue placeholder="What's this about?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="press">Press inquiry</SelectItem>
            <SelectItem value="endorsement">Endorsement</SelectItem>
            <SelectItem value="event">Event request</SelectItem>
            <SelectItem value="policy">Policy question</SelectItem>
            <SelectItem value="other">Something else</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="04"
          label="Message"
          htmlFor="cf-message"
          hint="Keep it short — we read every one"
        />
        <TextAreaField
          id="cf-message"
          name="message"
          rows={6}
          required
          placeholder="Tell us what's on your mind…"
        />
      </div>

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
