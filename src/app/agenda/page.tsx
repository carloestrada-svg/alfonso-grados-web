import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Próximas actividades, caminatas y encuentros vecinales de Alfonso Grados con los vecinos de Yanahuara.",
  alternates: {
    canonical: "/agenda"
  },
  openGraph: {
    title: "Agenda · Alfonso Grados",
    description:
      "Próximas actividades, caminatas y encuentros vecinales de Alfonso Grados con los vecinos de Yanahuara.",
    url: "/agenda",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Agenda · Alfonso Grados",
    description:
      "Próximas actividades, caminatas y encuentros vecinales de Alfonso Grados con los vecinos de Yanahuara.",
    images: ["/twitter-image.png"]
  }
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
