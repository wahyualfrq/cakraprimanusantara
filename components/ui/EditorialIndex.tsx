import Image from "next/image";
import Link from "next/link";
import { type ContentImageVariant } from "@/components/ui/ContentImage";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./EditorialIndex.module.css";
import { cn } from "@/lib/utils";

export type EditorialIndexItem = {
  href: string;
  title: string;
  deskripsi: string;
  /** Label kecil di bawah judul (mis. kategori produk bersumber). */
  meta?: string;
  /** Gambar produk/item asli. */
  image?: string;
};

type EditorialIndexProps = {
  items: EditorialIndexItem[];
  /** Thumbnail hover; kosongkan bila tidak ada gambar unik per item (DESIGN.md §12.1). */
  thumbnailVariant?: ContentImageVariant;
  /** Nomor awal (mis. 2 bila item pertama ditampilkan terpisah sebagai unggulan). */
  start?: number;
  className?: string;
};

/**
 * Daftar editorial bernomor S6 (DESIGN.md §11.2) — baris berlink, bukan grid kartu.
 * Seluruh baris satu tautan dengan nama aksesibel = judul (sisanya aria-hidden).
 */
export function EditorialIndex({ items, start = 1, className }: EditorialIndexProps) {
  return (
    <Reveal as="ol" stagger className={cn(styles.list, className)}>
      {items.map((item, index) => (
        <li key={item.href} className={styles.item}>
          <Link href={item.href} className={styles.row}>
            <span className={styles.number} aria-hidden="true">
              {String(index + start).padStart(2, "0")}
            </span>
            {item.image && (
              <span className={styles.thumbWrap} aria-hidden="true">
                <Image
                  src={item.image}
                  alt={`Kemasan ${item.title}`}
                  fill
                  sizes="(max-width: 900px) 72px, 96px"
                  className={styles.thumbImage}
                />
              </span>
            )}
            <span className={styles.title}>{item.title}</span>
            <span aria-hidden="true" className={styles.decorative}>
              {item.meta && <span className={styles.meta}>{item.meta}</span>}
              <span className={styles.description}>{item.deskripsi}</span>
              <span className={styles.arrow}>→</span>
            </span>
          </Link>
        </li>
      ))}
    </Reveal>
  );
}
