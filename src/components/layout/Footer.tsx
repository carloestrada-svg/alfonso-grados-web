import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Music2
} from "lucide-react";

import { candidate } from "@/lib/data/candidate";
import { footerNav } from "@/lib/data/navigation";
import { NewsletterForm } from "./NewsletterForm";
import { FooterLink } from "./FooterLink";

const socialIcons: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  TikTok: Music2,
  WhatsApp: MessageCircle
};

export function Footer() {
  return (
    <footer className="relative">
      {/* Sección 08 — Mantente informado */}
      <section className="relative bg-brand-cream text-foreground border-t border-foreground/10">
        <div className="container relative">
          <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-20">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">08</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Mantente informado</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Recibe las novedades de campaña, actividades vecinales y propuestas para Yanahuara.
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-foreground">
                <span
                  className="block"
                  style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)" }}
                >
                  Recibe noticias —{" "}
                  <em className="italic text-brand-red">directo de Alfonso</em>.
                </span>
              </h3>
              <div className="mt-8 max-w-xl">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer inferior con degradado vertical inverso */}
      <div
        className="relative text-brand-black"
        style={{
          background: "linear-gradient(180deg, #EEEC98 0%, #F9D500 100%)"
        }}
      >
        <div className="container relative">
          <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-20">
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                aria-label="Alfonso Grados - Alcalde de Yanahuara"
                className="group flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.02]"
              >
                <Image
                  src="/images/campaign/alfonso-grados-logo.png"
                  alt="Alfonso Grados - Alcalde de Yanahuara"
                  width={390}
                  height={147}
                  className="h-12 w-auto object-contain sm:h-14"
                />
              </Link>

              <p className="max-w-sm text-[15px] leading-[1.6] text-black/75">
                {candidate.fullName} · {candidate.office}
                <br />
                {candidate.district}, {candidate.region}, {candidate.country}.
              </p>

              {candidate.contact.email ? (
                <div className="flex flex-wrap items-center gap-4 text-[15px] text-black/80">
                  <a
                    href={`mailto:${candidate.contact.email}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-brand-red"
                  >
                    <Mail className="h-4 w-4" />
                    {candidate.contact.email}
                  </a>
                </div>
              ) : null}

              {candidate.socials.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.socials.map((s) => {
                    const Icon = socialIcons[s.label];
                    if (!Icon) return null;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/80 transition-colors hover:border-black hover:bg-black/[0.05] hover:text-brand-red"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              {footerNav.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-[13px] font-medium uppercase tracking-[0.24em] text-black/60">
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

          <div className="flex flex-col gap-4 border-t border-black/15 py-5 text-[13px] text-black/60 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl">
              Campaña oficial de {candidate.fullName} · {candidate.office}. Yanahuara, Arequipa.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/politica-de-privacidad" className="transition-colors hover:text-brand-red">
                Política de Privacidad
              </Link>
              <span aria-hidden className="h-px w-4 bg-black/15" />
              <Link href="/terminos-y-condiciones" className="transition-colors hover:text-brand-red">
                Términos y Condiciones
              </Link>
              <span aria-hidden className="h-px w-4 bg-black/15" />
              <p>
                © {new Date().getFullYear()} {candidate.fullName} · {candidate.office}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
