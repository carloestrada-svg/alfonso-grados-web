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
            hint="Where you&rsquo;re writing from"
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
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="climate">Climate</SelectItem>
              <SelectItem value="economy">Jobs &amp; wages</SelectItem>
              <SelectItem value="democracy">Democracy</SelectItem>
              <SelectItem value="personal">A personal story</SelectItem>
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="05"
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
