"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/data/navigation";
import { candidate } from "@/lib/data/candidate";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-white hover:bg-white/10 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-display text-2xl leading-none tracking-tight text-brand-navy">
            {candidate.lastName}
          </span>
          <span className="font-display text-2xl leading-none text-brand-red">
            .
          </span>
        </div>

        <nav className="mt-10 flex flex-col" aria-label="Mobile">
          {primaryNav
            .filter((n) => n.href !== "/")
            .map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between border-b border-border/60 py-4 text-base font-medium transition-colors",
                      active
                        ? "text-brand-navy"
                        : "text-brand-navy/70 hover:text-brand-navy"
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-colors",
                        active ? "text-brand-red" : "text-brand-navy/30"
                      )}
                    />
                  </Link>
                </SheetClose>
              );
            })}
        </nav>

        <div className="mt-auto pt-6">
          <SheetClose asChild>
            <Link
              href="/donate"
              className="group flex h-12 w-full items-center justify-between rounded-full bg-brand-navy pl-6 pr-2 text-[15px] font-medium text-white transition-colors hover:bg-brand-red"
            >
              Donate
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
