"use client";

import { useState } from "react";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { PillButton } from "@/components/ui/PillButton";
import styles from "./MobileNav.module.css";

const unitGroups = [
  {
    title: "Kontraktor",
    href: "/kontraktor",
    links: [
      { label: "Civil Project", href: "/kontraktor/civil-project" },
      { label: "Building Project", href: "/kontraktor/building-project" },
      { label: "Concrete Repair", href: "/kontraktor/concrete-repair" },
      { label: "Mechanical & Electrical", href: "/kontraktor/mechanical-electrical" },
      { label: "Chipping Kelapa Sawit", href: "/kontraktor/chipping-kelapa-sawit" },
    ],
  },
  {
    title: "Alat Berat",
    href: "/alat-berat",
    links: [
      { label: "Sewa Alat", href: "/alat-berat/sewa" },
      { label: "Penjualan Alat", href: "/alat-berat/penjualan" },
    ],
  },
  {
    title: "Agribisnis",
    href: "/agribisnis",
    links: [
      { label: "Produk", href: "/agribisnis/produk" },
      { label: "Riset & Inovasi", href: "/agribisnis/riset-inovasi" },
      { label: "Sertifikasi", href: "/agribisnis/sertifikasi" },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <IconButton
        aria-label={open ? "Tutup menu" : "Buka menu"}
        variant="solid"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </IconButton>

      {open && (
        <nav className={styles.panel} aria-label="Navigasi mobile">
          <Link href="/tentang-kami" onClick={() => setOpen(false)}>
            Tentang Kami
          </Link>

          <div className={styles.accordion}>
            <button
              type="button"
              className={styles.accordionTrigger}
              aria-expanded={unitOpen}
              onClick={() => setUnitOpen((value) => !value)}
            >
              Unit Usaha
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={unitOpen ? styles.chevronOpen : undefined}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {unitOpen && (
              <div className={styles.accordionPanel}>
                {unitGroups.map((group) => (
                  <div key={group.title} className={styles.unitGroup}>
                    <Link href={group.href} className={styles.unitGroupTitle} onClick={() => setOpen(false)}>
                      {group.title}
                    </Link>
                    <ul>
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} onClick={() => setOpen(false)}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link href="/trading" className={styles.unitGroupTitle} onClick={() => setOpen(false)}>
                  Trading
                </Link>
              </div>
            )}
          </div>

          <Link href="/portofolio" onClick={() => setOpen(false)}>
            Portofolio
          </Link>
          <Link href="/berita" onClick={() => setOpen(false)}>
            Berita
          </Link>
          <Link href="/kontak" onClick={() => setOpen(false)}>
            Kontak
          </Link>

          <PillButton href="/kontak" variant="solid" className={styles.cta} onClick={() => setOpen(false)}>
            Hubungi Kami
          </PillButton>
        </nav>
      )}
    </div>
  );
}
