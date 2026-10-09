import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PillButton } from "@/components/ui/PillButton";
import { SITE_NAME } from "@/lib/seo/metadata";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: `Halaman Tidak Ditemukan | ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

const tautanUnit = [
  { label: "Kontraktor", href: "/kontraktor" },
  { label: "Alat Berat", href: "/alat-berat" },
  { label: "Agribisnis", href: "/agribisnis" },
];

export default function NotFound() {
  return (
    <Section className={styles.section}>
      <Container>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Halaman tidak ditemukan</h1>
        <p className={styles.description}>
          Halaman yang kamu cari mungkin sudah dipindah atau belum tersedia. Coba mulai dari salah
          satu unit usaha kami, atau hubungi kami langsung.
        </p>
        <nav aria-label="Tautan unit usaha" className={styles.unitLinks}>
          {tautanUnit.map((item) => (
            <PillButton key={item.href} href={item.href} variant="solid">
              {item.label}
            </PillButton>
          ))}
        </nav>
        <Link href="/kontak" className={styles.kontakLink}>
          Hubungi Kami →
        </Link>
      </Container>
    </Section>
  );
}
