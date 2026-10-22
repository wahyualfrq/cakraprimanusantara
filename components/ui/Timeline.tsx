import { Reveal } from "./Reveal";
import styles from "./Timeline.module.css";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  tahun: number;
  deskripsi: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

/**
 * Timeline (DESIGN.md §11.2): garis 2 px green-200, titik 14 px green-700, tahun Fraunces;
 * kolom tahun 7rem ≥ 900 px, tahun di atas teks di bawahnya. Satu komponen untuk Beranda,
 * Tentang Kami, dan Riset & Inovasi. Isi = data milestone bersumber, verbatim.
 */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <Reveal as="ol" stagger className={cn(styles.timeline, className)}>
      {items.map((item) => (
        <li key={item.tahun} className={styles.item}>
          <span className={styles.year}>{item.tahun}</span>
          <p className={styles.text}>{item.deskripsi}</p>
        </li>
      ))}
    </Reveal>
  );
}
