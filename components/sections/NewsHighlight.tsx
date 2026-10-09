import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./NewsHighlight.module.css";

type NewsItem = {
  judul: string;
};

// TODO: pindahkan ke content/berita/*.mdx begitu migrasi konten berjalan.
// Foto asli menyusul via Vercel Blob (STRUCTURE.md §7.3) — placeholder
// pattern sengaja beda dari Unit Selector & Portfolio (blob organik,
// bukan dot-grid/diagonal stripe) — DESIGN.md §8.9.
const items: NewsItem[] = [
  { judul: "PT Anugerah Mustika Ostindo Berkolaborasi dengan BRIN" },
  { judul: "Kerjasama dengan LIPI" },
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
