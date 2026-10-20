"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import styles from "./StatsSection.module.css";

type StatItem = {
  id: "armada" | "proyek" | "produk" | "mitra";
  target: number;
  suffix?: string;
  label: string;
};

const statsData: StatItem[] = [
  { id: "armada", target: 100, suffix: "+", label: "Unit Armada Alat Berat" },
  { id: "proyek", target: 23, label: "Proyek Terdokumentasi" },
  { id: "produk", target: 6, label: "Produk Agribisnis" },
  { id: "mitra", target: 10, label: "Brand Mitra Distribusi" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  // Default to final numbers for SSR / non-JS fallback
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    armada: 100,
    proyek: 23,
    produk: 6,
    mitra: 10,
  });

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          // If user prefers reduced motion, keep final numbers without animation
          if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            return;
          }

          const duration = 1000; // ms
          const startTime = performance.now();

          // Reset to 0 just before starting the count-up
          setCounts({ armada: 0, proyek: 0, produk: 0, mitra: 0 });

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - (1 - progress)^3
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              armada: Math.floor(easeOut * 100),
              proyek: Math.floor(easeOut * 23),
              produk: Math.floor(easeOut * 6),
              mitra: Math.floor(easeOut * 10),
            });

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCounts({
                armada: 100,
                proyek: 23,
                produk: 6,
                mitra: 10,
              });
            }
          };

          animationFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      {/* Technical geometric pattern background */}
      {/* <div className={styles.patternBg} aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cpn-tech-grid"
              width="44"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 44 0 L 0 0 0 44"
                fill="none"
                stroke="rgba(1, 102, 37, 0.06)"
                strokeWidth="0.75"
              />
              <path
                d="M 0 22 L 44 22 M 22 0 L 22 44"
                fill="none"
                stroke="rgba(1, 102, 37, 0.03)"
                strokeDasharray="2,2"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1.2" fill="rgba(1, 102, 37, 0.12)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cpn-tech-grid)" />
        </svg>
      </div> */}

      <Container className={styles.container}>
        <div className={styles.statsRow}>
          {statsData.map((stat) => (
            <div key={stat.id} className={styles.statItem}>
              <div className={styles.accentLine} aria-hidden="true" />
              <div className={styles.statNumber}>
                <span>{counts[stat.id]}</span>
                {stat.suffix && (
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                )}
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
