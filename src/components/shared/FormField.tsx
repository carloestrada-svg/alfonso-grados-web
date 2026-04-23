"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes
} from "react";

import { cn } from "@/lib/utils";

const baseField =
  "w-full border-0 border-b border-foreground/25 bg-transparent py-3 text-[17px] text-foreground placeholder:text-foreground/30 outline-none ring-0 ring-offset-0 transition-colors focus:border-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

const darkField =
  "w-full border-0 border-b border-white/25 bg-transparent py-3 text-[17px] text-white placeholder:text-white/30 outline-none ring-0 ring-offset-0 transition-colors focus:border-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

type LabelProps = {
  index: string;
  label: string;
  hint?: string;
  htmlFor?: string;
  theme?: "light" | "dark";
};

export function FieldLabel({
  index,
  label,
  hint,
  htmlFor,
  theme = "light"
}: LabelProps) {
  const dark = theme === "dark";
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em]",
        dark ? "text-white/55" : "text-foreground/55"
      )}
    >
      <span className="font-display italic text-brand-red">{index}</span>
      <span>{label}</span>
      {hint ? (
        <>
          <span
            aria-hidden
            className={cn(
              "h-px flex-1",
              dark ? "bg-white/20" : "bg-foreground/15"
            )}
          />
          <span
            className={cn(
              "text-[12px] normal-case tracking-normal",
              dark ? "text-white/40" : "text-foreground/40"
            )}
          >
            {hint}
          </span>
        </>
      ) : null}
    </label>
  );
}

export const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { theme?: "light" | "dark" }
>(function TextField({ className, theme = "light", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(theme === "dark" ? darkField : baseField, className)}
      {...props}
    />
  );
});

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { theme?: "light" | "dark" }
>(function TextAreaField({ className, theme = "light", rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "resize-y",
        theme === "dark" ? darkField : baseField,
        className
      )}
      {...props}
    />
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { theme?: "light" | "dark" }
>(function SelectField({ className, theme = "light", children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "appearance-none",
        theme === "dark" ? darkField : baseField,
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

type CheckGroupProps = {
  name: string;
  options: { value: string; label: string }[];
  theme?: "light" | "dark";
};

export function CheckGroup({ name, options, theme = "light" }: CheckGroupProps) {
  const dark = theme === "dark";
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3">
      {options.map((o) => (
        <label
          key={o.value}
          className={cn(
            "group flex cursor-pointer items-center gap-3 text-[15px] transition-colors",
            dark
              ? "text-white/70 hover:text-white"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          <input
            type="checkbox"
            name={name}
            value={o.value}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={cn(
              "relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
              dark
                ? "border-white/40 peer-checked:border-brand-red peer-checked:bg-brand-red"
                : "border-foreground/35 peer-checked:border-brand-red peer-checked:bg-brand-red",
              "peer-checked:border-brand-red peer-checked:bg-brand-red"
            )}
          >
            <span className="hidden h-2 w-2 rotate-45 border-b-[1.5px] border-r-[1.5px] border-white peer-checked:block" />
          </span>
          {o.label}
        </label>
      ))}
    </div>
  );
}
