import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { heroInterim } from "@/content/profil";
import { pelangganList } from "@/content/agribisnis/pelanggan";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./HeroSection.module.css";

// Nama dari strip lama yang tercantum di Daftar Konsumen/Pelanggan Ostindo
// (content/agribisnis/pelanggan.ts), dengan ejaan sumber. Pilihan nama final
// mengikuti copy beranda (D2).
// VERIFY: izin klien untuk menampilkan nama pelanggan pada strip "Dipercaya oleh".
const NAMA_STRIP = ["Astra Agro Lestari Group", "PT Perkebunan Nusantara", "Perhutani"];
const trustLogos = pelangganList.filter((p) => NAMA_STRIP.includes(p.nama)).map((p) => p.nama);

/**
 * Hero full-bleed, layout centered — headline + sub-headline + 1 CTA +
 * trust logos. Satu-satunya <h1> di homepage.
 */
export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.frame}>
        <div className={styles.media}>
          {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
          <Image
            src={ilustrasi.kebunSawit.src}
            alt={ilustrasi.kebunSawit.alt}
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.scrim} aria-hidden="true" />
        </div>

        <Container className={styles.content}>
          <div className={styles.copy}>
            {/* INTERIM — copy belum disetujui (D2), dibaca dari content/profil.ts. */}
            <h1 className={styles.headline}>
              <span className={styles.headlineLine}>{heroInterim.judulAwal}</span>
              <span className={styles.headlineLine}>
                <em className={styles.accentWord}>{heroInterim.kataAksen}</em>{" "}
                {heroInterim.judulAkhir}
              </span>
            </h1>

            <p className={styles.subheadline}>{heroInterim.subjudul}</p>

            {/* Pill putih solid (bukan glass) + tautan teks — label dari heroInterim (INTERIM, D2). */}
            <div className={styles.actions}>
              <PillButton href={heroInterim.ctaUtama.href} variant="light">
                {heroInterim.ctaUtama.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </PillButton>
              <Link href={heroInterim.ctaSekunder.href} className={styles.ctaSecondary}>
                {heroInterim.ctaSekunder.label}
              </Link>
            </div>
          </div>
        </Container>

        <div className={styles.trustBar}>
          <Container>
            <div className={styles.trust}>
              <span className={styles.trustLabel}>Dipercaya oleh:</span>
              <ul className={styles.logoStrip}>
                {trustLogos.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
