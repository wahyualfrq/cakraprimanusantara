import type { ReactNode } from "react";
import styles from "./Card.module.css";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}
