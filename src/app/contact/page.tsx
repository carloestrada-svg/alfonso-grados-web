import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the campaign — general questions, media inquiries, events, and constituent services."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description="Questions, media inquiries, or constituent services — we'll get back to you within two business days."
      />

      <section className="bg-background">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr] lg:py-24">
          <FadeIn className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Campaign headquarters
              </h2>
              <p className="mt-2 text-muted-foreground">
                Mail, meetings, and drop-ins welcome during office hours.
              </p>
            </div>

            <ul className="space-y-5 text-sm">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Headquarters</p>
                  <p className="mt-0.5 text-muted-foreground">
                    {candidate.contact.address}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a
                    href={`mailto:${candidate.contact.email}`}
                    className="mt-0.5 block text-muted-foreground underline-offset-4 hover:text-brand-red hover:underline"
                  >
                    {candidate.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <a
                    href={`tel:${candidate.contact.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-0.5 block text-muted-foreground underline-offset-4 hover:text-brand-red hover:underline"
                  >
                    {candidate.contact.phone}
                  </a>
                </div>
              </li>
            </ul>

            <div className="rounded-2xl bg-brand-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">
                Press
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Media inquiries should use the <em>Media inquiry</em> topic in
                the form. We respond same-day to active deadlines — please note
                yours in your message.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
