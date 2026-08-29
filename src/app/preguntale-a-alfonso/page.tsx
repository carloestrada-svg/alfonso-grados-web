import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Pregúntale a Alfonso",
  description:
    "Comparte tus consultas, inquietudes y propuestas para Yanahuara directamente con Alfonso Grados.",
  alternates: {
    canonical: "/preguntale-a-alfonso"
  },
  openGraph: {
    title: "Pregúntale a Alfonso · Alfonso Grados",
    description:
      "Comparte tus consultas, inquietudes y propuestas para Yanahuara directamente con Alfonso Grados.",
    url: "/preguntale-a-alfonso",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Pregúntale a Alfonso · Alfonso Grados",
    description:
      "Comparte tus consultas, inquietudes y propuestas para Yanahuara directamente con Alfonso Grados.",
    images: ["/twitter-image.png"]
  }
};

const heroMeta = [
  { label: "Candidato", value: candidate.fullName },
  { label: "Distrito", value: candidate.district },
  { label: "Canal", value: "WhatsApp" },
  { label: "Diálogo", value: "Directo" }
];

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="Pregúntale a Alfonso"
        index="00"
        title="Tu pregunta merece ser escuchada."
        emphasis="ser escuchada"
        description="Queremos escuchar tus preguntas, propuestas e inquietudes sobre Yanahuara. Escríbenos directamente por WhatsApp para mantener un diálogo abierto y transparente."
        subtitle="Un canal directo para que todos los vecinos compartan su visión para el distrito."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            href="https://wa.me/51991506516?text=Hola%2C%20quiero%20hacerle%20una%20pregunta%20a%20Alfonso%20Grados."
            external
            variant="solid"
            size="lg"
          >
            Quiero hacer una pregunta
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
                <span>Canal de diálogo</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Tus consultas y sugerencias orientan las prioridades de trabajo para Yanahuara.
              </p>
            </div>

            <div className="flex flex-col gap-8 rounded-2xl border border-foreground/10 bg-card p-8 sm:p-12">
              <div className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground">
                  Preguntas y propuestas para el distrito
                </h2>
                <p className="text-[16px] leading-[1.65] text-foreground/75">
                  Si tienes dudas sobre el plan de trabajo, propuestas para tu zona o inquietudes sobre los servicios del distrito, te invitamos a enviarlas a través de nuestro canal de WhatsApp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton
                  href="https://wa.me/51991506516?text=Hola%2C%20quiero%20hacerle%20una%20pregunta%20a%20Alfonso%20Grados."
                  external
                  variant="solid"
                  size="lg"
                >
                  Quiero hacer una pregunta
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
