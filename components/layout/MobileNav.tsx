"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ariaCurrentFor, kontakLink, navLinks } from "./navLinks";
import styles from "./MobileNav.module.css";

const PANEL_ID = "navigasi-mobile";
// = --cpn-duration-fast: panel tetap ter-render selama animasi tutup.
const CLOSE_MS = 150;

type State = "closed" | "open" | "closing";

/**
 * Menu mobile (< 900 px, DESIGN.md §9.4): panel tepat di bawah bar. Escape dan klik di
 * luar panel menutup; Escape mengembalikan fokus ke tombol menu.
 */
export function MobileNav() {
  const [state, setState] = useState<State>("closed");
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const open = state === "open";

  const close = useCallback((restoreFocus = false) => {
    setState((current) => (current === "open" ? "closing" : current));
    if (restoreFocus) wrapperRef.current?.querySelector("button")?.focus();
  }, []);

  useEffect(() => {
    if (state !== "closing") return;
    const timer = window.setTimeout(() => setState("closed"), CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close(true);
    }
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, close]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <IconButton
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => (open ? close() : setState("open"))}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </IconButton>

      {state !== "closed" && (
        <nav
          id={PANEL_ID}
          className={cn(styles.panel, state === "closing" && styles.closing)}
          aria-label="Navigasi mobile"
        >
          <ul className={styles.list}>
            {navLinks.map((link) => {
              const current = ariaCurrentFor(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current}
                    className={cn(styles.link, current && styles.linkActive)}
                    onClick={() => close()}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Button href={kontakLink.href} block className={styles.cta} onClick={() => close()}>
            {kontakLink.label}
          </Button>
        </nav>
      )}
    </div>
  );
}
