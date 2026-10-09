import type { ReactNode } from "react";
import styles from "./Section.module.css";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn(styles.section, className)}>
      {children}
    </section>
  );
}
