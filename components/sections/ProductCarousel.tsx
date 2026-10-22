"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ProductCarousel.module.css";

export type ProductCard = {
  href: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  gambar?: string;
};

type ProductCarouselProps = {
  items: ProductCard[];
  title: string;
  accent?: string;
  description?: string;
};

const TRACK_ID = "produk-karusel";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Karusel produk S2 (DESIGN.md §11.2 [T7]): track scroll-snap horizontal, kartu
 * berikutnya mengintip (bleed kanan), panah 44 px di section-head yang nonaktif di
 * ujung. Tanpa autoplay dan tanpa library; tanpa JS track tetap bisa digulir.
 */
export function ProductCarousel({ items, title, accent, description }: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <>
      <div className={styles.headWrap}>
        <SectionHeading
          eyebrow="Produk"
          title={title}
          accent={accent}
          description={description}
          layout="split"
          id="produk-judul"
          actions={
            <>
              <Button href="/produk" variant="text-link" >
                Semua produk
              </Button>
              <span className={styles.controls}>
                <IconButton
                  aria-label="Produk sebelumnya"
                  aria-controls={TRACK_ID}
                  disabled={atStart}
                  onClick={() => scroll(-1)}
                >
                  <Arrow direction="left" />
                </IconButton>
                <IconButton
                  aria-label="Produk berikutnya"
                  aria-controls={TRACK_ID}
                  disabled={atEnd}
                  onClick={() => scroll(1)}
                >
                  <Arrow direction="right" />
                </IconButton>
              </span>
            </>
          }
        />
      </div>

      <div role="group" aria-labelledby="produk-judul" className={styles.viewport}>
        {/* Kartu muncul berurutan (fade, tanpa geser vertikal — track adalah scroll container). */}
        <Reveal as="ul" variant="fade" stagger id={TRACK_ID} ref={trackRef} className={styles.track}>
          {items.map((item, index) => (
            <li key={item.href} className={styles.slide}>
              <Link href={item.href} className={styles.card}>
                <span className={styles.top}>
                  <span className={styles.label}>{item.kategori}</span>
                  <span className={styles.numeral} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <div className={styles.mediaSlot}>
                  {item.gambar ? (
                    <Image
                      src={item.gambar}
                      alt={`Kemasan ${item.nama}`}
                      fill
                      sizes="(max-width: 640px) 72vw, 320px"
                      className={styles.productImage}
                    />
                  ) : (
                    <span className={styles.fallbackText}>{item.nama}</span>
                  )}
                </div>

                <div className={styles.bottom}>
                  <h3 className={styles.name}>{item.nama}</h3>
                  <p className={styles.desc}>{item.deskripsi}</p>
                  <span className={styles.more}>
                    Detail produk
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </>
  );
}
