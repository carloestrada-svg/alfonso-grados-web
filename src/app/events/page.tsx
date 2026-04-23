import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { EventsList } from "@/components/events/EventsList";
import { CTASection } from "@/components/home/CTASection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fetchGHLEvents } from "@/lib/ghl";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Town halls, canvass launches, roundtables — meet Alex Morgan on the trail."
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await fetchGHLEvents();
  const nextEvent = events[0];
  const uniqueCities = Array.from(
    new Set(events.map((e) => e.city).filter(Boolean))
  ).length;

  const heroMeta = [
    {
      label: "Next",
      value: nextEvent
        ? `${nextEvent.date.month} ${nextEvent.date.day} · ${nextEvent.city || nextEvent.location}`
        : "TBA"
    },
    { label: "Upcoming", value: `${events.length} events` },
    {
      label: "Cities",
      value: uniqueCities
        ? `${uniqueCities} California cities`
        : "California-wide"
    },
    { label: "Cost", value: "Free · RSVP" }
  ];

  return (
    <>
      <PageHero
        eyebrow="Events"
        index="00"
        title="On the trail."
        emphasis="trail"
        description="Town halls, canvass launches, roundtables — stops this month across California. Come early, bring a neighbor."
        subtitle="The door is open. Show up, ask a question, pick up a clipboard."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href="#upcoming" variant="solid" size="lg">
            See upcoming
          </MagneticButton>
          <MagneticButton href="/volunteer" variant="ghost" size="lg">
            Host an event
          </MagneticButton>
        </div>
      </PageHero>

      <div id="upcoming">
        <EventsList events={events} />
      </div>

      <CTASection />
    </>
  );
}
