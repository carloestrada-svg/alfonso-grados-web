export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Ask Alex", href: "/ask" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" }
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Campaign",
    links: [
      { label: "About Alex", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Ask a question", href: "/ask" },
      { label: "RSVP to events", href: "/events" }
    ]
  },
];

export const timeline: { year: string; title: string; description: string }[] = [
  {
    year: "1998",
    title: "Line cook at Cal",
    description:
      "Works her way through UC Berkeley while studying political science."
  },
  {
    year: "2004",
    title: "Legal aid attorney",
    description:
      "Fights illegal evictions for East Bay tenants at Oakland Legal Aid."
  },
  {
    year: "2008",
    title: "Oakland City Council",
    description:
      "Elected on a platform of affordable housing and accountable policing."
  },
  {
    year: "2014",
    title: "Fair Chance Hiring Ordinance",
    description:
      "Authors landmark legislation banning the box on municipal job applications."
  },
  {
    year: "2018",
    title: "California State Assembly",
    description:
      "Chairs the Housing & Community Development Committee."
  },
  {
    year: "2022",
    title: "Housing First Act",
    description:
      "Passes the most ambitious pro-housing reform in California in a generation."
  },
  {
    year: "2026",
    title: "Running for U.S. Senate",
    description: "Taking California's fight to Washington."
  }
];

export const values: { title: string; description: string }[] = [
  {
    title: "Show up",
    description:
      "Every county. Every zip code. Democracy doesn't work when the people in power only show up at election time."
  },
  {
    title: "Tell the truth",
    description:
      "Hard problems don't have easy answers. I'll never pretend they do."
  },
  {
    title: "Deliver results",
    description:
      "Twenty years of public service. A record of bills signed into law. A habit of getting it done."
  },
  {
    title: "Represent everyone",
    description:
      "Red counties. Blue counties. Every Californian deserves a Senator who fights for them."
  }
];
