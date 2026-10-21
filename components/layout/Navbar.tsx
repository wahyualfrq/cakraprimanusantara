"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { ariaCurrentFor, kontakLink, navLinks } from "./navLinks";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

/**
 * Navbar bar putih membulat mengambang (keputusan D10, DESIGN.md §10.2):
 * logo di kiri, menu ringkas dengan item aktif berbentuk pill, CTA pill.
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
            width={76}
            height={76}
            priority
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
          <PillButton
            href={kontakLink.href}
            variant="solid"
            aria-current={ariaCurrentFor(pathname, kontakLink.href)}
            className={styles.ctaDesktop}
          >
            {kontakLink.label}
          </PillButton>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
