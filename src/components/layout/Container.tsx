import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({ children, className, as: Tag = "div" }: Props) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}
