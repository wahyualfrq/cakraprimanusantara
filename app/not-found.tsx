import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { kontakLink, navLinks } from "@/components/layout/navLinks";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
};

// 404 (DESIGN.md v0.4 §13.9): header gaya halaman dalam + satu tombol primary; menu
// Ostindo sebagai daftar tautan, bukan deretan tombol.
export default function NotFound() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Halaman tidak ditemukan</h1>
        <p className={styles.description}>
          Halaman yang Anda cari mungkin sudah dipindah atau belum tersedia. Coba mulai dari salah
          satu halaman di bawah ini, atau hubungi kami langsung.
        </p>
        <nav aria-label="Halaman utama">
          <ul className={styles.links}>
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={kontakLink.href} arrow>
          {kontakLink.label}
        </Button>
      </Container>
    </section>
  );
}
