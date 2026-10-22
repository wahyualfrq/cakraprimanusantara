import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import styles from "./SectionHeading.module.css";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  /**
   * Frasa penutup `title` (≤ 3 kata, sudah ada di judul) yang dibuat italic Fraunces.
   * Hanya untuk maks. dua H2 di Beranda (DESIGN.md §5.2 [T5]).
   */
  accent?: string;
  /** Nama section bertitik — hanya di Beranda (§11.2 [T6]). */
  eyebrow?: string;
  description?: ReactNode;
  /** Kontrol di sisi kanan (mis. panah karusel, tautan "Lihat semua"). */
  actions?: ReactNode;
  /** `split` = pola section-head 7:5 di ≥ 900 px; `stack` = judul di atas deskripsi. */
  layout?: "stack" | "split";
  id?: string;
  className?: string;
};

function renderTitle(title: string, accent?: string): ReactNode {
  if (!accent || !title.endsWith(accent)) return title;
  return (
    <>
      {title.slice(0, title.length - accent.length)}
      <em>{accent}</em>
    </>
  );
}

/** Kepala section: eyebrow opsional, H2, deskripsi, dan kontrol (DESIGN.md §3.2 section-head). */
export function SectionHeading({
  title,
  accent,
  eyebrow,
  description,
  actions,
  layout = "stack",
  id,
  className,
}: SectionHeadingProps) {
  const hasSide = Boolean(description || actions);
  return (
    <div className={cn(styles.wrap, layout === "split" && styles.split, className)}>
      <div className={styles.titleGroup}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className={styles.title}>
          {renderTitle(title, accent)}
        </h2>
      </div>
      {hasSide && (
        <div className={styles.side}>
          {description && <p className={styles.description}>{description}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
    </div>
  );
}
