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

export const events: CampaignEvent[] = [];
