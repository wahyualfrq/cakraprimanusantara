"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { ariaCurrentFor, kontakLink, navLinks } from "./navLinks";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

/** Ambang scroll (px) sebelum navbar berubah dari transparan ke glass. */
const SCROLL_THRESHOLD = 24;

// Dijalankan sebelum paint pertama (inline): menyetel state awal supaya navbar tidak berkedip
// putih → transparan saat hidrasi. Tanpa JS atribut tidak pernah ada → navbar tetap glass.
const INIT_SCRIPT = `(function(){var h=document.currentScript&&document.currentScript.previousElementSibling;if(h)h.setAttribute("data-nav-state",window.scrollY>${SCROLL_THRESHOLD}?"scrolled":"top")})();`;

/**
 * Navbar bar rata, sticky (DESIGN.md §9 [T2]): logo | navigasi | CTA, tanpa kapsul.
 * Di posisi paling atas latar transparan (menyatu dengan hero); setelah scroll > 24 px
 * menjadi putih semi-transparan + blur. State ditulis langsung ke atribut `data-nav-state`
 * (tanpa state React, hanya saat nilainya berubah). Item aktif = teks + indikator 2 px.
 */
export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const next = window.scrollY > SCROLL_THRESHOLD ? "scrolled" : "top";
      if (header.dataset.navState !== next) header.dataset.navState = next;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <header ref={headerRef} className={styles.navbar}>
        <Container className={styles.inner}>
          <div className={styles.brand}>
            {/* Logo mitra: elips biru solid berlatar transparan → terbaca di navbar transparan
                maupun glass tanpa versi putih. 38×30 = ukuran render desktop (0,75 × tinggi logo; rasio asli 126×100). */}
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
                className={cn(styles.logoImage, styles.logoDefault)}
            />
            {/* INTERIM — logo (D3a). Gambar logo yang ada memuat tulisan PT Cakra Prima
                Nusantara, jadi dipakai sebagai dekoratif (alt kosong) dan nama aksesibel
                diberikan lewat tautan. Rilis publik diblokir sampai aset/status logo
                dikonfirmasi. Versi putih hanya tampil di atas hero foto saat navbar transparan. */}
            <Link href="/" className={styles.logoLink} aria-label="Beranda">
              <Image
                src="/images/logo-color-bg-2.png"
                alt="Logo Cakra Indo Pratama"
                width={38}
                height={30}
                loading="eager"
                fetchPriority="low"
                className={styles.partnerLogo}
              />
              <Image
                src="/images/LogosW.png"
                alt=""
                width={40}
                height={40}
                loading="eager"
                fetchPriority="low"
                className={cn(styles.logoImage, styles.logoOnPhoto)}
              />
            </Link>
          </div>

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
        </Container>
      </header>
      <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
    </>
  );
}
