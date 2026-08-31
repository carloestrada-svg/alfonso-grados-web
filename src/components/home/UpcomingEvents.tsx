import { getUpcomingEvents } from "@/sanity/lib/events";
import { UpcomingEventsClient } from "./UpcomingEventsClient";

export async function UpcomingEvents() {
  const events = await getUpcomingEvents(3);

  return <UpcomingEventsClient events={events} />;
}
