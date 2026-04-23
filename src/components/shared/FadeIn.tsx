"use client";

import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** y-offset in px (default 24) */
  y?: number;
  delay?: number;
  /** If set, staggers direct children matching this selector */
  staggerSelector?: string;
  stagger?: number;
};

/**
 * Thin client wrapper that fades + rises its contents into place on scroll.
 *
 * Usage:
 *   <FadeIn>...</FadeIn>
 *   <FadeIn staggerSelector="> *" stagger={0.08}>...</FadeIn>
 */
export function FadeIn({
  children,
  className,
  as: Tag = "div",
  y = 24,
  delay = 0,
  staggerSelector,
  stagger
}: Props) {
  const ref = useScrollReveal<HTMLDivElement>({
    y,
    delay,
    selector: staggerSelector,
    stagger
  });

  const initialClass = staggerSelector
    ? "[&>*]:opacity-0"
    : "opacity-0";

  return (
    <Tag ref={ref} className={cn(initialClass, className)}>
      {children}
    </Tag>
  );
}
