"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CampaignEvent } from "@/lib/data/events";
import { EventCard } from "@/components/events/EventCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  events: CampaignEvent[];
};

export function UpcomingEventsClient({ events }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      // Protección contra reducción de movimiento
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }

      // Animación GSAP escalonada idéntica a la original
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-background">
      <div className="container py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          {/* Columna lateral izquierda */}
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">06</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Agenda</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              {events.length > 0
                ? "Acompáñanos en nuestras próximas actividades y caminatas por los barrios de Yanahuara."
                : "Estamos preparando nuestros próximos encuentros con los vecinos de Yanahuara."}
            </p>

            {events.length > 0 && (
              <div className="mt-2">
                <Link
                  href="/agenda"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand-red"
                >
                  <span>Ver agenda completa</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Columna principal derecha */}
          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
              >
                Próximas{" "}
                <em className="italic text-brand-red">actividades</em>.
              </span>
            </h2>

            {events.length === 0 ? (
              /* Estado vacío: conserva exactamente el diseño y texto original */
              <div className="mt-12 flex items-center gap-4 border-t border-foreground/15 pt-8">
                <span className="font-display text-[13px] italic text-brand-red">
                  —
                </span>
                <p className="text-[15px] font-medium uppercase tracking-[0.2em] text-foreground/55">
                  Próximamente
                </p>
              </div>
            ) : (
              /* Listado de tarjetas de eventos */
              <div className="mt-10 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <div key={event.slug} data-reveal>
                      <EventCard event={event} headingLevel="h3" />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-foreground/10 sm:hidden">
                  <Link
                    href="/agenda"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <span>Ver agenda completa</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
