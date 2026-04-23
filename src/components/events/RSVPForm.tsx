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
import type { CampaignEvent } from "@/lib/data/events";

export function RSVPForm({ event: _event }: { event: CampaignEvent }) {
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
          <FieldLabel index="01" label="Full name" htmlFor="rf-name" />
          <TextField id="rf-name" name="name" type="text" required />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="02" label="Email" htmlFor="rf-email" />
          <TextField id="rf-email" name="email" type="email" required />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel
            index="03"
            label="Phone"
            htmlFor="rf-phone"
            hint="For event updates only"
          />
          <TextField id="rf-phone" name="phone" type="tel" />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="04" label="Guests" htmlFor="rf-guests" />
          <Select name="guests" required defaultValue="1">
            <SelectTrigger id="rf-guests">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Just me</SelectItem>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="3">3 people</SelectItem>
              <SelectItem value="4">4 people</SelectItem>
              <SelectItem value="5+">5 or more</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="05"
          label="Questions or accessibility needs?"
          htmlFor="rf-note"
          hint="Optional"
        />
        <TextAreaField
          id="rf-note"
          name="note"
          rows={4}
          placeholder="ASL interpreter, parking, dietary, a question for Alex…"
        />
      </div>

      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/45">
          Free. Doors usually open 30 minutes early.
        </p>
        <SubmitButton dependencies={[submitting]}>
          {submitting ? "Sending…" : "Confirm RSVP"}
        </SubmitButton>
      </div>
    </form>
  );
}
