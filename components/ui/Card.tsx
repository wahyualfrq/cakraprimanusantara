import type { ElementType, ReactNode } from "react";
import styles from "./Card.module.css";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  "aria-labelledby"?: string;
};

/** Panel informasi S1 (DESIGN.md §11.1) — aside fakta, callout tunggal, panel form. */
export function Card({ children, as: Tag = "div", className, ...rest }: CardProps) {
  return (
    <Tag className={cn(styles.card, className)} {...rest}>
      {children}
    </Tag>
  );
}
