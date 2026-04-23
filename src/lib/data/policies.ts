import type { LucideIcon } from "lucide-react";
import {
  Home,
  GraduationCap,
  HeartPulse,
  Leaf,
  Briefcase,
  Scale,
  ShieldCheck,
  Sprout
} from "lucide-react";

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  details: string[];
};

export const policies: Policy[] = [
  {
    slug: "housing",
    title: "Housing Every Family Can Afford",
    summary:
      "Reform zoning, build at scale, and protect renters — because no family should be one missed paycheck from the street.",
    icon: Home,
    details: [
      "Fund 3 million new homes over the next decade via a federal housing trust.",
      "Tie federal transit dollars to local zoning reform that legalizes multi-family housing.",
      "Cap corporate single-family home ownership and close the investor tax loopholes.",
      "Fully fund Section 8 — the waitlist is a policy choice, not an inevitability."
    ]
  },
  {
    slug: "education",
    title: "World-Class Public Schools",
    summary:
      "Raise teacher pay, expand universal Pre-K, and make community college free and accessible.",
    icon: GraduationCap,
    details: [
      "National minimum teacher salary of $65,000, indexed to cost of living.",
      "Universal Pre-K, fully federally funded.",
      "Tuition-free community college and apprenticeship pathways.",
      "Cancel predatory student loan interest and refinance federal loans at 0%."
    ]
  },
  {
    slug: "healthcare",
    title: "Healthcare as a Human Right",
    summary:
      "Lower drug prices, expand Medicare, and protect reproductive freedom in every state.",
    icon: HeartPulse,
    details: [
      "Let Medicare negotiate drug prices on every prescription, not just ten.",
      "Cap insulin at $35 and inhalers at $25 for every American.",
      "Lower the Medicare eligibility age to 55.",
      "Codify Roe and protect the right to travel for care."
    ]
  },
  {
    slug: "climate",
    title: "A Livable Planet",
    summary:
      "Invest in clean energy jobs, hold polluters accountable, and prepare communities for wildfire, drought, and flood.",
    icon: Leaf,
    details: [
      "Double the pace of clean energy deployment through streamlined permitting.",
      "Fund wildfire resilience and forest management in every at-risk county.",
      "Retrain fossil fuel workers with wage guarantees for green jobs.",
      "End taxpayer subsidies for oil and gas — full stop."
    ]
  },
  {
    slug: "jobs",
    title: "Good Jobs, Strong Unions",
    summary:
      "Raise the federal minimum wage, pass the PRO Act, and rebuild American manufacturing.",
    icon: Briefcase,
    details: [
      "Raise the federal minimum wage to $17 and index to inflation.",
      "Pass the PRO Act to protect the right to organize.",
      "Expand the Child Tax Credit — it cut child poverty in half and we let it lapse.",
      "Tax stock buybacks, not paychecks."
    ]
  },
  {
    slug: "justice",
    title: "A Fair Justice System",
    summary:
      "End the cash bail trap, demilitarize policing, and treat addiction as a health crisis, not a crime.",
    icon: Scale,
    details: [
      "End federal cash bail and fund pretrial services instead.",
      "Federal standards for use-of-force and body-cam transparency.",
      "Fully fund treatment and diversion over mass incarceration.",
      "Legalize cannabis federally and expunge prior convictions."
    ]
  },
  {
    slug: "democracy",
    title: "Protecting Democracy",
    summary:
      "Expand voting rights, end partisan gerrymandering, and get dark money out of politics.",
    icon: ShieldCheck,
    details: [
      "Pass the Freedom to Vote Act and restore the Voting Rights Act.",
      "Automatic voter registration and same-day registration in every state.",
      "Independent redistricting commissions nationwide.",
      "Overturn Citizens United — by amendment if we must."
    ]
  },
  {
    slug: "rural",
    title: "Rural Communities That Thrive",
    summary:
      "Bring high-speed internet, healthcare, and good jobs to every corner of our state.",
    icon: Sprout,
    details: [
      "Universal rural broadband by 2030.",
      "Save rural hospitals with direct federal grants and Medicaid expansion.",
      "Support family farms with antitrust enforcement against Big Ag.",
      "Invest in rural entrepreneurship and Main Street revitalization."
    ]
  }
];
