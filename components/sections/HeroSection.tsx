import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import styles from "./HeroSection.module.css";

// TODO: pindahkan ke content/klien.ts begitu migrasi konten berjalan.
const trustLogos = [
  "Astra Agro Lestari",
  "PTPN",
  "Perhutani",
  "PT Sampoerna Agro",
  "PT Bukit Asam",
];

/**
 * Hero full-bleed, layout centered — headline + sub-headline + 1 CTA +
 * trust logos. Satu-satunya <h1> di homepage.
 */
export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.frame}>
        <div className={styles.media}>
          <Image
            src="/images/hero-section.png"
            alt="Proyek konstruksi dan alat berat PT Cakra Prima Nusantara"
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.scrim} aria-hidden="true" />
        </div>

        <Container className={styles.content}>
          <div className={styles.copy}>
            <h1 className={styles.headline}>
              <span className={styles.headlineLine}>Membangun Infrastruktur.</span>
              <span className={styles.headlineLine}>
                <em className={styles.accentWord}>Menumbuhkan</em> Agribisnis.
              </span>
            </h1>

            <p className={styles.subheadline}>
              Beroperasi dari Sumatera Selatan dan Jakarta, dengan produk agribisnis yang telah
              menjangkau seluruh Indonesia sejak 1995.
            </p>

            <PillButton href="#unit-usaha" variant="glass" className={styles.cta}>
              Lihat Unit Usaha
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
