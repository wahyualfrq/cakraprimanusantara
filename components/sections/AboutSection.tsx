import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./AboutSection.module.css";

type Stat = {
  value: string;
  label: string;
};

// TODO: pindahkan ke content/ begitu migrasi konten berjalan.
const stats: Stat[] = [
  { value: "100+", label: "Unit Armada Alat Berat" },
  { value: "20+", label: "Proyek Terselesaikan" },
  { value: "6", label: "Produk Agribisnis Bersertifikasi" },
  { value: "10+", label: "Brand Mitra Distribusi" },
];

export function AboutSection() {
  return (
    <Section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.media}>
          <Image
            src="/placeholder/tentang-kami.jpg"
            alt="Tim dan operasional PT Cakra Prima Nusantara"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>Tentang PT Cakra Prima Nusantara</h2>
          <p className={styles.paragraph}>
            PT Cakra Prima Nusantara menaungi empat unit usaha: kontraktor, alat berat,
            distribusi material industrial, dan agribisnis. Unit konstruksi dan alat berat kami
            beroperasi di Sumatera Selatan, sementara produk agribisnis Ostindo telah dipakai
            perkebunan besar di seluruh Indonesia sejak 1995.
          </p>
          <Link href="/tentang-kami" className={styles.link}>
            Selengkapnya tentang kami →
          </Link>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
