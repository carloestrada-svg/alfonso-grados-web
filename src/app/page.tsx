import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { MissionBand } from "@/components/home/MissionBand";
import { KeyPolicies } from "@/components/home/KeyPolicies";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsTeaser } from "@/components/home/NewsTeaser";
import { CTASection } from "@/components/home/CTASection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: `${candidate.fullName} for ${candidate.office}`,
  description: candidate.mission
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionBand />
      <KeyPolicies />
      <Stats />
      <Testimonials />
      <NewsTeaser />
      <CTASection />
    </>
  );
}
