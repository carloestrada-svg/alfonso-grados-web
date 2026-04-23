import type { Metadata } from "next";
import { Megaphone } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { VolunteerForm } from "@/components/get-involved/VolunteerForm";
import { DonateSection } from "@/components/get-involved/DonateSection";
import { EventsList } from "@/components/get-involved/EventsList";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Donate, volunteer, or join an upcoming event. Campaigns are won by people — join ours."
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="You are the campaign."
        description="Donate. Volunteer. RSVP for an event near you. Every action moves us closer."
      />

      <section id="donate" className="scroll-mt-24 bg-background">
        <div className="container py-20 lg:py-24">
          <DonateSection />
        </div>
      </section>

      <section id="volunteer" className="scroll-mt-24 bg-brand-cream">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr] lg:py-24">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-red">
              <Megaphone className="h-3.5 w-3.5" /> Volunteer
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Sign up to volunteer.
            </h2>
            <p className="text-muted-foreground">
              Tell us a bit about yourself and how you&rsquo;d like to help. Our
              organizers will match you with the right team.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>✓ All training provided — no experience needed</li>
              <li>✓ Flexible shifts, remote and in-person</li>
              <li>✓ Make friends, build community, win an election</li>
            </ul>
          </div>

          <FadeIn className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <VolunteerForm />
          </FadeIn>
        </div>
      </section>

      <section id="events" className="scroll-mt-24 bg-background">
        <div className="container py-20 lg:py-24">
          <SectionHeader
            eyebrow="Events"
            title="Upcoming events."
            description="Town halls, canvass launches, and fundraisers. Come meet Alex and the team."
          />
          <div className="mt-12">
            <EventsList />
          </div>
        </div>
      </section>
    </>
  );
}
