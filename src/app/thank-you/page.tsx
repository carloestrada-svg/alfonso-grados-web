import type { Metadata } from "next";
import Link from "next/link";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Gracias",
  description: "Gracias por sumarte a la campaña de Alfonso Grados por Yanahuara.",
  robots: { index: false, follow: false }
};

const nextSteps = [
  { label: "Ver agenda de actividades", href: "/events" },
  { label: "Pregúntale a Alfonso", href: "/ask" },
  { label: "Conoce a Alfonso", href: "/about" },
  { label: "Súmate como voluntario", href: "/volunteer" }
];

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden bg-brand-cream">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">00</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Recibido</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Una campaña es una conversación constante con los vecinos. Gracias por ser parte de este camino.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="font-display font-normal leading-[0.98] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)" }}
              >
                Muchas{" "}
                <em className="italic text-brand-red">gracias</em>.
              </span>
            </h1>

            <p className="max-w-xl text-[17px] leading-[1.55] text-foreground/70">
              Hemos recibido tu información. Gracias por tu interés y participación en el futuro de Yanahuara.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href="/" variant="solid" size="lg">
                Volver al inicio
              </MagneticButton>
              <MagneticButton href="/events" variant="ghost" size="lg">
                Ver agenda
              </MagneticButton>
            </div>

            <div className="flex flex-col gap-4 border-t border-foreground/15 pt-8">
              <span className="text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                Siguientes pasos —
              </span>
              <ul className="flex flex-col gap-3">
                {nextSteps.map((s, i) => (
                  <li key={s.href} className="flex items-baseline gap-4">
                    <span className="font-display text-[14px] italic text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={s.href}
                      className="font-display text-foreground transition-colors hover:text-brand-red"
                      style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/45">
              — {candidate.fullName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
