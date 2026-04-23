import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { LegalSection } from "@/components/shared/LegalSection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Morgan for Senate campaign collects, uses, and protects your information."
};

const heroMeta = [
  { label: "Effective", value: "April 22, 2026" },
  { label: "Last updated", value: "April 22, 2026" },
  { label: "Contact", value: candidate.contact.email },
  { label: "Covers", value: "morganforsenate.com" }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        index="00"
        title="Privacy Policy."
        emphasis="Privacy"
        description="How the campaign collects, uses, stores, and protects your information — written in plain language."
        subtitle="We only ask for what we need. We never sell your data. Short version up top, full policy below."
        meta={heroMeta}
      />

      <LegalSection index="01" label="Overview" title="The short version.">
        <p>
          {candidate.fullName} for {candidate.office} (&ldquo;we&rdquo;,
          &ldquo;the campaign&rdquo;) respects your privacy. We collect only
          the information we need to run a campaign — contact you about
          events, process donations, and match volunteers with shifts.
        </p>
        <p>
          We do not sell your personal information. We do not share it with
          outside political organizations without consent.
        </p>
      </LegalSection>

      <LegalSection
        index="02"
        label="What we collect"
        title="Information we ask you for."
        bg="cream"
      >
        <p>
          When you sign up, volunteer, RSVP to an event, contact us, or
          submit a question, we may ask for:
        </p>
        <ul className="flex list-none flex-col gap-2 pl-0">
          {[
            "Name and email address",
            "Phone number and zip code (for field organizing)",
            "City and availability (for volunteer matching)",
            "Questions, notes, or messages you submit",
            "Donation amount and billing information (processed via ActBlue)"
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[0.7em] h-px w-4 shrink-0 bg-brand-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection index="03" label="How we use it" title="What we do with your data.">
        <p>
          Information is used to run the campaign: to contact you about
          events and volunteer opportunities, to answer your questions, to
          process donations in compliance with federal election law, and to
          match volunteers with field shifts in their area.
        </p>
        <p>
          Aggregate, anonymized data may be used to analyze campaign
          performance. It never identifies you personally.
        </p>
      </LegalSection>

      <LegalSection
        index="04"
        label="Sharing"
        title="Who we share with."
        bg="cream"
      >
        <p>
          We share information with service providers who help us run the
          campaign (ActBlue for donations, email providers, hosting) under
          strict confidentiality agreements. Federal law may require us to
          report donor information to the Federal Election Commission —
          donors of over $200 are reported publicly as required.
        </p>
        <p>We do not sell your information. We do not trade donor lists.</p>
      </LegalSection>

      <LegalSection index="05" label="Cookies" title="Cookies and tracking.">
        <p>
          Our site uses essential cookies for functionality and anonymous
          analytics cookies to understand how visitors use the site. You
          can disable cookies in your browser settings without losing core
          functionality.
        </p>
      </LegalSection>

      <LegalSection
        index="06"
        label="Your rights"
        title="What you can ask us to do."
        bg="cream"
      >
        <p>
          You can email us at any time to request a copy of the data we
          hold on you, ask us to correct or delete it, or unsubscribe from
          our communications.
        </p>
        <p>
          Every email we send includes a one-click unsubscribe link at the
          bottom.
        </p>
      </LegalSection>

      <LegalSection index="07" label="Contact" title="Questions or requests.">
        <p>
          For privacy-related questions, write to us at{" "}
          <a
            href={`mailto:${candidate.contact.email}`}
            className="text-brand-red underline-offset-4 hover:underline"
          >
            {candidate.contact.email}
          </a>{" "}
          with &ldquo;Privacy&rdquo; in the subject line. We respond within
          five business days.
        </p>
      </LegalSection>
    </>
  );
}
