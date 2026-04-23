"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const presets = ["10", "25", "50", "100", "250"];

export function DonateSection() {
  const [amount, setAmount] = useState("50");
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);

  return (
    <div className="grid gap-10 rounded-2xl border border-border bg-card p-8 shadow-sm md:grid-cols-[1.2fr_1fr] md:p-10">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-red">
          <Heart className="h-3.5 w-3.5" /> Donate
        </span>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Chip in — no amount is too small.
        </h3>
        <p className="mt-4 text-muted-foreground">
          Every dollar comes from people like you. We don&rsquo;t take corporate PAC
          money. We don&rsquo;t take fossil fuel money. It&rsquo;s you — which is how it
          should be.
        </p>

        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li>✓ 100% grassroots, no corporate PAC money</li>
          <li>✓ Transparent reporting — every dollar on file</li>
          <li>✓ FEC-compliant; contributions are not tax-deductible</li>
        </ul>
      </div>

      <form
        className="flex flex-col gap-4 rounded-xl bg-brand-cream p-6"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: Redirect to ActBlue / processor with amount + recurring flag
        }}
      >
        <p className="text-sm font-semibold text-foreground">Select an amount</p>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setAmount(v);
                setCustom("");
              }}
              aria-pressed={amount === v && !custom}
              className={cn(
                "rounded-md border px-3 py-3 font-display text-lg font-semibold transition-all",
                amount === v && !custom
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-border bg-background hover:border-brand-red/50 hover:text-brand-red"
              )}
            >
              ${v}
            </button>
          ))}
        </div>

        <div>
          <Label htmlFor="custom-amount" className="text-xs">
            Custom amount
          </Label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="custom-amount"
              inputMode="decimal"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setAmount("");
              }}
              className="pl-6"
              placeholder="Other amount"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="h-4 w-4 rounded border-input text-brand-red focus:ring-brand-red"
          />
          Make this monthly
        </label>

        <Button type="submit" variant="accent" size="lg">
          Contribute ${custom || amount || "50"}
          {recurring ? " / month" : ""}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Federal law requires us to collect employer and occupation info on
          contributions over $200.
        </p>
      </form>
    </div>
  );
}
