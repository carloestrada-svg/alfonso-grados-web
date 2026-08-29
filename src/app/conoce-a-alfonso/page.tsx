import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Biography } from "@/components/about/Biography";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { CTASection } from "@/components/home/CTASection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Conoce a Alfonso",
  description:
    "Alfonso Grados es abogado, comunicador y vecino de Yanahuara de toda la vida. Conoce su trayectoria, valores y vocación de servicio por el distrito.",
  alternates: {
    canonical: "/conoce-a-alfonso"
  },
  openGraph: {
    title: "Conoce a Alfonso · Alfonso Grados",
    description:
      "Alfonso Grados es abogado, comunicador y vecino de Yanahuara de toda la vida. Conoce su trayectoria, valores y vocación de servicio por el distrito.",
    url: "/conoce-a-alfonso",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Conoce a Alfonso · Alfonso Grados",
    description:
      "Alfonso Grados es abogado, comunicador y vecino de Yanahuara de toda la vida. Conoce su trayectoria, valores y vocación de servicio por el distrito.",
    images: ["/twitter-image.png"]
  }
};

const heroMeta = [
  { label: "Cargo", value: "Candidato" },
  { label: "Postula", value: candidate.office },
  { label: "Distrito", value: "Yanahuara" },
  { label: "Elecciones", value: "2026" }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Conoce a Alfonso"
        index="00"
        title="Alfonso Grados, yanahuarino de toda la vida."
        emphasis="yanahuarino de toda la vida"
        description="Abogado y comunicador, vecino de Yanahuara y candidato a alcalde del distrito."
        subtitle="Una trayectoria en comunicación, gestión pública y servicio a su comunidad."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href="/sumate" variant="solid" size="lg">
            Quiero sumarme
          </MagneticButton>
          <MagneticButton href="/preguntale-a-alfonso" variant="ghost" size="lg">
            Quiero hacer una pregunta
          </MagneticButton>
        </div>
      </PageHero>
      <Biography />
      <Timeline />
      <Values />
      <CTASection />
    </>
  );
}
