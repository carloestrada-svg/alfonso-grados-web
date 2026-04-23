"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const activities = [
  "Knock doors",
  "Phone bank",
  "Host a house party",
  "Write postcards",
  "Tabling / events",
  "Social media / digital"
];

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(activity: string) {
    setSelected((cur) =>
      cur.includes(activity)
        ? cur.filter((a) => a !== activity)
        : [...cur, activity]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to real backend / NGP VAN endpoint.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold">
          Thank you — you&rsquo;re on the team.
        </h3>
        <p className="mt-2 text-muted-foreground">
          A field organizer will reach out within 48 hours. Welcome aboard.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="volunteer-first">First name</Label>
          <Input
            id="volunteer-first"
            name="firstName"
            required
            autoComplete="given-name"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="volunteer-last">Last name</Label>
          <Input
            id="volunteer-last"
            name="lastName"
            required
            autoComplete="family-name"
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="volunteer-email">Email</Label>
          <Input
            id="volunteer-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="volunteer-zip">ZIP code</Label>
          <Input
            id="volunteer-zip"
            name="zip"
            inputMode="numeric"
            pattern="[0-9]{5}"
            required
            autoComplete="postal-code"
            className="mt-2"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">
          How would you like to help?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {activities.map((a) => {
            const active = selected.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => toggle(a)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-border hover:border-brand-red/50 hover:text-brand-red"
                }`}
              >
                {active ? <Check className="h-3.5 w-3.5" /> : null}
                {a}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="volunteer-note">
          Anything else? <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="volunteer-note"
          name="note"
          rows={4}
          className="mt-2"
          placeholder="Availability, languages, skills, or anything else we should know."
        />
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
        Sign me up
      </Button>
    </form>
  );
}
