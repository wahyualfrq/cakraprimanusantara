import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PillButton } from "@/components/ui/PillButton";
import { kontakLink, navLinks } from "@/components/layout/navLinks";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className={styles.section}>
      <Container>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Halaman tidak ditemukan</h1>
        <p className={styles.description}>
          Halaman yang Anda cari mungkin sudah dipindah atau belum tersedia. Coba mulai dari salah
          satu halaman di bawah ini, atau hubungi kami langsung.
        </p>
        <nav aria-label="Halaman utama" className={styles.unitLinks}>
          {navLinks.map((item) => (
            <PillButton key={item.href} href={item.href} variant="solid">
              {item.label}
            </PillButton>
          ))}
        </nav>
        <Link href={kontakLink.href} className={styles.kontakLink}>
          {kontakLink.label} →
        </Link>
      </Container>
    </Section>
  );
}
