"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { candidate } from "@/lib/data/candidate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    index: "01",
    label: "Patrimonio e identidad",
    body: "Protegeremos las fachadas de sillar, la zona monumental y los espacios que representan la identidad de Yanahuara."
  },
  {
    index: "02",
    label: "Seguridad ciudadana",
    body: "Fortaleceremos el Serenazgo, el patrullaje preventivo, la videovigilancia y la respuesta ante emergencias."
  },
  {
    index: "03",
    label: "Limpieza y cuidado ambiental",
    body: "Mejoraremos las rutas de recolección, los contenedores, la fiscalización, la segregación y el reciclaje."
  },
  {
    index: "04",
    label: "Espacio público y ornato",
    body: "Recuperaremos parques, jardines, veredas, luminarias y mobiliario urbano con mantenimiento permanente."
  },
  {
    index: "05",
    label: "Recuperación de Magnopata",
    body: "Trabajaremos para que Magnopata vuelva a ser un espacio de recreación, deporte y encuentro para las familias."
  }
] as const;

const AUTO_MS = 4500;

export function MissionBand() {
  const ref = useRef<HTMLElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setActive((i) => (i + 1) % pillars.length);
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active]);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 75%",
      end: "bottom 25%",
      onUpdate: (self) => {
        const raw = self.progress * pillars.length;
        const idx = Math.max(
          0,
          Math.min(pillars.length - 1, Math.floor(raw))
        );
        setActive((current) => (current === idx ? current : idx));
      }
    });

    return () => {
      st.kill();
    };
  }, []);

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

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-slide]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: "expo.out" }
      );
    },
    { scope: slideRef, dependencies: [active] }
  );

  const current = pillars[active];

  return (
    <section ref={ref} className="relative bg-brand-cream">
      <div className="container py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">02</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Prioridades</span>
            </div>

            <p className="max-w-[20rem] text-[15px] leading-relaxed text-foreground/60">
              Cinco prioridades. Un solo compromiso.<br />
              <span className="text-foreground/45">Soluciones concretas para un distrito que merece más.</span>
            </p>

            <div className="mt-3 flex flex-col gap-2.5">
              {pillars.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.index}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Ver eje ${p.index} — ${p.label}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center gap-3 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[13px] italic transition-colors",
                        isActive ? "text-brand-red" : "text-foreground/40"
                      )}
                    >
                      {p.index}
                    </span>
                    <span
                      className={cn(
                        "h-px transition-all duration-500",
                        isActive
                          ? "w-10 bg-brand-red"
                          : "w-5 bg-foreground/25 group-hover:w-8 group-hover:bg-foreground/50"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[13px] font-medium uppercase tracking-[0.18em] transition-colors leading-tight",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/45 group-hover:text-foreground/75"
                      )}
                    >
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div data-reveal>
            <div ref={slideRef} className="relative min-h-[14rem]">
              <div key={active} data-slide>
                <div className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                  <span className="tabular-nums text-foreground/70">
                    {current.index} / {String(pillars.length).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-foreground/25" />
                  <span className="text-foreground/70">{current.label}</span>
                </div>

                <p
                  className="mt-7 font-display font-normal leading-[1.22] tracking-[-0.012em] text-foreground"
                  style={{ fontSize: "clamp(1.65rem, 3.6vw, 2.6rem)" }}
                >
                  {current.body}
                </p>

                <div className="mt-10 flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                  <span>Eje {current.index}</span>
                  <div className="relative h-px flex-1 bg-foreground/15">
                    <div
                      key={active}
                      className="absolute inset-y-0 left-0 h-px w-full origin-left bg-brand-red"
                      style={{
                        transformOrigin: "left",
                        animation: `mission-progress ${AUTO_MS}ms linear forwards`
                      }}
                    />
                  </div>
                  <span>— {candidate.fullName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
