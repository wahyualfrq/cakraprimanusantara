import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { proyekList } from "@/content/kontraktor/proyek";
import styles from "./PortfolioHighlight.module.css";

type PortfolioCard = {
  judul: string;
  featured?: boolean;
};

function judulProyek(slug: string): string {
  const proyek = proyekList.find((item) => item.slug === slug);
  if (!proyek) throw new Error(`Proyek tidak ditemukan di proyekList: ${slug}`);
  return proyek.judul;
}

// Sumber: content/kontraktor/proyek.ts (migrasi konten Fase 6+7+8). Card 1
// & 3 dipertahankan dengan teks yang sudah tampil di section ini sebelum
// migrasi — proyekList menulis "PT." dengan titik, section ini sebelumnya
// tanpa titik — supaya render & teks tidak berubah (brief Fase 6+7+8 poin
// 5). Card 5 (pencapaian Ostindo) bukan proyek kontraktor, tidak ada di
// proyekList — tetap literal, sama seperti sebelumnya.
// Foto asli menyusul via Vercel Blob (STRUCTURE.md §7.3) — placeholder pattern
// sengaja beda dari Unit Selector (diagonal stripe abu-abu, bukan dot hijau)
// supaya kedua section tidak terkesan komponen yang sama (DESIGN.md §8.9).
const cards: PortfolioCard[] = [
  { judul: "Pekerjaan Proyek PT Bukit Asam", featured: true },
  { judul: judulProyek("perbaikan-jetty-tarahan-lampung") },
  { judul: "HVC Kebun Tanjung Sari PT Sampoerna" },
  { judul: judulProyek("tanah-oprit-overpass-sta-jalan-tol") },
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
