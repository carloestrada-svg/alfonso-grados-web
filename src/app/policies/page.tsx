import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/shared/PageHero";
import { PolicyAccordion } from "@/components/policies/PolicyAccordion";
import { FadeIn } from "@/components/shared/FadeIn";
import { CTASection } from "@/components/home/CTASection";
import { policies } from "@/lib/data/policies";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Every policy position on housing, education, healthcare, climate, jobs, justice, democracy, and rural California."
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="The plan"
        title="Policies that put California first."
        description="Eight pillars. Dozens of specific bills. Zero corporate PAC money. Read every plan in full."
      />

      <section className="border-b border-border/60 bg-brand-cream">
        <div className="container py-10 lg:py-12">
          <FadeIn
            staggerSelector="[data-chip]"
            stagger={0.04}
            className="flex flex-wrap gap-2"
          >
            {policies.map((p) => (
              <Link
                key={p.slug}
                href={`#${p.slug}`}
                data-chip
                className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-brand-red/60 hover:text-brand-red"
              >
                {p.title.replace(/^[^\s]+\s/, (w) => w).split(" ").slice(0, 3).join(" ")}
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      <PolicyAccordion />
      <CTASection />
    </>
  );
}
