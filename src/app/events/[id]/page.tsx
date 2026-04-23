import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { EventDetails } from "@/components/events/EventDetails";
import { CTASection } from "@/components/home/CTASection";
import { events, getEventById } from "@/lib/data/events";

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description
  };
}

const formatShort = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

export default async function EventDetailsPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  const heroMeta = [
    { label: "Date", value: formatShort(event.date) },
    { label: "Time", value: event.time },
    { label: "City", value: event.city },
    { label: "RSVP", value: "Free" }
  ];

  return (
    <>
      <PageHero
        eyebrow={`${event.city} · Event`}
        index="00"
        title={event.title}
        description={event.description}
        subtitle={`${formatShort(event.date)} at ${event.time}. ${event.venue}.`}
        meta={heroMeta}
      />

      <EventDetails event={event} />

      <CTASection />
    </>
  );
}
