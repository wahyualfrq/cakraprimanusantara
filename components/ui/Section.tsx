import type { ReactNode } from "react";
import styles from "./Section.module.css";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Latar section. `muted`/`tint` otomatis menjadi band (padding penuh) — maks. satu per halaman (§4.3). */
  tone?: "plain" | "muted" | "tint";
  /** Paksa perilaku band untuk section polos yang berisi wadah berlatar (mis. band CTA). */
  spacing?: "default" | "band";
  "aria-labelledby"?: string;
};

export function Section({
  children,
  className,
  id,
  tone = "plain",
  spacing = "default",
  "aria-labelledby": labelledBy,
}: SectionProps) {
  const band = tone !== "plain" || spacing === "band";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(styles.section, band && styles.band, tone !== "plain" && styles[tone], className)}
    >
      {children}
    </section>
  );
}
