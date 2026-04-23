export type CampaignEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  description: string;
  rsvpUrl: string;
};

export const events: CampaignEvent[] = [
  {
    id: "sac-town-hall",
    title: "Sacramento Town Hall",
    date: "2026-05-03",
    time: "6:00 PM",
    city: "Sacramento",
    venue: "Crest Theatre, 1013 K Street",
    description:
      "Open town hall with Alex Morgan. Bring your questions. Doors at 5:30 PM. Free and open to the public.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "la-canvass-launch",
    title: "LA Canvass Launch",
    date: "2026-05-10",
    time: "9:00 AM",
    city: "Los Angeles",
    venue: "Campaign Field Office, 3780 Wilshire Blvd",
    description:
      "Kickoff breakfast, training, then out to the doors. Coffee and walking gear provided.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "sf-fundraiser",
    title: "San Francisco Grassroots Fundraiser",
    date: "2026-05-16",
    time: "7:00 PM",
    city: "San Francisco",
    venue: "The Chapel, 777 Valencia Street",
    description:
      "Grassroots fundraiser with special guests. Suggested contribution $50 — no one turned away for lack of funds.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "fresno-roundtable",
    title: "Central Valley Farmworker Roundtable",
    date: "2026-05-22",
    time: "10:00 AM",
    city: "Fresno",
    venue: "UFW Hall, 4855 E California Ave",
    description:
      "Roundtable with United Farm Workers and Alex Morgan on heat protections and housing.",
    rsvpUrl: "#rsvp"
  }
];
