"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectGroup = SelectPrimitive.Group;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    theme?: "light" | "dark";
  }
>(({ className, theme = "light", children, ...props }, ref) => {
  const dark = theme === "dark";
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "group/sel flex w-full items-center justify-between border-0 border-b bg-transparent py-3 text-left text-[17px] transition-colors data-[state=open]:border-foreground data-[placeholder]:text-foreground/30 [&[data-state=open]>svg]:rotate-180",
        "!outline-none !ring-0 !ring-offset-0 focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0",
        dark
          ? "border-white/25 text-white data-[state=open]:border-white data-[placeholder]:text-white/30"
          : "border-foreground/25 text-foreground data-[state=open]:border-foreground data-[placeholder]:text-foreground/30",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 shrink-0 transition-transform",
            dark ? "text-white/55" : "text-foreground/55"
          )}
          strokeWidth={1.6}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        "relative z-50 max-h-96 min-w-[var(--radix-select-trigger-width)] overflow-hidden border border-foreground/15 bg-background text-foreground shadow-[0_20px_60px_-20px_rgba(10,31,68,0.25)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center gap-3 py-2.5 pl-4 pr-9 text-[15px] text-foreground/75 transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-foreground/[0.04] data-[state=checked]:text-foreground data-[highlighted]:text-foreground data-[disabled]:opacity-50",
      "!outline-none !ring-0 !ring-offset-0 focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator asChild>
      <Check
        className="absolute right-3 h-4 w-4 text-brand-red"
        strokeWidth={2}
      />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("mx-1 my-1 h-px bg-foreground/10", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator
};
