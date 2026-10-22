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

// Tentang di Beranda — split-intro 3:9 (DESIGN.md §3.2, §13.1): gambar kecil 4:3 di
// kiri, paragraf besar di kanan. Paragraf = narasi pertama §E1, verbatim; fakta
// Berdiri/Kantor/Pabrik = profil §E1.
export function AboutSection() {
  const fakta = [
    { label: "Berdiri", description: profil.berdiri.teks },
    { label: "Kantor", description: profil.kedudukan.kantor },
    { label: "Pabrik", description: profil.kedudukan.pabrik },
  ];

  return (
    <Section aria-labelledby="tentang-judul">
      <Container className={styles.grid}>
        <Reveal className={styles.body}>
          <Eyebrow as="h2" id="tentang-judul">
            Tentang Kami
          </Eyebrow>
          <p className={styles.lead}>{profil.narasi[0]}</p>
          <DefinitionList items={fakta} layout="grid" className={styles.facts} />
          <div className={styles.actions}>
            <Button href="/tentang-kami" arrow>
              Profil perusahaan
            </Button>
            <Button href="/produk" variant="text-link">
              Lihat produk
            </Button>
          </div>
        </Reveal>

        <div className={styles.media}>
          {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
          <Image
            src={ilustrasi.rumahKaca.src}
            alt={ilustrasi.rumahKaca.alt}
            fill
            sizes="(min-width: 900px) 260px, calc(100vw - 2rem)"
            className={styles.image}
          />
        </div>
      </Container>
    </Section>
  );
}
