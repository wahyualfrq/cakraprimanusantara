import styles from "./SectionHeading.module.css";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /** Default mati — batas 1 eyebrow label per halaman (DESIGN.md §8.11). */
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Judul section + deskripsi opsional. H2 selalu Fraunces/heading font,
 * semibold, tanpa italic — treatment italic khusus H1 hero/unit saja
 * (DESIGN.md §6.1).
 */
export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(styles.wrap, align === "center" && styles.center, className)}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
