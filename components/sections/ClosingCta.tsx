import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { heroInterim, penutupInterim } from "@/content/profil";
import styles from "./ClosingCta.module.css";

export function ClosingCta() {
  return (
    <Section className={styles.ctaSection}>
      <Container>
        {/* INTERIM — copy belum disetujui (D2), dibaca dari content/profil.ts. */}
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>{penutupInterim.judul}</h2>
          <p className={styles.ctaText}>{penutupInterim.teks}</p>
          <div className={styles.ctaActions}>
            <Link href={heroInterim.ctaUtama.href} className={styles.ctaPrimary}>
              {heroInterim.ctaUtama.label}
            </Link>
            <Link href={heroInterim.ctaSekunder.href} className={styles.ctaSecondary}>
              {heroInterim.ctaSekunder.label}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
