"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const topics = [
  "General question",
  "Media inquiry",
  "Event request",
  "Constituent service",
  "Endorsement",
  "Other"
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to real backend.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-navy/20 bg-brand-cream p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold">
          Message received.
        </h3>
        <p className="mt-2 text-muted-foreground">
          Someone from the campaign will be in touch within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-topic">Topic</Label>
        <select
          id="contact-topic"
          name="topic"
          required
          defaultValue=""
          className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="" disabled>
            Select a topic…
          </option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="mt-2"
          placeholder="How can the campaign help?"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We reply within two business days.
        </p>
        <Button type="submit" size="lg" variant="accent">
          <Send className="h-4 w-4" /> Send message
        </Button>
      </div>
    </form>
  );
}
