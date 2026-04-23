import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-cream">
      <div className="container max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page may have moved or the link may be out of date. Head back to
          the homepage or check the latest news from the campaign.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="accent">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/news">Read the news</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
