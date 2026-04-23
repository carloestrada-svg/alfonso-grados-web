import { cn } from "@/lib/utils";
import { AnimatedHeading } from "./AnimatedHeading";
import { FadeIn } from "./FadeIn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, className }: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-navy text-white",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(200,16,46,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(201,162,39,0.25), transparent 50%)"
        }}
      />
      <div className="container relative py-20 sm:py-28 lg:py-32">
        {eyebrow ? (
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              {eyebrow}
            </span>
          </FadeIn>
        ) : null}
        <AnimatedHeading
          as="h1"
          text={title}
          className="mt-4 text-4xl font-semibold sm:text-5xl lg:text-6xl"
        />
        {description ? (
          <FadeIn delay={0.2} className="mt-6 max-w-2xl">
            <p className="text-lg text-white/80 sm:text-xl">{description}</p>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
