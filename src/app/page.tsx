import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { MissionBand } from "@/components/home/MissionBand";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LatestNews } from "@/components/home/LatestNews";
import { CTASection } from "@/components/home/CTASection";
export const metadata: Metadata = {
  title: {
    absolute: "Alfonso Grados · Alcalde de Yanahuara"
  },
  description:
    "Conoce las propuestas, prioridades, noticias y formas de participar en la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Alfonso Grados · Alcalde de Yanahuara",
    description:
      "Conoce las propuestas, prioridades, noticias y formas de participar en la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
    url: "/",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Alfonso Grados · Alcalde de Yanahuara",
    description:
      "Conoce las propuestas, prioridades, noticias y formas de participar en la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
    images: ["/twitter-image.png"]
  }
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionBand />
      <UpcomingEvents />
      <LatestNews />
      <CTASection />
    </>
  );
}
