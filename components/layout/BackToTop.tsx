"use client";

import styles from "./BackToTop.module.css";

/** Tombol kembali ke atas halaman (footer). Smooth scroll, kecuali pengguna memilih reduced motion. */
export function BackToTop() {
  const handleClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick} aria-label="Kembali ke atas">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
