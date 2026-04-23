import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { EventsList } from "@/components/events/EventsList";
import { CTASection } from "@/components/home/CTASection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { events } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Town halls, canvass launches, roundtables — meet Alex Morgan on the trail."
};

const nextEvent = events[0];
const uniqueCities = Array.from(new Set(events.map((e) => e.city))).length;

const formatShort = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const heroMeta = [
  { label: "Next", value: `${formatShort(nextEvent.date)} · ${nextEvent.city}` },
  { label: "Upcoming", value: `${events.length} events` },
  { label: "Cities", value: `${uniqueCities} California cities` },
  { label: "Cost", value: "Free · RSVP" }
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        index="00"
        title="On the trail."
        emphasis="trail"
        description="Town halls, canvass launches, roundtables — four stops this month across California. Come early, bring a neighbor."
        subtitle="The door is open. Show up, ask a question, pick up a clipboard."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            href="#upcoming"
            variant="solid"
            size="lg"
          >
            See upcoming
          </MagneticButton>
          <MagneticButton
            href="/volunteer"
            variant="ghost"
            size="lg"
          >
            Host an event
          </MagneticButton>
        </div>
      </PageHero>

      <div id="upcoming">
        <EventsList />
      </div>

      <CTASection />
    </>
  );
}
