import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { EventDetails } from "@/components/events/EventDetails";
import { CTASection } from "@/components/home/CTASection";
import { fetchGHLEvent, fetchGHLEvents } from "@/lib/ghl";

type Params = { id: string };

export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const events = await fetchGHLEvents();
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await fetchGHLEvent(id);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description
  };
}

export default async function EventDetailsPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const [event, allEvents] = await Promise.all([
    fetchGHLEvent(id),
    fetchGHLEvents()
  ]);
  if (!event) notFound();
  const otherEvents = allEvents.filter((e) => e.id !== event.id);

  const dateShort = `${event.date.month} ${event.date.day}, ${event.date.year}`;
  const heroMeta = [
    { label: "Date", value: dateShort },
    { label: "Time", value: event.time || "TBA" },
    { label: "City", value: event.city || event.location || "California" },
    { label: "RSVP", value: "Free" }
  ];

  return (
    <>
      <PageHero
        eyebrow={`${event.city || "California"} · Event`}
        index="00"
        title={event.title}
        description={event.description}
        subtitle={`${dateShort} at ${event.time || "TBA"}. ${event.venue || event.location}.`}
        meta={heroMeta}
      />

      <EventDetails event={event} otherEvents={otherEvents} />

      <CTASection />
    </>
  );
}
