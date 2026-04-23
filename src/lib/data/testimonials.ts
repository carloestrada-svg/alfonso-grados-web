export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alex Morgan listens. When our neighborhood was fighting a predatory developer, she didn't just send a form letter — she showed up, and she stayed until the job was done.",
    name: "Maria Delgado",
    role: "Community Organizer, Oakland"
  },
  {
    quote:
      "I've worked in Sacramento for twenty years. I have never seen a legislator who understands housing policy the way Alex does. She's the real deal.",
    name: "Dr. Nathan Cho",
    role: "Urban Policy Professor, UCLA"
  },
  {
    quote:
      "Alex fought for safe staffing on the Assembly floor when it was politically inconvenient. She stood with nurses then — she'll stand with us in the Senate.",
    name: "Keisha Dunn, RN",
    role: "President, California Nurses Association"
  },
  {
    quote:
      "As a small farmer in the Central Valley, I've been ignored by Washington for decades. Alex is the first candidate in a long time who actually gets rural California.",
    name: "Tom Vasquez",
    role: "Family Farmer, Merced County"
  }
];
