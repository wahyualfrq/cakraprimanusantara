import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getBeritaBySlug } from "@/lib/content/berita";
import styles from "./NewsHighlight.module.css";

type NewsItem = {
  judul: string;
};

// Sumber: content/berita/*.mdx lewat lib/content/berita.ts (migrasi konten
// Fase 6+7+8). Item 1 & 3 dipertahankan dengan teks yang sudah tampil di
// section ini sebelum migrasi — beda dari meta.judul asli (item 1 versi
// ringkas, item 3 beda kapitalisasi "Kembali") — supaya render & teks di
// section ini tidak berubah (brief Fase 6+7+8 poin 5). Item 2 sudah sama
// persis dengan meta.judul.
// Foto asli menyusul via Vercel Blob (STRUCTURE.md §7.3) — placeholder
// pattern sengaja beda dari Unit Selector & Portfolio (blob organik,
// bukan dot-grid/diagonal stripe) — DESIGN.md §8.9.
const items: NewsItem[] = [
  { judul: "PT Anugerah Mustika Ostindo Berkolaborasi dengan BRIN" },
  { judul: getBeritaBySlug("kerjasama-dengan-lipi")!.meta.judul },
  { judul: "OSTINDO Kembali Mendapatkan Penghargaan Best Fertilizer 2016" },
];

export function NewsHighlight() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <h2>Berita & Update</h2>
          <Link href="/berita" className={styles.viewAll}>
            Lihat Semua Berita →
          </Link>
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.judul} className={styles.item}>
              <Link href="/berita" className={styles.itemLink}>
                <div className={styles.thumb} aria-hidden="true">
                  <div className={styles.thumbBlob} />
                </div>
                <span className={styles.itemTitle}>{item.judul}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
