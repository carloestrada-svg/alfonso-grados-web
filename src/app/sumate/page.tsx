import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Súmate",
  description:
    `Súmate al equipo de campaña de ${candidate.fullName} en ${candidate.district}, ${candidate.region}.`
};

const heroMeta = [
  { label: "Candidato", value: candidate.fullName },
  { label: "Distrito", value: candidate.district },
  { label: "Equipo", value: "Vecinos unidos" },
  { label: "Coordinación", value: "WhatsApp" }
];

export default function SumatePage() {
  return (
    <>
      <PageHero
        eyebrow="Súmate"
        index="00"
        title="Tu tiempo puede hacer la diferencia."
        emphasis="hacer la diferencia"
        description="Los vecinos de Yanahuara aportan tiempo, ideas y experiencia para transformar nuestro distrito. Toda la coordinación y organización del equipo se realiza de forma directa por WhatsApp."
        subtitle="Participación abierta para todos los vecinos comprometidos con Yanahuara."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            href="https://wa.me/51991506516?text=Hola%2C%20quiero%20sumarme%20como%20voluntario%20a%20la%20campa%C3%B1a%20de%20Alfonso%20Grados."
            external
            variant="solid"
            size="lg"
          >
            Quiero sumarme
          </MagneticButton>
        </div>
      </PageHero>

      <section className="relative bg-background">
        <div className="container py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Coordinación</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Construimos una campaña cercana, sumando el esfuerzo de cada vecino en Yanahuara.
              </p>
            </div>

            <div className="flex flex-col gap-8 rounded-2xl border border-foreground/10 bg-card p-8 sm:p-12">
              <div className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground">
                  ¿Cómo participar en la campaña?
                </h2>
                <p className="text-[16px] leading-[1.65] text-foreground/75">
                  Los vecinos aportan tiempo, ideas y experiencia según su disponibilidad. Ya sea participando en caminatas vecinales, compartiendo propuestas o colaborando en actividades comunitarias, la coordinación se gestiona directamente por WhatsApp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton
                  href="https://wa.me/51991506516?text=Hola%2C%20quiero%20sumarme%20como%20voluntario%20a%20la%20campa%C3%B1a%20de%20Alfonso%20Grados."
                  external
                  variant="solid"
                  size="lg"
                >
                  Quiero sumarme
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
