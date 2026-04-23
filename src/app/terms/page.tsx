import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { LegalSection } from "@/components/shared/LegalSection";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of service for morganforsenate.com — campaign site usage, donations, and user content."
};

const heroMeta = [
  { label: "Effective", value: "April 22, 2026" },
  { label: "Last updated", value: "April 22, 2026" },
  { label: "Jurisdiction", value: "California, USA" },
  { label: "Contact", value: candidate.contact.email }
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        index="00"
        title="Terms & Conditions."
        emphasis="Conditions"
        description="The rules of the road for using this campaign site — donations, user-submitted content, and the fine print."
        subtitle="By using morganforsenate.com, you agree to these terms. If anything's unclear, email us."
        meta={heroMeta}
      />

      <LegalSection
        index="01"
        label="Acceptance"
        title="Your agreement with us."
      >
        <p>
          By accessing or using morganforsenate.com (&ldquo;the site&rdquo;),
          you agree to these Terms & Conditions. If you do not agree, please
          do not use the site.
        </p>
      </LegalSection>

      <LegalSection
        index="02"
        label="Use of the site"
        title="What you may and may not do."
        bg="cream"
      >
        <p>
          You may use the site for personal, non-commercial purposes related
          to the campaign: reading about Alex, signing up to volunteer,
          RSVP&rsquo;ing to events, submitting questions, and donating.
        </p>
        <p>
          You may not attempt to disrupt the site, submit false information,
          impersonate others, attempt to gain unauthorized access, or use
          the site for commercial scraping.
        </p>
      </LegalSection>

      <LegalSection
        index="03"
        label="Donations"
        title="About campaign contributions."
      >
        <p>
          Donations are processed through ActBlue. By donating you certify
          that you are a U.S. citizen or permanent resident, at least 18
          years old, using personal funds (not reimbursed by another
          person), and not a federal contractor.
        </p>
        <p>
          Donations are subject to federal election law. Contributions to
          political campaigns are not tax-deductible.
        </p>
      </LegalSection>

      <LegalSection
        index="04"
        label="Your content"
        title="What you submit through our forms."
        bg="cream"
      >
        <p>
          When you submit a question, message, volunteer application, or
          event RSVP, you grant the campaign a non-exclusive license to
          read, store, and respond to your submission. Selected questions
          may be answered publicly in the weekly dispatch (without
          identifying personal details).
        </p>
      </LegalSection>

      <LegalSection
        index="05"
        label="Content on the site"
        title="Copyright and marks."
      >
        <p>
          All content on this site — text, photos, logos, graphics, and
          code — is owned by or licensed to the campaign and protected
          under U.S. and international copyright law. You may not copy or
          redistribute site content without written permission, except for
          personal, non-commercial reference.
        </p>
      </LegalSection>

      <LegalSection
        index="06"
        label="Disclaimers"
        title="What we can't guarantee."
        bg="cream"
      >
        <p>
          The site is provided &ldquo;as is&rdquo;. We work hard to keep it
          accurate, secure, and available, but we don&rsquo;t guarantee
          uninterrupted service, error-free content, or that information is
          current at every moment. Third-party links are provided for
          convenience and we&rsquo;re not responsible for their content.
        </p>
      </LegalSection>

      <LegalSection
        index="07"
        label="Changes"
        title="We may update these terms."
      >
        <p>
          We may update these terms from time to time. Material changes will
          be noted on this page with a new &ldquo;Last updated&rdquo; date.
          Continued use of the site after changes means you accept the
          revised terms.
        </p>
      </LegalSection>

      <LegalSection
        index="08"
        label="Contact"
        title="Questions about these terms."
        bg="cream"
      >
        <p>
          For questions, write to us at{" "}
          <a
            href={`mailto:${candidate.contact.email}`}
            className="text-brand-red underline-offset-4 hover:underline"
          >
            {candidate.contact.email}
          </a>{" "}
          with &ldquo;Terms&rdquo; in the subject line.
        </p>
      </LegalSection>
    </>
  );
}
