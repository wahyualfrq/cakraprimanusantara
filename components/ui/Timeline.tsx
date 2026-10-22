import Image from "next/image";
import { Reveal } from "./Reveal";
import styles from "./Timeline.module.css";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  tahun: number;
  deskripsi: string;
  /** Gambar pendukung opsional — tampil utuh (contain) di bawah teks item. */
  gambar?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type TimelineProps = {
  items: TimelineItem[];
  /**
   * Tiap item muncul sendiri saat masuk layar (untuk timeline panjang). Default: satu
   * Reveal stagger untuk seluruh daftar (timeline pendek di Beranda/Tentang Kami).
   */
  revealEach?: boolean;
  className?: string;
};

function Konten({ item }: { item: TimelineItem }) {
  return (
    <>
      <span className={styles.year}>{item.tahun}</span>
      <p className={styles.text}>{item.deskripsi}</p>
      {item.gambar && (
        <span className={styles.media}>
          <Image
            src={item.gambar.src}
            alt={item.gambar.alt}
            width={item.gambar.width}
            height={item.gambar.height}
            sizes="(min-width: 900px) 416px, calc(100vw - 4rem)"
            className={styles.mediaImage}
          />
        </span>
      )}
    </>
  );
}

/**
 * Timeline (DESIGN.md §11.2): garis 2 px green-200, titik 14 px green-700, tahun Fraunces;
 * kolom tahun 7rem ≥ 900 px, tahun di atas teks di bawahnya. Satu komponen untuk Beranda,
 * Tentang Kami, dan Riset & Inovasi. Isi = data milestone bersumber, verbatim.
 */
export function Timeline({ items, revealEach = false, className }: TimelineProps) {
  if (revealEach) {
    return (
      // Wadah hanya membawa state untuk garis yang tergambar; item muncul satu per satu.
      <Reveal as="ol" variant="none" className={cn(styles.timeline, className)}>
        {items.map((item) => (
          <Reveal as="li" key={item.tahun} className={styles.item}>
            <Konten item={item} />
          </Reveal>
        ))}
      </Reveal>
    );
  }

  return (
    <Reveal as="ol" stagger className={cn(styles.timeline, className)}>
      {items.map((item) => (
        <li key={item.tahun} className={styles.item}>
          <Konten item={item} />
        </li>
      ))}
    </Reveal>
  );
}
