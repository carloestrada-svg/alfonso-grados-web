"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

const WA_URL =
  "https://wa.me/51991506516?text=Hola%2C%20quiero%20recibir%20novedades%20de%20la%20campa%C3%B1a%20de%20Alfonso%20Grados.";

export function NewsletterForm() {
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const labelTop = useRef<HTMLSpanElement | null>(null);
  const labelBot = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);

  useGSAP(
    () => {
      const el = btnRef.current;
      const lt = labelTop.current;
      const lb = labelBot.current;
      const ic = iconRef.current;
      const ring = ringRef.current;
      if (!el || !lt || !lb || !ic || !ring) return;

      gsap.set(lb, { yPercent: 110 });
      gsap.set(ring, { strokeDashoffset: 90 });

      const onEnter = () => {
        gsap.to(lt, { yPercent: -110, duration: 0.45, ease: "expo.out" });
        gsap.to(lb, { yPercent: 0, duration: 0.45, ease: "expo.out" });
        gsap.to(ic, { rotate: 45, duration: 0.5, ease: "back.out(2)" });
        gsap.to(ring, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power3.out"
        });
      };

      const onLeave = () => {
        gsap.to(lt, { yPercent: 0, duration: 0.5, ease: "expo.out" });
        gsap.to(lb, { yPercent: 110, duration: 0.5, ease: "expo.out" });
        gsap.to(ic, { rotate: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(ring, {
          strokeDashoffset: 90,
          duration: 0.7,
          ease: "power3.out"
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: btnRef }
  );

  return (
    <div>
      <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
        <span className="font-display italic text-brand-red">→</span>
        <span>Novedades de campaña</span>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-foreground/60">
        Conoce las próximas actividades, propuestas y novedades de la campaña.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link
          ref={btnRef}
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Recibir novedades de campaña por WhatsApp"
          className="group relative inline-flex items-center gap-4 rounded-full border border-brand-black bg-brand-black pl-6 pr-5 py-2.5 text-[16px] font-medium tracking-tight text-white transition-colors duration-500 hover:border-black/85 hover:bg-black/85"
        >
          <span
            aria-hidden
            className="relative inline-block overflow-hidden"
            style={{ height: "1.4em" }}
          >
            <span
              ref={labelTop}
              className="inline-flex h-[1.4em] items-center leading-none will-change-transform"
            >
              Recibir novedades por WhatsApp
            </span>
            <span
              ref={labelBot}
              className="absolute left-0 top-0 inline-flex h-[1.4em] items-center leading-none will-change-transform"
            >
              Recibir novedades por WhatsApp
            </span>
          </span>

          <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden
            >
              <circle
                cx="16"
                cy="16"
                r="14.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeOpacity="0.18"
              />
              <circle
                ref={ringRef}
                cx="16"
                cy="16"
                r="14.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeDasharray="90"
                strokeDashoffset="90"
                strokeLinecap="round"
              />
            </svg>
            <span
              ref={iconRef}
              className="inline-flex h-3 w-3 items-center justify-center will-change-transform"
            >
              <ArrowUpRight className="h-full w-full" strokeWidth={2} />
            </span>
          </span>
        </Link>

        <p className="text-[13px] leading-relaxed text-foreground/50">
          Te llevaremos a WhatsApp. Tú decides si envías el mensaje.
        </p>
      </div>
    </div>
  );
}
