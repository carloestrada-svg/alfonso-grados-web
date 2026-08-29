import type { Metadata } from "next";
import { Facebook, Instagram, MessageCircle, Music2, Phone, MapPin } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Canales oficiales de comunicación para contactar al equipo de campaña de Alfonso Grados en Yanahuara, Arequipa.",
  alternates: {
    canonical: "/contacto"
  },
  openGraph: {
    title: "Contacto · Alfonso Grados",
    description:
      "Canales oficiales de comunicación para contactar al equipo de campaña de Alfonso Grados en Yanahuara, Arequipa.",
    url: "/contacto",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Contacto · Alfonso Grados",
    description:
      "Canales oficiales de comunicación para contactar al equipo de campaña de Alfonso Grados en Yanahuara, Arequipa.",
    images: ["/twitter-image.png"]
  }
};

const heroMeta = [
  { label: "Distrito", value: candidate.district },
  { label: "Región", value: candidate.region },
  { label: "Teléfono", value: candidate.contact.phone },
  { label: "Canal", value: "WhatsApp" }
];

const socialIcons: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  TikTok: Music2
};

export default function ContactPage() {
  const socialList = candidate.socials.filter(
    (s) => s.label === "Facebook" || s.label === "Instagram" || s.label === "TikTok"
  );

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        index="00"
        title="Conversemos."
        emphasis="Conversemos"
        description="Estamos atentos para dialogar con todos los vecinos de Yanahuara. Escríbenos directamente o síguenos en nuestras redes oficiales."
        subtitle="Comunicación abierta y cercana con los vecinos de Yanahuara."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            href="https://wa.me/51991506516?text=Hola%2C%20quiero%20comunicarme%20con%20la%20campa%C3%B1a%20de%20Alfonso%20Grados."
            external
            variant="solid"
            size="lg"
          >
            Escribir por WhatsApp
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
                <span>Canales oficiales</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Puntos de contacto directo y espacios de encuentro vecinal en Yanahuara.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* WhatsApp & Teléfono Card */}
              <div className="rounded-2xl border border-foreground/10 bg-card p-8 sm:p-12">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-brand-red">
                    <MessageCircle className="h-6 w-6" />
                    <h2 className="font-display text-2xl sm:text-3xl text-foreground">
                      WhatsApp y Teléfono
                    </h2>
                  </div>
                  <p className="text-[16px] leading-[1.65] text-foreground/75">
                    El canal más rápido y directo para comunicarte con la campaña. Escríbenos o llámanos para compartir propuestas, coordinar o resolver consultas.
                  </p>

                  <div className="flex flex-col gap-3 py-2 text-[15px] text-foreground/80 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4 text-brand-red" />
                      <span>{candidate.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60">
                      <MapPin className="h-4 w-4 text-brand-red" />
                      <span>{candidate.contact.address}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <MagneticButton
                      href="https://wa.me/51991506516?text=Hola%2C%20quiero%20comunicarme%20con%20la%20campa%C3%B1a%20de%20Alfonso%20Grados."
                      external
                      variant="solid"
                      size="lg"
                    >
                      Escribir por WhatsApp
                    </MagneticButton>
                  </div>
                </div>
              </div>

              {/* Redes Sociales Card */}
              <div className="rounded-2xl border border-foreground/10 bg-card p-8 sm:p-12">
                <h3 className="font-display text-xl sm:text-2xl text-foreground">
                  Redes sociales
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-foreground/65">
                  Sigue el día a día de las actividades, propuestas y recorridos por el distrito en nuestras plataformas oficiales:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {socialList.map((s) => {
                    const Icon = socialIcons[s.label];
                    if (!Icon) return null;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3.5 rounded-xl border border-foreground/10 bg-background/50 p-4 transition-all hover:border-brand-red hover:bg-background"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-foreground transition-colors group-hover:bg-brand-red group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground group-hover:text-brand-red transition-colors">
                            {s.label}
                          </span>
                          <span className="text-xs text-foreground/50">
                            Cuenta oficial
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
