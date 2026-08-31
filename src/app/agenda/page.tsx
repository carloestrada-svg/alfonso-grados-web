import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { EventCard } from "@/components/events/EventCard";
import { getAgendaEvents } from "@/sanity/lib/events";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Próximas actividades, caminatas y encuentros vecinales de Alfonso Grados con los vecinos de Yanahuara.",
  alternates: {
    canonical: "/agenda",
  },
  openGraph: {
    title: "Agenda · Alfonso Grados",
    description:
      "Próximas actividades, caminatas y encuentros vecinales de Alfonso Grados con los vecinos de Yanahuara.",
    url: "/agenda",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "Agenda · Alfonso Grados",
    description:
      "Próximas actividades, caminatas y encuentros vecinales de Alfonso Grados con los vecinos de Yanahuara.",
    images: ["/twitter-image.png"],
  },
};

export default async function EventsPage() {
  const events = await getAgendaEvents();

  if (events.length === 0) {
    return (
      <>
        <PageHero
          eyebrow="Agenda"
          index="00"
          title="Muy pronto estaremos cerca de ti."
          emphasis="cerca de ti"
          description="Estamos preparando nuestros próximos encuentros y actividades con los vecinos de Yanahuara."
          subtitle="Próximamente"
        />
        <CTASection />
      </>
    );
  }

  const countLabel =
    events.length === 1 ? "1 actividad disponible" : `${events.length} actividades disponibles`;

  return (
    <>
      <PageHero
        eyebrow="Agenda"
        index="00"
        title="Acompáñanos en cada paso por Yanahuara."
        emphasis="cada paso"
        description="Conoce las próximas actividades, caminatas y encuentros vecinales organizados por la campaña de Alfonso Grados."
        subtitle={countLabel}
      />

      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} headingLevel="h2" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
