import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { heroInterim, profil } from "@/content/profil";
import { kategoriLabel } from "@/content/agribisnis/produk";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./HeroSection.module.css";

// Tag hero = nama kategori produk bersumber (DESIGN.md §10.1), bukan klaim.
const TAG_KATEGORI = [kategoriLabel["penyubur-tanah"], kategoriLabel["bio-pestisida"], kategoriLabel["pupuk-cair"]];

// Kartu info: maks. dua fakta bersumber. Berdiri = §E1 ("Juli 1995, dengan Akta …");
// lokasi produksi = §G6 ("fasilitas produksi kami yang terletak di daerah Balaraja, Banten").
const FAKTA_HERO = [
  { label: "Berdiri", nilai: profil.berdiri.teks.split(",")[0] },
  { label: "Fasilitas produksi", nilai: "Balaraja, Banten" },
];

/**
 * Hero berbingkai (DESIGN.md §10.1 [T4]): gambar berradius xl di dalam container, di
 * bawah navbar; teks rata kiri menempel kiri-bawah; satu kartu info glass ≥ 900 px.
 * Satu-satunya <h1> dan satu-satunya gambar yang di-preload di beranda.
 */
export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-judul">
      <Container>
        <div className={styles.frame}>
          {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
          <Image
            src={ilustrasi.kebunSawit.src}
            alt={ilustrasi.kebunSawit.alt}
            fill
            // LCP beranda: gambar ini di desktop, H1 di mobile — preload saja; fetchPriority="high"
            // memperlambat LCP teks di mobile (diukur Tahap O: 1620 vs 1764 ms).
            preload
            sizes="(min-width: 1200px) 1136px, calc(100vw - 2rem)"
            className={styles.image}
          />
          <div className={styles.scrim} aria-hidden="true" />

          <div className={styles.content}>
            <ul className={styles.tags} aria-label="Kategori produk">
              {TAG_KATEGORI.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>

            {/* INTERIM — copy belum disetujui (D2), dibaca dari content/profil.ts. */}
            <h1 id="hero-judul" className={styles.headline}>
              {heroInterim.judulAwal} <em>{heroInterim.kataAksen}</em> {heroInterim.judulAkhir}
            </h1>

            <p className={styles.subheadline}>{heroInterim.subjudul}</p>

            <div className={styles.actions}>
              <Button href={heroInterim.ctaUtama.href} variant="accent" arrow>
                {heroInterim.ctaUtama.label}
              </Button>
              <Button href={heroInterim.ctaSekunder.href} variant="text-link" onDark>
                {heroInterim.ctaSekunder.label}
              </Button>
            </div>
          </div>

          <GlassCard className={styles.info}>
            <dl className={styles.facts}>
              {FAKTA_HERO.map((fakta) => (
                <div key={fakta.label} className={styles.fact}>
                  <dt>{fakta.label}</dt>
                  <dd>{fakta.nilai}</dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
