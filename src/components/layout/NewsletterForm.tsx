"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const btnRef = useRef<HTMLButtonElement | null>(null);
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
    { scope: btnRef, dependencies: [submitted] }
  );

  if (submitted) {
    return (
      <div className="flex items-center gap-3 border-b border-brand-red/50 pb-5 text-[15px] text-white/85">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-red" />
        <span>
          You&rsquo;re in — watch your inbox for the next dispatch from the
          trail.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label
        htmlFor="newsletter-email"
        className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-white/45"
      >
        <span className="font-display italic text-brand-red">→</span>
        <span>Email address</span>
      </label>

      <div className="mt-3 flex items-end border-b border-white/25 pb-3 transition-colors focus-within:border-white">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-transparent font-display text-[1.3rem] leading-none text-white placeholder:text-white/30 outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-[1.5rem]"
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
        <button
          ref={btnRef}
          type="submit"
          className="group relative inline-flex items-center gap-4 rounded-full border border-white bg-white pl-6 pr-5 py-2.5 text-[16px] font-medium tracking-tight text-brand-navy transition-colors duration-500 hover:border-brand-cream hover:bg-brand-cream"
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
              Subscribe
            </span>
            <span
              ref={labelBot}
              className="absolute left-0 top-0 inline-flex h-[1.4em] items-center leading-none will-change-transform"
            >
              Subscribe
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
        </button>

        <p className="text-[13px] leading-relaxed text-white/40">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </form>
  );
}
