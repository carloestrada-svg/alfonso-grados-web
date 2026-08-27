import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { Biography } from "@/components/about/Biography";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { CTASection } from "@/components/home/CTASection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "About",
  description: candidate.shortBio
};

const heroMeta = [
  { label: "Cargo", value: "Candidato" },
  { label: "Puesto", value: candidate.office },
  { label: "Distrito", value: candidate.district },
  { label: "Elecciones", value: "2026" }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        index="00"
        title={`Meet ${candidate.fullName}.`}
        emphasis={candidate.fullName}
        description={candidate.shortBio}
        subtitle="Twenty years in public service. Four chapters. One record — on the line."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href="/volunteer" variant="solid" size="lg">
            Get involved
          </MagneticButton>
          <MagneticButton href="/ask" variant="ghost" size="lg">
            Ask a question
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
