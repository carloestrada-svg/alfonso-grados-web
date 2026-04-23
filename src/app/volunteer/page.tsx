import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join the team — knock doors, phone bank, host an event, or drive voters."
};

const heroMeta = [
  { label: "Volunteers", value: "14,200+" },
  { label: "Counties", value: "58 of 58" },
  { label: "Shifts", value: "Weekends & evenings" },
  { label: "Training", value: "Provided" }
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        index="00"
        title="Join the team."
        emphasis="team"
        description="Campaigns are won at the door. Sign up, show up, and we'll match you with shifts in your zip code."
        subtitle="No experience needed. We provide training, scripts, coffee, and good company."
        meta={heroMeta}
      >
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href="#signup" variant="solid" size="lg">
            Sign up now
          </MagneticButton>
          <MagneticButton href="/events" variant="ghost" size="lg">
            See events
          </MagneticButton>
        </div>
      </PageHero>

      <section id="signup" className="relative bg-background">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Sign up</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Fill this in and a field organizer in your area will reach
                out to match you with shifts.
              </p>
            </div>

            <div>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
