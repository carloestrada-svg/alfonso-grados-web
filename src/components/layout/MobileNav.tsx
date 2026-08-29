"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menú"
          className="h-11 w-11 text-brand-black hover:bg-black/10 hover:text-brand-black"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col bg-brand-yellow border-black/15 text-brand-black">
        <div className="mt-2 flex items-center">
          <Image
            src="/images/campaign/alfonso-grados-logo.png"
            alt="Alfonso Grados - Alcalde de Yanahuara"
            width={390}
            height={147}
            className="h-11 w-auto object-contain"
          />
        </div>

        <nav className="mt-8 flex flex-col" aria-label="Navegación móvil">
          {primaryNav
            .filter((n) => n.href !== "/")
            .map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between border-b border-black/15 py-4 text-base font-bold transition-colors",
                      active
                        ? "text-brand-red"
                        : "text-brand-black hover:text-brand-red"
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-colors",
                        active ? "text-brand-red" : "text-brand-black/40"
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
              href="/sumate"
              className="group flex h-12 w-full items-center justify-between rounded-full bg-brand-red pl-6 pr-2 text-[15px] font-bold text-white transition-colors hover:bg-brand-red/90 shadow-md"
            >
              Súmate
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
