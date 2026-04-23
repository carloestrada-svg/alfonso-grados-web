import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Biography } from "@/components/about/Biography";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { CTASection } from "@/components/home/CTASection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "About",
  description: candidate.shortBio
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`Meet ${candidate.fullName}.`}
        description={candidate.shortBio}
      />
      <Biography />
      <Timeline />
      <Values />
      <CTASection />
    </>
  );
}
