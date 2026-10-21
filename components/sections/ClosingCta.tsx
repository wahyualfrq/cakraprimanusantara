import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PillButton } from "@/components/ui/PillButton";
import { heroInterim, penutupInterim } from "@/content/profil";
import styles from "./ClosingCta.module.css";

// CTA penutup: band hijau solid tanpa gradient sebelum footer (DESIGN.md §8.10),
// pill putih + tautan teks — pola sama dengan hero.
export function ClosingCta() {
  return (
    <Section>
      <Container>
        {/* INTERIM — copy belum disetujui (D2), dibaca dari content/profil.ts. */}
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>{penutupInterim.judul}</h2>
          <p className={styles.ctaText}>{penutupInterim.teks}</p>
          <div className={styles.ctaActions}>
            <PillButton href={heroInterim.ctaSekunder.href} variant="light">
              {heroInterim.ctaSekunder.label}
            </PillButton>
            <Link href={heroInterim.ctaUtama.href} className={styles.ctaSecondary}>
              {heroInterim.ctaUtama.label}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
