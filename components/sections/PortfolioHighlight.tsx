import Image from "next/image";
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
  image?: string;
  imageAlt?: string;
};

function judulProyek(slug: string): string {
  const proyek = proyekList.find((item) => item.slug === slug);
  if (!proyek) throw new Error(`Proyek tidak ditemukan di proyekList: ${slug}`);
  return proyek.judul;
}

const cards: PortfolioCard[] = [
  {
    judul: "Pekerjaan Proyek PT Bukit Asam",
    featured: true,
    image: "/images/gambar-8.png",
    imageAlt: "Pekerjaan Proyek PT Bukit Asam oleh PT Cakra Indo Pratama",
  },
  {
    judul: judulProyek("perbaikan-jetty-tarahan-lampung"),
    image: "/images/gambar-7.png",
    imageAlt: "Pekerjaan Perbaikan Jetty Tarahan Lampung oleh PT Cakra Indo Pratama",
  },
  {
    judul: "HVC Kebun Tanjung Sari PT Sampoerna",
    image: "/images/gambar-6.png",
    imageAlt: "Pekerjaan HVC Kebun Tanjung Sari PT Sampoerna di Sumatera Selatan",
  },
  {
    judul: judulProyek("tanah-oprit-overpass-sta-jalan-tol"),
    image: "/images/gambar-8.png",
    imageAlt: "Pekerjaan Tanah Oprit Overpass STA Proyek Jalan Tol",
  },
  {
    judul: "OSTINDO Kembali Mendapatkan Penghargaan Best Fertilizer 2016",
    image: "/images/gambar-10.png",
    imageAlt: "Penghargaan Best Fertilizer 2016 untuk produk pupuk dan agribisnis OSTINDO",
  },
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
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.imageAlt ?? card.judul}
                  fill
                  sizes={
                    card.featured
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  }
                  className={styles.cardImage}
                />
              ) : (
                <div className={styles.cardPattern} aria-hidden="true" />
              )}
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
