"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  description?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  className?: string;
  index?: string;
  children?: ReactNode;
};

type MetaRowProps = {
  index: number;
  label: string;
  value: string;
};

function MetaRow({ index, label, value }: MetaRowProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const valueRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const lbl = labelRef.current;
      const val = valueRef.current;
      const bar = barRef.current;
      const num = numberRef.current;
      if (!el || !lbl || !val || !bar || !num) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(lbl, {
          color: "#C8102E",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(val, {
          x: 4,
          color: "#C8102E",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(num, {
          scale: 1.25,
          x: 2,
          duration: 0.5,
          ease: "back.out(2)"
        });
        gsap.to(bar, {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      const onLeave = () => {
        gsap.to(lbl, {
          color: "rgba(10,31,68,0.55)",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(val, {
          x: 0,
          color: "rgba(10,31,68,0.85)",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(num, {
          scale: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out"
        });
        gsap.to(bar, {
          scaleX: 0,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      data-meta-row
      className="relative flex items-baseline justify-between gap-4 py-3 text-[13px] font-medium uppercase tracking-[0.24em]"
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />

      <span
        ref={labelRef}
        className="flex items-center gap-2 text-foreground/55 will-change-[color]"
      >
        <span
          ref={numberRef}
          className="inline-block origin-left font-display italic text-brand-red will-change-transform"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>{label}</span>
      </span>
      <span
        ref={valueRef as React.RefObject<HTMLSpanElement>}
        className="text-foreground/85 will-change-[transform,color]"
      >
        {value}
      </span>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  emphasis,
  description,
  subtitle,
  meta,
  className,
  index = "00",
  children
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          "[data-reveal], [data-title] > span > span, [data-meta-row]",
          { opacity: 1, y: 0, yPercent: 0 }
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-reveal='meta']",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          "[data-title] > span > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.05, stagger: 0.09 },
          "-=0.3"
        )
        .fromTo(
          "[data-reveal='desc']",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.55"
        )
        .fromTo(
          "[data-meta-row]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.55"
        );
    },
    { scope: ref }
  );

  const body = title.replace(emphasis ?? "__NO_MATCH__", "<EM>");
  const parts = body.split("<EM>");

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-brand-cream text-foreground",
        className
      )}
    >
      <div className="container py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal="meta" className="flex flex-col gap-6">
            <div className="flex items-start gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">{index}</span>
              <span className="mt-[0.6em] h-px w-8 bg-foreground/25" />
              {eyebrow ? <span>{eyebrow}</span> : null}
            </div>
            {subtitle ? (
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                {subtitle}
              </p>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="mt-2 flex flex-col border-y border-foreground/15">
                {meta.map((m, i) => (
                  <MetaRow
                    key={m.label}
                    index={i}
                    label={m.label}
                    value={m.value}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h1
              data-title
              className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground"
            >
              <span className="sr-only">{title}</span>
              <span aria-hidden className="block">
                <span
                  className="block overflow-hidden pb-[0.12em]"
                  style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)" }}
                >
                  <span className="block">
                    {parts[0]}
                    {emphasis ? (
                      <em className="italic text-brand-red">{emphasis}</em>
                    ) : null}
                    {parts[1]}
                  </span>
                </span>
              </span>
            </h1>

            {description ? (
              <p
                data-reveal="desc"
                className="mt-6 max-w-xl text-[17px] leading-[1.55] text-foreground/65"
              >
                {description}
              </p>
            ) : null}

            {children ? (
              <div data-reveal="desc" className="mt-8">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
