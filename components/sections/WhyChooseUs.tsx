import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profil } from "@/content/profil";
import styles from "./WhyChooseUs.module.css";

// Nilai PT Anugerah Mustika Ostindo — tiga nilai + deskripsi verbatim dari
// CONTENT-VERBATIM.md §G3 (label judul sesuai catatan sumber).
// VERIFY: "Jujur & Dipercaya" vs larangan adjective kosong DESIGN.md §8.7 —
// label ini verbatim dari sumber, tidak diubah.

// 1 icon style konsisten (outline, stroke-width 2, round cap/join) — tiap ikon
// representasi literal dari nilainya (DESIGN.md §8.3).
function ShieldCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.5l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Peduli Lingkungan — daun. */
function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 19c3-4 6-7 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Saling Membangun — dua orang (pelanggan dan mitra). */
function PartnersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.5" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M2.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.5 14.2c.6-.4 1.3-.7 2-.7 2.5 0 5 2 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ikonNilai: Record<string, ComponentType> = {
  "Jujur & Dipercaya": ShieldCheckIcon,
  "Peduli Lingkungan": LeafIcon,
  "Saling Membangun": PartnersIcon,
};

export function WhyChooseUs() {
  return (
    <Section>
      <Container>
        <SectionHeading title={`Nilai ${profil.nama}`} />
        <ul className={styles.row}>
          {profil.nilai.map((nilai) => {
            const Icon = ikonNilai[nilai.label];
            return (
              <li key={nilai.label} className={styles.item}>
                {Icon && (
                  <span className={styles.icon}>
                    <Icon />
                  </span>
                )}
                <h3 className={styles.label}>{nilai.label}</h3>
                <p className={styles.description}>{nilai.deskripsi}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
