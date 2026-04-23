"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FieldLabel,
  TextField,
  TextAreaField,
  CheckGroup
} from "@/components/shared/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SubmitButton } from "@/components/shared/SubmitButton";

const interests = [
  { value: "canvass", label: "Knock doors" },
  { value: "phonebank", label: "Phone bank" },
  { value: "host", label: "Host an event" },
  { value: "data", label: "Data entry" },
  { value: "translate", label: "Translate" },
  { value: "drive", label: "Drive voters" }
];

export function VolunteerForm() {
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
          <FieldLabel index="01" label="Full name" htmlFor="vf-name" />
          <TextField id="vf-name" name="name" type="text" required />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="02" label="Email" htmlFor="vf-email" />
          <TextField id="vf-email" name="email" type="email" required />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="03"
            label="Phone"
            htmlFor="vf-phone"
            hint="Optional"
          />
          <TextField id="vf-phone" name="phone" type="tel" />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="04" label="Zip code" htmlFor="vf-zip" />
          <TextField
            id="vf-zip"
            name="zip"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="05"
          label="How can you help?"
          hint="Pick as many as you'd like"
        />
        <CheckGroup name="interests" options={interests} />
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="06"
          label="Availability"
          htmlFor="vf-availability"
          hint="Weekdays, weekends, evenings…"
        />
        <Select name="availability" required>
          <SelectTrigger id="vf-availability">
            <SelectValue placeholder="Select your availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekdays">Weekdays</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
            <SelectItem value="both">Weekends + evenings</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="07"
          label="Anything else?"
          htmlFor="vf-note"
          hint="Optional"
        />
        <TextAreaField
          id="vf-note"
          name="note"
          rows={4}
          placeholder="Languages, skills, accessibility needs…"
        />
      </div>

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
