import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { AskForm } from "@/components/ask/AskForm";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: `Ask ${candidate.fullName}`,
  description: `Ask ${candidate.fullName} a direct question about the campaign, the issues, or life on the trail.`
};

const heroMeta = [
  { label: "Cadence", value: "Weekly dispatch" },
  { label: "Answered by", value: candidate.fullName },
  { label: "Format", value: "Written reply" },
  { label: "Cost", value: "Free" }
];

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow={`Ask ${candidate.firstName}`}
        index="00"
        title={`Ask ${candidate.fullName}.`}
        emphasis={candidate.fullName}
        description={`Direct questions from Californians get answered in the weekly dispatch. No staffers, no talking points — just ${candidate.firstName}'s reply.`}
        subtitle="Housing, healthcare, climate, the trail itself — nothing's off-limits."
        meta={heroMeta}
      />

      <section className="relative bg-background">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Ask a question</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Every Sunday, {candidate.firstName} reads through the week&rsquo;s
                questions and answers a selection in Monday&rsquo;s dispatch.
              </p>
            </div>

            <div>
              <AskForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
