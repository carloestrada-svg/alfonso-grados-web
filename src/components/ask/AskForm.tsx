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

export function AskForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
          const res = await fetch("/api/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              email: data.get("email"),
              city: data.get("city"),
              topic: data.get("topic"),
              subject: data.get("subject"),
              question: data.get("question")
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
          <FieldLabel index="01" label="Your name" htmlFor="af-name" />
          <TextField
            id="af-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Maria Delgado"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="02" label="Email" htmlFor="af-email" />
          <TextField
            id="af-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="03"
            label="City"
            htmlFor="af-city"
            hint="Where you're writing from"
          />
          <TextField
            id="af-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Oakland"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="04" label="Topic" htmlFor="af-topic" />
          <Select name="topic" required>
            <SelectTrigger id="af-topic">
              <SelectValue placeholder="Choose a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Climate">Climate</SelectItem>
              <SelectItem value="Jobs & Wages">Jobs &amp; wages</SelectItem>
              <SelectItem value="Democracy">Democracy</SelectItem>
              <SelectItem value="Personal Story">A personal story</SelectItem>
              <SelectItem value="Other">Something else</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="05"
          label="Subject"
          htmlFor="af-subject"
          hint="One line — what's your question about?"
        />
        <TextField
          id="af-subject"
          name="subject"
          type="text"
          placeholder="Affordable housing near transit"
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="06"
          label="Your question"
          htmlFor="af-question"
          hint="No wrong questions. Direct is best."
        />
        <TextAreaField
          id="af-question"
          name="question"
          rows={6}
          required
          placeholder="What do you want to ask?"
        />
      </div>

      {error ? (
        <p className="text-[14px] text-brand-red">{error}</p>
      ) : null}

      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/45">
          A selection gets answered in the weekly dispatch.
        </p>
        <SubmitButton dependencies={[submitting]}>
          {submitting ? "Sending…" : "Send question"}
        </SubmitButton>
      </div>
    </form>
  );
}
