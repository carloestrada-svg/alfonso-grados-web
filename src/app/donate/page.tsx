import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { DonateForm } from "@/components/donate/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Chip in to Morgan for Senate — grassroots-funded, no corporate PACs, average donation $28."
};

const heroMeta = [
  { label: "Donors", value: "58,000+" },
  { label: "Average", value: "$28" },
  { label: "PAC money", value: "None" },
  { label: "Processing", value: "ActBlue · Secure" }
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        index="00"
        title="Chip in ten dollars."
        emphasis="ten dollars"
        description="This campaign is funded by people, not corporate PACs. Every $10, $25, $100 — it adds up to a seat we can hold without owing anyone."
        subtitle="Every dollar goes to the field — doors, phones, rides to the polls."
        meta={heroMeta}
      />

      <section className="relative bg-background">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Contribute</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Pick an amount and a frequency. Payment details are
                handled by ActBlue on the next screen.
              </p>
            </div>

            <div>
              <DonateForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
