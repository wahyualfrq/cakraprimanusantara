import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Reveal } from "@/components/ui/Reveal";
import { profil } from "@/content/profil";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./AboutSection.module.css";

// Tentang di Beranda — cermin section profil di /tentang-kami (split-media 5:7,
// gambar sticky, judul nama perusahaan, lead narasi pertama §E1, fakta
// Berdiri/Kantor/Pabrik). Versi ringkas: paragraf narasi lanjutan diganti CTA.
export function AboutSection() {
  const fakta = [
    { label: "Berdiri", description: profil.berdiri.teks },
    { label: "Kantor", description: profil.kedudukan.kantor },
    { label: "Pabrik", description: profil.kedudukan.pabrik },
  ];

  return (
    <Section aria-labelledby="tentang-judul">
      <Container className={styles.grid}>
        {/* Split entrance: gambar fade-in, teks fade-up bertahap sedikit sesudahnya. */}
        <Reveal variant="fade" className={styles.media}>
          {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
          <Image
            src={ilustrasi.rumahKaca.src}
            alt={ilustrasi.rumahKaca.alt}
            fill
            sizes="(min-width: 1200px) 450px, (min-width: 900px) 38vw, calc(100vw - 2rem)"
            className={styles.cover}
          />
        </Reveal>

        <Reveal stagger delay={120} className={styles.copy}>
          <Eyebrow>Tentang Kami</Eyebrow>
          <h2 id="tentang-judul" className={styles.title}>
            {profil.nama}
          </h2>
          <p className={styles.lead}>{profil.narasi[0]}</p>
          <DefinitionList items={fakta} layout="grid" />
          <div className={styles.actions}>
            <Button href="/tentang-kami">
              Profil perusahaan
            </Button>
            <Button href="/produk" variant="text-link">
              Lihat produk
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
