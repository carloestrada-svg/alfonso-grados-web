import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Próximas actividades y encuentros con los vecinos de Yanahuara."
};

export default function EventsPage() {
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
