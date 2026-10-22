"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "@/components/ui/IconButton";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";
import { ariaCurrentFor, kontakLink, navLinks } from "./navLinks";
import styles from "./MobileNav.module.css";

const PANEL_ID = "navigasi-mobile";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Pola disclosure: Escape menutup panel dan fokus kembali ke tombol menu.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      wrapperRef.current?.querySelector("button")?.focus();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <IconButton
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        aria-controls={PANEL_ID}
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
        <nav id={PANEL_ID} className={styles.panel} aria-label="Navigasi mobile">
          {navLinks.map((link) => {
            const current = ariaCurrentFor(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current}
                className={cn(styles.link, current && styles.linkActive)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

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
