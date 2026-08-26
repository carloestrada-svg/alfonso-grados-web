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

export function getEventById(id: string): CampaignEvent | undefined {
  return events.find((e) => e.id === id);
}

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
    id: "fresno-roundtable",
    title: "Central Valley Farmworker Roundtable",
    date: "2026-05-22",
    time: "10:00 AM",
    city: "Fresno",
    venue: "UFW Hall, 4855 E California Ave",
    description:
      "Roundtable with United Farm Workers and Alex Morgan on heat protections and housing.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "oakland-forum",
    title: "Oakland Community Forum",
    date: "2026-05-28",
    time: "6:30 PM",
    city: "Oakland",
    venue: "Impact Hub Oakland, 2323 Broadway",
    description:
      "Community conversation on public safety, housing, and reinvestment. Sign-language interpretation provided.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "sd-rally",
    title: "San Diego Waterfront Rally",
    date: "2026-06-04",
    time: "5:00 PM",
    city: "San Diego",
    venue: "Embarcadero Marina Park North",
    description:
      "Outdoor rally with local leaders, union members, and special musical guests. Bring friends, family, and sunscreen.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "bakersfield-townhall",
    title: "Bakersfield Water & Agriculture Town Hall",
    date: "2026-06-18",
    time: "6:00 PM",
    city: "Bakersfield",
    venue: "Kern County Farm Bureau, 801 S Mt Vernon Ave",
    description:
      "Town hall focused on drought resilience, groundwater, and farmworker protections in Kern County.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "riverside-canvass",
    title: "Riverside Weekend Canvass",
    date: "2026-06-20",
    time: "9:30 AM",
    city: "Riverside",
    venue: "Fairmount Park Picnic Area",
    description:
      "Saturday morning canvass launch. Breakfast, training, then four-hour walk shifts with a partner.",
    rsvpUrl: "#rsvp"
  },
  {
    id: "chico-social",
    title: "Chico Coffee & Conversation",
    date: "2026-06-27",
    time: "11:00 AM",
    city: "Chico",
    venue: "Naked Lounge Coffee, 118 W 2nd Street",
    description:
      "Informal coffee-shop meetup. No program, no agenda — just conversation with Alex and neighbors.",
    rsvpUrl: "#rsvp"
  }
];
