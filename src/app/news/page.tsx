import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { NewsGrid } from "@/components/news/NewsGrid";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "News",
  description:
    "Press releases, statements, endorsements, and op-eds from the campaign trail."
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="From the campaign trail."
        description="Statements, endorsements, op-eds, and press releases. Subscribe to updates for more."
      />
      <NewsGrid />
      <CTASection />
    </>
  );
}
