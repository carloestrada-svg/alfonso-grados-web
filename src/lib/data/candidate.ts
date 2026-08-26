export const candidate = {
  firstName: "Alex",
  lastName: "Morgan",
  fullName: "Alex Morgan",
  office: "U.S. Senate",
  state: "California",
  tagline: "A new voice. A shared future.",
  mission:
    "Building a state where every family can afford a home, every child has a great public school, and every worker earns a living wage.",
  heroPitch:
    "Two decades in public service — city council, state assembly, and now ready to fight for California in the U.S. Senate. Let's build the future together.",
  shortBio:
    "Alex Morgan has spent twenty years in public service, from the Oakland city council to the California State Assembly, where she authored the landmark Housing First Act. She lives in Sacramento with her wife Jamie and their two children.",
  longBio: [
    "Alex grew up in Fresno, the daughter of a public school teacher and a union electrician. She worked her way through UC Berkeley as a line cook, graduated with honors in Political Science, and spent three years as a legal aid attorney helping tenants fight illegal evictions in Oakland.",
    "In 2008, she ran for Oakland City Council on a platform of affordable housing and accountable policing — and won. Over three terms, she authored the Oakland Fair Chance Hiring Ordinance and secured $280M in public investment for community mental health.",
    "Elected to the California State Assembly in 2018, she chaired the Housing & Community Development Committee, where she passed the Housing First Act — the most ambitious pro-housing reform in California in a generation.",
    "Alex is running for U.S. Senate because she believes Washington has forgotten the people who built this country. She's ready to bring California's common-sense, get-it-done approach to the Senate floor."
  ],
  contact: {
    email: "hello@morganforsenate.com",
    phone: "+1 (916) 555-0199",
    address: "2020 K Street, Suite 400, Sacramento, CA 95814"
  },
  socials: [
    { label: "Twitter", href: "https://twitter.com/morganforsenate" },
    { label: "Facebook", href: "https://facebook.com/morganforsenate" },
    { label: "Instagram", href: "https://instagram.com/morganforsenate" },
    { label: "YouTube", href: "https://youtube.com/@morganforsenate" }
  ],
  stats: [
    { value: "120K+", label: "Doors knocked" },
    { value: "58", label: "Counties visited" },
    { value: "14,200", label: "Volunteers" }
  ]
} as const;

export type Candidate = typeof candidate;
