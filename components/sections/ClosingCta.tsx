import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PillButton } from "@/components/ui/PillButton";
import styles from "./ClosingCta.module.css";

export function ClosingCta() {
  return (
    <Section className={styles.section}>
      <Container className={styles.inner}>
        <h2 className={styles.heading}>Konsultasikan Proyek Anda</h2>
        <p className={styles.sub}>
          Tim kami siap membantu kebutuhan konstruksi, alat berat, distribusi material, atau
          agribisnis Anda.
        </p>
        <PillButton href="/kontak" variant="solid" className={styles.cta}>
          Hubungi Kami
        </PillButton>
      </Container>
    </Section>
  );
}
