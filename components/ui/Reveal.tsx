"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Elemen yang dirender — mis. `ul`/`ol` supaya stagger berlaku pada `li`. */
  as?: ElementType;
  /** Tunda anak langsung 80 ms bertahap (maks. 4) — untuk grid/daftar. */
  stagger?: boolean;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Reveal sekali saat masuk viewport (DESIGN.md §16.3). Tanpa dependency: IntersectionObserver.
 * Elemen yang sudah terlihat saat mount, tanpa JS, atau saat `prefers-reduced-motion`
 * tidak pernah disembunyikan. Jangan dipakai di hero, elemen LCP, navbar, footer, atau karusel.
 */
export function Reveal({ children, as: Tag = "div", stagger = false, className, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Sudah di dalam (atau di atas) layar saat mount → biarkan terlihat, tanpa kedip.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.reveal = "shown";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn(styles.root, stagger && styles.stagger, className)} {...rest}>
      {children}
    </Tag>
  );
}
