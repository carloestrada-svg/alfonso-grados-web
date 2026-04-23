import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Youtube
} from "lucide-react";

import { candidate } from "@/lib/data/candidate";
import { footerNav } from "@/lib/data/navigation";
import { NewsletterForm } from "./NewsletterForm";
import { FooterLink } from "./FooterLink";

const socialIcons: Record<string, typeof Twitter> = {
  Twitter,
  Facebook,
  Instagram,
  YouTube: Youtube
};

export function Footer() {
  return (
    <footer className="relative bg-brand-navy text-white">
      <div className="container relative">
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-white/55">
              <span className="tabular-nums">08</span>
              <span className="h-px w-8 bg-white/25" />
              <span>Stay in the loop</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-white/60">
              Weekly dispatches from the trail, event invites, and a first
              look at new policy rollouts.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-white">
              <span
                className="block"
                style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)" }}
              >
                Get updates —{" "}
                <em className="italic text-brand-red">straight from Alex</em>.
              </span>
            </h3>
            <div className="mt-8 max-w-xl">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-20">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              aria-label={`${candidate.fullName} homepage`}
              className="flex items-baseline gap-[3px]"
            >
              <span className="font-display text-[1.6rem] leading-none tracking-tight text-white">
                {candidate.lastName}
              </span>
              <span className="font-display text-[1.6rem] leading-none text-brand-red">
                .
              </span>
            </Link>

            <p className="max-w-sm text-[15px] leading-[1.6] text-white/60">
              {candidate.fullName}, candidate for {candidate.office} ·{" "}
              {candidate.state}. {candidate.contact.address}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[15px] text-white/70">
              <a
                href={`mailto:${candidate.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {candidate.contact.email}
              </a>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {candidate.socials.map((s) => {
                const Icon = socialIcons[s.label] ?? Twitter;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white hover:bg-white/[0.05]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[13px] font-medium uppercase tracking-[0.24em] text-white/45">
                  {col.heading}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink href={l.href} label={l.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-5 text-[13px] text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl">
            Paid for by {candidate.fullName} for {candidate.office}. Not
            authorized by any candidate or candidate&rsquo;s committee.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden className="h-px w-4 bg-white/15" />
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>
            <span aria-hidden className="h-px w-4 bg-white/15" />
            <p>
              © {new Date().getFullYear()} {candidate.lastName} for Senate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
