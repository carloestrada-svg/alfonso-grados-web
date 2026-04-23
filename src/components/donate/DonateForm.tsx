"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  FieldLabel,
  TextField
} from "@/components/shared/FormField";
import { SubmitButton } from "@/components/shared/SubmitButton";

const tiers = [
  { amount: 10, label: "$10" },
  { amount: 25, label: "$25", featured: true },
  { amount: 50, label: "$50" },
  { amount: 100, label: "$100" },
  { amount: 250, label: "$250" },
  { amount: 500, label: "$500" }
];

type Frequency = "once" | "monthly";

export function DonateForm() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">(25);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("once");
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
      <div className="flex flex-col gap-5">
        <FieldLabel
          index="01"
          label="Pick an amount"
          hint="Secure · ActBlue"
        />
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {tiers.map((t) => {
            const active = amount === t.amount;
            return (
              <button
                key={t.amount}
                type="button"
                onClick={() => {
                  setAmount(t.amount);
                  setCustom("");
                }}
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-full border px-7 font-display text-[16px] leading-none transition-colors duration-300",
                  active
                    ? "border-foreground bg-foreground text-brand-cream"
                    : "border-foreground/20 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04]"
                )}
              >
                <span className="block translate-y-[1px]">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FieldLabel
          index="02"
          label="Or a custom amount"
          htmlFor="dt-custom"
          hint="USD"
        />
        <div className="relative">
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-display text-[20px] text-foreground/45">
            $
          </span>
          <TextField
            id="dt-custom"
            name="custom"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setAmount(e.target.value ? Number(e.target.value) : "");
            }}
            placeholder="0.00"
            className="pl-6 font-display text-[20px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <FieldLabel index="03" label="How often?" />
        <div className="flex flex-wrap gap-3">
          {(["once", "monthly"] as const).map((f) => {
            const active = frequency === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-[15px] transition-colors duration-300",
                  active
                    ? "border-foreground bg-foreground text-brand-cream"
                    : "border-foreground/20 bg-transparent text-foreground/70 hover:border-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    active ? "bg-brand-cream" : "bg-foreground/30"
                  )}
                />
                {f === "once" ? "One-time" : "Monthly"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="flex flex-col gap-3">
          <FieldLabel index="04" label="Full name" htmlFor="dt-name" />
          <TextField
            id="dt-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <FieldLabel index="05" label="Email" htmlFor="dt-email" />
          <TextField
            id="dt-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/45">
          Federal law requires employer & occupation for donors over $200.
          You&rsquo;ll enter those on ActBlue.
        </p>
        <SubmitButton dependencies={[submitting, amount, frequency]}>
          {submitting
            ? "Redirecting…"
            : amount && amount > 0
              ? `Chip in $${amount}${frequency === "monthly" ? "/mo" : ""}`
              : "Continue"}
        </SubmitButton>
      </div>
    </form>
  );
}
