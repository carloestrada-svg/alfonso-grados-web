export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Press Release" | "Statement" | "Endorsement" | "Op-Ed" | "Event";
  author: string;
  readTime: string;
  image: string;
  body: string[];
};

export const news: NewsItem[] = [
  {
    slug: "morgan-unveils-housing-plan",
    title: "Morgan Unveils Plan to Build 3 Million New Homes",
    excerpt:
      "The comprehensive proposal ties federal transit dollars to local zoning reform and creates a permanent federal housing trust.",
    date: "2026-04-14",
    category: "Press Release",
    author: "Morgan Campaign Press",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    body: [
      "SACRAMENTO — Today, Alex Morgan released the most ambitious federal housing plan of any Senate candidate this cycle, promising to fund 3 million new homes over the next decade.",
      "\"The housing crisis isn't a mystery. We stopped building. We have to start again — at scale,\" Morgan said at a press conference outside a stalled affordable housing project in East Sacramento.",
      "The plan creates a permanent federal housing trust seeded with $50 billion, ties federal transit funds to local zoning reform, and closes tax loopholes that reward corporate single-family home speculators.",
      "Housing advocates across the state praised the proposal. \"This is the plan we've been waiting for,\" said Lena Ruiz, executive director of California YIMBY."
    ]
  },
  {
    slug: "endorsement-california-nurses",
    title: "California Nurses Association Endorses Morgan",
    excerpt:
      "The 100,000-member union cited Morgan's record on patient safety and her commitment to expanding Medicare.",
    date: "2026-04-07",
    category: "Endorsement",
    author: "Morgan Campaign Press",
    readTime: "2 min read",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    body: [
      "OAKLAND — The California Nurses Association, representing more than 100,000 registered nurses, announced its endorsement of Alex Morgan for U.S. Senate today.",
      "\"Alex Morgan has walked the picket line with us. She's fought for safe staffing ratios. She's going to Washington to fight for Medicare for All — and we're going with her,\" said CNA president Dr. Keisha Dunn.",
      "Morgan responded: \"There is no group of people I'd rather have in my corner than the nurses of California. This endorsement means everything.\""
    ]
  },
  {
    slug: "statement-on-wildfire-funding",
    title: "Statement on the Federal Wildfire Funding Deal",
    excerpt:
      "Morgan called the bipartisan deal \"a good first step, but nowhere near what California communities need.\"",
    date: "2026-03-28",
    category: "Statement",
    author: "Alex Morgan",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1523867904774-8b1e8c28f4c4?auto=format&fit=crop&w=1600&q=80",
    body: [
      "The bipartisan wildfire funding deal announced this week is a step in the right direction — but let's be honest about what it actually does.",
      "Three billion dollars sounds like a lot until you compare it to the $250 billion California has spent fighting fires in the last decade. We need a federal commitment that matches the scale of the crisis.",
      "In the Senate, I'll push for permanent funding tied to climate resilience metrics, not one-off deals we have to renegotiate every year."
    ]
  },
  {
    slug: "town-hall-fresno-recap",
    title: "What I Heard at the Fresno Town Hall",
    excerpt:
      "Over 400 Central Valley residents packed the hall. Here's what stuck with me.",
    date: "2026-03-19",
    category: "Op-Ed",
    author: "Alex Morgan",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
    body: [
      "I grew up in Fresno. Coming back to talk with neighbors, teachers, farmers, and small business owners — it grounds me every time.",
      "What I heard was clear: people are working harder than ever and falling further behind. Groceries, rent, childcare, insurance — it all costs more, and wages haven't kept up.",
      "I heard from farmworkers worried about heat illness. From teachers leaving the classroom because they can't afford rent. From small business owners drowning in healthcare premiums.",
      "These are solvable problems. They require courage and they require Washington to actually listen to California. That's what I'll do."
    ]
  },
  {
    slug: "volunteer-weekend-kickoff",
    title: "Statewide Volunteer Weekend Kicks Off April 27",
    excerpt:
      "Canvass launches in every major city. Sign up to knock doors, make calls, or host a house party.",
    date: "2026-03-12",
    category: "Event",
    author: "Morgan Campaign Field",
    readTime: "2 min read",
    image:
      "https://images.unsplash.com/photo-1591189824344-77d9a6269b86?auto=format&fit=crop&w=1600&q=80",
    body: [
      "We're launching the biggest volunteer weekend of the primary on April 27 and 28.",
      "Canvass launches are scheduled in Los Angeles, San Diego, Oakland, Sacramento, Fresno, San Jose, Long Beach, Bakersfield, Riverside, and Chico.",
      "Can't knock doors? Host a phone bank from your living room. Can't do that? Host a house party. Every conversation counts."
    ]
  },
  {
    slug: "morgan-education-speech",
    title: "Morgan's Education Speech at UC Berkeley",
    excerpt:
      "\"We are not a serious country if we can't pay our teachers a living wage.\" Full remarks from Berkeley.",
    date: "2026-02-26",
    category: "Press Release",
    author: "Morgan Campaign Press",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    body: [
      "BERKELEY — Speaking to 2,000 students and educators at UC Berkeley's Greek Theatre, Alex Morgan called for a $65,000 national minimum teacher salary.",
      "\"We are not a serious country if we can't pay our teachers a living wage. We are not a serious country if community college is out of reach for the kid who wants to become a machinist,\" Morgan said.",
      "The proposal would be funded by closing carried-interest loopholes and raising the capital gains rate on incomes over $1 million."
    ]
  }
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}
