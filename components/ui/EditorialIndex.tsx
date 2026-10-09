import Link from "next/link";
import { ContentImage, type ContentImageVariant } from "@/components/ui/ContentImage";
import styles from "./EditorialIndex.module.css";
import { cn } from "@/lib/utils";

export type EditorialIndexItem = {
  href: string;
  title: string;
  deskripsi: string;
};

type EditorialIndexProps = {
  items: EditorialIndexItem[];
  thumbnailVariant?: ContentImageVariant;
  className?: string;
};

/**
 * Indeks editorial bernomor — baris berlink, bukan grid kartu
 * (DESIGN.md §8.11 "Landing unit"). Thumbnail hover cuma muncul di
 * perangkat hover-capable; seluruh baris satu link dengan accessible name
 * = judul saja (deskripsi, thumbnail, panah disembunyikan dari AT).
 */
export function EditorialIndex({ items, thumbnailVariant = "unit", className }: EditorialIndexProps) {
  return (
    <ol className={cn(styles.list, className)}>
      {items.map((item, index) => (
        <li key={item.href} className={styles.item}>
          <Link href={item.href} className={styles.row}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.title}>{item.title}</span>
            <span aria-hidden="true" className={styles.decorative}>
              <span className={styles.description}>{item.deskripsi}</span>
              <span className={styles.thumbnail}>
                <ContentImage alt="" variant={thumbnailVariant} fill sizes="160px" />
              </span>
              <span className={styles.arrow}>→</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
