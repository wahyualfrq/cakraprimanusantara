"use client";

import { useState } from "react";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { PillButton } from "@/components/ui/PillButton";
import { kontakLink, navLinks } from "./navLinks";
import styles from "./MobileNav.module.css";

export function MobileNav() {
  const [open, setOpen] = useState(false);

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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <PillButton
            href={kontakLink.href}
            variant="solid"
            className={styles.cta}
            onClick={() => setOpen(false)}
          >
            {kontakLink.label}
          </PillButton>
        </nav>
      )}
    </div>
  );
}
