import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import styles from "./PortfolioHighlight.module.css";

type PortfolioCard = {
  judul: string;
  featured?: boolean;
};

// TODO: pindahkan ke content/kontraktor/proyek.ts begitu migrasi konten berjalan.
// Foto asli menyusul via Vercel Blob (STRUCTURE.md §7.3) — placeholder pattern
// sengaja beda dari Unit Selector (diagonal stripe abu-abu, bukan dot hijau)
// supaya kedua section tidak terkesan komponen yang sama (DESIGN.md §8.9).
const cards: PortfolioCard[] = [
  { judul: "Pekerjaan Proyek PT Bukit Asam", featured: true },
  { judul: "Pekerjaan Perbaikan Jetty Tarahan Lampung" },
  { judul: "HVC Kebun Tanjung Sari PT Sampoerna" },
  { judul: "Pekerjaan Tanah Oprit Overpass STA Proyek Jalan Tol" },
  { judul: "OSTINDO Kembali Mendapatkan Penghargaan Best Fertilizer 2016" },
];

export function PortfolioHighlight() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <h2>Proyek & Pencapaian</h2>
          <Link href="/portofolio" className={styles.viewAll}>
            Lihat Semua Portofolio →
          </Link>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article
              key={card.judul}
              className={cn(styles.card, card.featured && styles.featured)}
            >
              <div className={styles.cardPattern} aria-hidden="true" />
              <div className={styles.cardScrim} aria-hidden="true" />
              <IconButton
                href="/portofolio"
                aria-label={`Lihat detail: ${card.judul}`}
                variant="glass"
                className={styles.cardArrow}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 17L17 7M17 7H8M17 7v9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
              <h3 className={styles.cardTitle}>{card.judul}</h3>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
