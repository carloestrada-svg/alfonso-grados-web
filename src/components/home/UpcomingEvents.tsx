"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function UpcomingEvents() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }

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
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-background">
      <div className="container py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">06</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Agenda</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Estamos preparando nuestros próximos encuentros con los vecinos de Yanahuara.
            </p>
          </div>

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

            <div className="mt-12 flex items-center gap-4 border-t border-foreground/15 pt-8">
              <span className="font-display text-[13px] italic text-brand-red">
                —
              </span>
              <p className="text-[15px] font-medium uppercase tracking-[0.2em] text-foreground/55">
                Próximamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
