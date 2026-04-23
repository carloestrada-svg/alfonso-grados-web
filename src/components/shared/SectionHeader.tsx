import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: Props) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand-red">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
