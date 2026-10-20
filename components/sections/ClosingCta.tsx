import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./ClosingCta.module.css";

export function ClosingCta() {
  return (
    <Section className={styles.ctaSection}>
      <Container>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>
            Siap Bermitra untuk Solusi Proyek & Industri Anda
          </h2>
          <p className={styles.ctaText}>
            Tim kami siap membantu kebutuhan konstruksi, alat berat, distribusi material, atau agribisnis Anda.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/portofolio" className={styles.ctaPrimary}>
              Lihat Portofolio Proyek
            </Link>
            <Link href="/kontak" className={styles.ctaSecondary}>
              Hubungi Kami
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
