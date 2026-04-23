"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  href: string;
  label: string;
};

export function FooterLink({ href, label }: Props) {
  const rootRef = useRef<HTMLAnchorElement | null>(null);
  const topRef = useRef<HTMLSpanElement | null>(null);
  const botRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const top = topRef.current;
      const bot = botRef.current;
      if (!el || !top || !bot) return;

      gsap.set(bot, { yPercent: 110 });

      const onEnter = () => {
        gsap.to(top, { yPercent: -110, duration: 0.7, ease: "expo.out" });
        gsap.to(bot, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      };
      const onLeave = () => {
        gsap.to(top, { yPercent: 0, duration: 0.75, ease: "expo.out" });
        gsap.to(bot, { yPercent: 110, duration: 0.75, ease: "expo.out" });
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
    <Link
      ref={rootRef}
      href={href}
      className="inline-flex items-baseline text-[16px] text-white/70 transition-colors hover:text-white"
    >
      <span
        aria-hidden
        className="relative inline-block overflow-hidden"
        style={{ height: "1.2em" }}
      >
        <span
          ref={topRef}
          className="inline-flex h-[1.2em] items-center will-change-transform"
        >
          {label}
        </span>
        <span
          ref={botRef}
          className="absolute left-0 top-0 inline-flex h-[1.2em] items-center will-change-transform"
        >
          {label}
        </span>
      </span>
    </Link>
  );
}
