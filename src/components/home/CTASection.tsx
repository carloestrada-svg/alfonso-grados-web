"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButton } from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-brand-cream">
      <div className="container py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">07</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Súmate al Giro 180°</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              El cambio necesita vecinos comprometidos que quieran aportar sus ideas, experiencia y energía.
            </p>
          </div>

          <div className="flex flex-col">
            <h2
              data-reveal
              className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground"
            >
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Tu tiempo, tu voz y tus ideas pueden ser{" "}
                <em className="italic text-brand-red">parte del cambio</em>.
              </span>
            </h2>

            <p
              data-reveal
              className="mt-8 max-w-xl text-[18px] leading-[1.55] text-foreground/70"
            >
              El cambio necesita vecinos comprometidos que quieran aportar sus ideas, experiencia y energía.
            </p>

            <div
              data-reveal
              className="mt-10 border-t border-foreground/15 pt-8"
            >
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="font-display italic text-brand-red">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Participa</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="/sumate"
                  variant="solid"
                  size="lg"
                >
                  Quiero sumarme
                </MagneticButton>
                <MagneticButton
                  href="/preguntale-a-alfonso"
                  variant="ghost"
                  size="lg"
                >
                  Quiero hacer una pregunta
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
