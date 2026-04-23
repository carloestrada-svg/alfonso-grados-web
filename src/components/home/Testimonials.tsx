"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/data/testimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const ref = useRef<HTMLElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 70%",
      end: "bottom 30%",
      onUpdate: (self) => {
        const raw = self.progress * testimonials.length;
        const idx = Math.max(
          0,
          Math.min(testimonials.length - 1, Math.floor(raw))
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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-quote-slide]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out"
        }
      );
      gsap.fromTo(
        "[data-quote-mark]",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out", delay: 0.1 }
      );
    },
    { scope: quoteRef, dependencies: [active] }
  );

  const current = testimonials[active];

  return (
    <section ref={ref} className="relative bg-brand-cream">
      <div className="container py-24 lg:py-28">
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <div
            data-reveal
            className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55"
          >
            <span className="tabular-nums">05</span>
            <span className="h-px w-8 bg-foreground/25" />
            <span>Voices from the trail</span>
          </div>

          <h2
            data-reveal
            className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground"
          >
            <span
              className="block"
              style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
            >
              What Californians are{" "}
              <em className="italic text-brand-red">saying</em>.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-20">
          <div data-reveal className="flex flex-col">
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Read ${t.name}'s quote`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative flex items-start gap-4 border-t border-foreground/15 px-4 py-5 text-left transition-colors last:border-b sm:px-6 lg:px-5 xl:px-6",
                    "hover:bg-foreground/[0.02]"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 h-px origin-left bg-brand-red transition-transform duration-500",
                      isActive ? "w-full scale-x-100" : "w-full scale-x-0"
                    )}
                  />
                  <span
                    className={cn(
                      "mt-0.5 font-display text-[15px] italic tabular-nums transition-colors",
                      isActive
                        ? "text-brand-red"
                        : "text-foreground/35 group-hover:text-brand-red/70"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex flex-1 flex-col gap-1">
                    <span
                      className={cn(
                        "font-display text-[1.05rem] leading-tight tracking-[-0.01em] transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/65 group-hover:text-foreground"
                      )}
                    >
                      {t.name}
                    </span>
                    <span
                      className={cn(
                        "text-[13px] font-medium uppercase tracking-[0.22em] transition-colors",
                        isActive
                          ? "text-foreground/65"
                          : "text-foreground/40"
                      )}
                    >
                      {t.role}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 font-display text-[15px] italic transition-all duration-500",
                      isActive
                        ? "translate-x-0 text-brand-red opacity-100"
                        : "-translate-x-1 text-brand-red/0 opacity-0 group-hover:translate-x-0 group-hover:text-brand-red/70 group-hover:opacity-100"
                    )}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div data-reveal ref={quoteRef} className="relative min-h-[20rem]">
            <div key={active} data-quote-slide className="flex h-full flex-col">
              <span
                data-quote-mark
                aria-hidden
                className="block font-display text-[5rem] leading-none text-brand-red/80 sm:text-[6rem]"
                style={{ marginLeft: "-0.08em" }}
              >
                &ldquo;
              </span>

              <blockquote className="mt-2 font-display font-normal leading-[1.22] tracking-[-0.015em] text-foreground">
                <span
                  className="block"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.35rem)" }}
                >
                  {current.quote}
                </span>
              </blockquote>

              <figcaption className="mt-auto flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-foreground/15 pt-6 text-[13px] font-medium uppercase tracking-[0.24em]">
                <span className="text-foreground/85">— {current.name}</span>
                <span className="hidden h-px min-w-6 flex-1 bg-foreground/15 sm:block" />
                <span className="text-foreground/55">{current.role}</span>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
