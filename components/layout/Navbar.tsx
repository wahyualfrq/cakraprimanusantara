"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./MobileNav";
import { kontakLink, navLinks } from "./navLinks";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

/**
 * Navbar full-width — background tipis transparan, baru menebal + blur
 * begitu halaman discroll (bukan floating pill/liquid glass).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        {/* INTERIM — logo (D3a). Gambar logo yang ada memuat tulisan PT Cakra Prima
            Nusantara, jadi dipakai sebagai dekoratif (alt kosong) dan nama aksesibel
            diberikan lewat tautan. Rilis publik diblokir sampai aset/status logo
            dikonfirmasi. */}
        <Link href="/" className={styles.logoLink} aria-label="Beranda">
          <Image
            src="/images/LogosG.png"
            alt=""
            width={76}
            height={76}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.links} aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <PillButton href={kontakLink.href} variant="solid" className={styles.ctaDesktop}>
            {kontakLink.label}
          </PillButton>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
