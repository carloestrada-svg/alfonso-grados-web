import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { MissionBand } from "@/components/home/MissionBand";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { CTASection } from "@/components/home/CTASection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: `${candidate.fullName} · ${candidate.office}`,
  description: candidate.mission
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionBand />
      <UpcomingEvents />
      <CTASection />
    </>
  );
}
