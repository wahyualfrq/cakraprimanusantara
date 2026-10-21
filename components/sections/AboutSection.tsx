import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContentImage } from "@/components/ui/ContentImage";
import { profil } from "@/content/profil";
import styles from "./AboutSection.module.css";

// Statistik lama (armada, proyek, brand mitra) tidak bersumber untuk Ostindo —
// dilepas dari render di K4. Fakta bersumber (berdiri, kedudukan) masuk saat
// rekomposisi beranda (V4).
export function AboutSection() {
  return (
    <Section className={styles.section}>
      <Container className={styles.grid}>
        {/* Belum ada ilustrasi agri yang tersisa tanpa menduplikasi gambar lain di
            beranda (D4) — placeholder berpola sampai foto asli tersedia (DESIGN.md §8.9).
            Dekoratif: alt kosong, dan wadah disembunyikan dari pembaca layar karena
            ContentImage tanpa src merender role="img". */}
        <div className={styles.media} aria-hidden="true">
          <ContentImage
            alt=""
            variant="unit"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>Tentang {profil.nama}</h2>
          {/* Paragraf pertama narasi perusahaan, verbatim (CONTENT-VERBATIM.md §E1). */}
          <p className={styles.paragraph}>{profil.narasi[0]}</p>
          <Link href="/tentang-kami" className={styles.link}>
            Selengkapnya tentang kami →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
