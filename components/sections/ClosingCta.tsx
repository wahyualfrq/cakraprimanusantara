import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { heroInterim, penutupInterim } from "@/content/profil";
import styles from "./ClosingCta.module.css";

// Band CTA (DESIGN.md §11.2): green-800, radius xl, terpusat, maks. satu per halaman,
// terakhir sebelum footer; tombol light + text-link.
export function ClosingCta() {
  return (
    <Section aria-labelledby="penutup-judul">
      <Container>
        {/* INTERIM — copy belum disetujui (D2), dibaca dari content/profil.ts. */}
        <Reveal className={styles.band}>
          <h2 id="penutup-judul" className={styles.title}>
            {penutupInterim.judul}
          </h2>
          <p className={styles.text}>{penutupInterim.teks}</p>
          <div className={styles.actions}>
            <Button href={heroInterim.ctaSekunder.href} variant="light" arrow>
              {heroInterim.ctaSekunder.label}
            </Button>
            <Button href={heroInterim.ctaUtama.href} variant="text-link" onDark>
              {heroInterim.ctaUtama.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
