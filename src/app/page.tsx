import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { MissionBand } from "@/components/home/MissionBand";
import { Endorsements } from "@/components/home/Endorsements";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { CTASection } from "@/components/home/CTASection";
import { candidate } from "@/lib/data/candidate";
import { fetchGHLEvents } from "@/lib/ghl";

export const metadata: Metadata = {
  title: `${candidate.fullName} for ${candidate.office}`,
  description: candidate.mission
};

export const revalidate = 60;

export default async function HomePage() {
  const events = await fetchGHLEvents();

  return (
    <>
      <Hero />
      <MissionBand />
      <Endorsements />
      <Stats />
      <Testimonials />
      <UpcomingEvents events={events} />
      <CTASection />
    </>
  );
}
