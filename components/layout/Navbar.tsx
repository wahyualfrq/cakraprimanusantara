"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { ariaCurrentFor, kontakLink, navLinks } from "./navLinks";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

/**
 * Navbar bar putih rata, sticky (DESIGN.md §9 [T2]): logo | navigasi | CTA, tanpa
 * kapsul, tanpa shadow. Item aktif = teks green-800 600 + indikator 2 px di tepi bawah.
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* INTERIM — logo (D3a). Gambar logo yang ada memuat tulisan PT Cakra Prima
            Nusantara, jadi dipakai sebagai dekoratif (alt kosong) dan nama aksesibel
            diberikan lewat tautan. Rilis publik diblokir sampai aset/status logo
            dikonfirmasi. */}
        <Link href="/" className={styles.logoLink} aria-label="Beranda">
          <Image
            src="/images/LogosG.png"
            alt=""
            // = ukuran render terbesar (--cpn-navbar-logo-height 2.5rem = 40px) → srcset 64w/128w.
            // Eager + fetchPriority low: logo di atas lipatan tapi bukan elemen LCP; preload
            // hanya untuk gambar LCP (Tahap O).
            width={40}
            height={40}
            loading="eager"
            fetchPriority="low"
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.links} aria-label="Navigasi utama">
          {navLinks.map((link) => {
            const current = ariaCurrentFor(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current}
                className={cn(styles.link, current && styles.linkActive)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.right}>
          <Button
            href={kontakLink.href}
            size="sm"
            aria-current={ariaCurrentFor(pathname, kontakLink.href)}
            className={styles.ctaDesktop}
          >
            {kontakLink.label}
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
