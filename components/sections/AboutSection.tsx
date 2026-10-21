import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profil } from "@/content/profil";
import styles from "./AboutSection.module.css";

// Tentang — editorial: judul di kiri, paragraf besar + fakta di kanan
// (DESIGN.md §10.2). Paragraf = narasi pertama §E1, verbatim; fakta Berdiri/
// Kantor/Pabrik = profil §E1. Satu-satunya section ber-tint di beranda (§8.10).
// Tanpa gambar: belum ada foto asli, dan ilustrasi D4 sudah dipakai section lain.
export function AboutSection() {
  const fakta = [
    { label: "Berdiri", nilai: profil.berdiri.teks },
    { label: "Kantor", nilai: profil.kedudukan.kantor },
    { label: "Pabrik", nilai: profil.kedudukan.pabrik },
  ];

  return (
    <Section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.intro}>
          <SectionHeading title={`Tentang ${profil.nama}`} />
          <Link href="/tentang-kami" className={styles.link}>
            Selengkapnya tentang kami →
          </Link>
        </div>

        <div className={styles.body}>
          <p className={styles.lead}>{profil.narasi[0]}</p>
          <dl className={styles.facts}>
            {fakta.map((item) => (
              <div key={item.label} className={styles.fact}>
                <dt className={styles.factLabel}>{item.label}</dt>
                <dd className={styles.factValue}>{item.nilai}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
