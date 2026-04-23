import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the campaign — press, endorsements, events, and policy questions."
};

const heroMeta = [
  { label: "Press", value: "Within 24 hours" },
  { label: "General", value: "Within 2 days" },
  { label: "Email", value: candidate.contact.email },
  { label: "Office", value: candidate.contact.address.split(",")[0] }
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        index="00"
        title="Get in touch."
        emphasis="in touch"
        description="Questions, press inquiries, endorsements, or event requests — we'll get back to you within two business days."
        subtitle="Every message lands in a real person's inbox. We read every one."
        meta={heroMeta}
      />

      <section className="relative bg-background">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Send a message</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Tell us what&rsquo;s on your mind. For time-sensitive press
                questions, note your deadline in the message.
              </p>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
