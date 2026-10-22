"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type ElementType, type ReactNode, type Ref } from "react";
import styles from "./Reveal.module.css";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Elemen yang dirender — mis. `ul`/`ol` supaya stagger berlaku pada `li`. */
  as?: ElementType;
  /**
   * `up` = fade + naik 20 px (default); `fade` = opacity saja (gambar, latar pendukung);
   * `none` = wadah tidak disembunyikan, hanya membawa state (mis. garis timeline yang
   * tergambar sementara item-itemnya punya Reveal sendiri).
   */
  variant?: "up" | "fade" | "none";
  /** Tunda anak langsung 80 ms bertahap (maks. 5 anak) — untuk grid/daftar. */
  stagger?: boolean;
  /** Jeda awal (ms) — mis. gambar sedikit setelah teks pada komposisi split. */
  delay?: number;
  /** Ref tambahan ke elemen (mis. track karusel yang juga butuh ref sendiri). */
  ref?: Ref<HTMLElement>;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Entrance satu kali saat elemen pertama kali masuk viewport (DESIGN.md §16.3). Satu komponen
 * untuk semua halaman; tanpa dependency (IntersectionObserver, di-disconnect saat unmount).
 *
 * Konten tidak pernah tersembunyi tanpa JS: state `hidden` hanya dipasang setelah hidrasi dan
 * hanya untuk elemen yang masih di bawah layar — elemen yang sudah terlihat saat mount tidak
 * disembunyikan (tanpa kedip). `prefers-reduced-motion` → tidak pernah disembunyikan.
 * Jangan dipakai di hero Beranda, elemen LCP, navbar, atau marquee pelanggan.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  stagger = false,
  delay = 0,
  ref: externalRef,
  className,
  ...rest
}: RevealProps) {
  const elRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      elRef.current = node;
      if (typeof externalRef === "function") externalRef(node);
      else if (externalRef) (externalRef as { current: HTMLElement | null }).current = node;
    },
    [externalRef],
  );

  useEffect(() => {
    const el = elRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Sudah di dalam (atau di atas) layar saat mount → biarkan terlihat, tanpa kedip.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = "hidden";
    let doneTimer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.reveal = "shown";
          observer.disconnect();
          // Setelah entrance (650 ms + stagger ≤ 320 ms, garis timeline 900 ms) lepas state
          // animasi → transisi hover milik komponen kembali berlaku tanpa jeda stagger.
          doneTimer = window.setTimeout(() => {
            el.dataset.reveal = "done";
          }, delay + 1100);
        }
      },
      // Batas atas root diperluas jauh ke atas: elemen yang terlewati saat scroll cepat (sudah
      // di atas layar tanpa sempat "masuk") tetap dihitung berpotongan → langsung tampil.
      { threshold: 0.12, rootMargin: "20000px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(doneTimer);
    };
  }, [delay]);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag
      ref={setRef}
      style={style}
      className={cn(
        styles.root,
        variant === "fade" && styles.fade,
        variant === "none" && styles.none,
        stagger && styles.stagger,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
