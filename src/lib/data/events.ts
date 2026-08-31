export type EventImage = {
  url: string;
  alt?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};

export type CampaignEvent = {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  startDateTime: string;
  endDateTime?: string;
  city: string;
  venue: string;
  description: string;
  registrationLink?: string;
  featured: boolean;
  status: "programada" | "cancelada";
  mainImage?: EventImage;

  // Campos de compatibilidad con código anterior
  date?: string;
  time?: string;
  rsvpUrl?: string;
};

export const events: CampaignEvent[] = [];

export function getEventById(id: string): CampaignEvent | undefined {
  return events.find((e) => e._id === id || e.id === id);
}

export function getEventBySlug(slug: string): CampaignEvent | undefined {
  return events.find((e) => e.slug === slug);
}
