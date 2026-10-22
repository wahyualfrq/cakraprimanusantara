import type { ReactNode } from "react";
import styles from "./Container.module.css";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  /** `wide` untuk section umum; `article` (820 px) untuk detail berita (DESIGN.md §3.1). */
  size?: "wide" | "article";
  className?: string;
};

export function Container({ children, size = "wide", className }: ContainerProps) {
  return <div className={cn(styles.container, size === "article" && styles.article, className)}>{children}</div>;
}
