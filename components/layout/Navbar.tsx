"use client";

import { useLayoutEffect, useRef } from "react";
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

/**
 * Navbar bar rata, sticky (DESIGN.md §9 [T2]): logo | navigasi | CTA, tanpa kapsul.
 * Di posisi paling atas latar transparan (menyatu dengan hero); setelah scroll > 24 px
 * menjadi putih semi-transparan + blur. Item aktif = teks + indikator 2 px.
 *
 * `data-nav-state` dirender "top" di server DAN render awal client (deterministik — tidak
 * ada script yang mengubah DOM sebelum hidrasi, sumber hydration mismatch sebelumnya).
 * Posisi scroll asli disinkronkan di layout effect: jalan sesudah hidrasi tapi sebelum
 * browser melukis frame berikutnya. Setelah itu atribut ditulis langsung ke DOM (tanpa
 * state React, hanya saat nilainya berubah); prop JSX tetap "top" sehingga React tidak
 * pernah menimpanya saat re-render.
 */
export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
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
      <header ref={headerRef} className={styles.navbar} data-nav-state="top">
        <Container className={styles.inner}>
          <div className={styles.brand}>
            {/* INTERIM — logo (D3a). Logo kiri memuat tulisan PT Cakra Prima Nusantara, jadi
                dekoratif (alt kosong). Rilis publik diblokir sampai aset/status logo
                dikonfirmasi. */}
            <span className={styles.logoStack}>
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
            </span>
            {/* Logo kanan (tautan Beranda; nama aksesibel dari aria-label). Aset 155×155 (1:1),
                dirender 30×30 (0,75 × tinggi logo) — width/height = rasio asli supaya tidak
                ada dimensi yang diubah CSS sepihak. */}
            <Link href="/" className={styles.logoLink} aria-label="Beranda">
              <Image
                src="/images/logo-color-bg-2.png"
                alt="Logo Cakra Indo Pratama"
                width={30}
                height={30}
                loading="eager"
                fetchPriority="low"
                className={styles.partnerLogo}
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
    </>
  );
}
