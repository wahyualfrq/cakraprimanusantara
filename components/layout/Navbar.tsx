"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
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
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/LogosG.png"
            alt="PT Cakra Prima Nusantara"
            width={76}
            height={76}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.links} aria-label="Navigasi utama">
          <Link href="/tentang-kami">Tentang Kami</Link>
          <MegaMenu />
          <Link href="/portofolio">Portofolio</Link>
          <Link href="/berita">Berita</Link>
          <Link href="/kontak">Kontak</Link>
        </nav>

        <div className={styles.right}>
          <PillButton href="/kontak" variant="solid" className={styles.ctaDesktop}>
            Hubungi Kami
          </PillButton>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
