import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./WhyChooseUs.module.css";

// Sumber: "Jujur & Dipercaya" = nilai Ostindo (CONTENT-VERBATIM.md §G3);
// "Sertifikat SNI" = nama dokumen di sumber (CONTENT-SOURCE.md §7; nomor dan
// masa berlaku tidak ada di sumber); "Mitra Riset LIPI & BRIN" = kerja sama
// LIPI (§E3, §E4) dan BRIN (§F).
// Item "100+ Unit Armada" (tidak bersumber untuk Ostindo) dilepas di K4.
// VERIFY: "Jujur & Dipercaya" vs larangan adjective kosong DESIGN.md §8.7.
const values = [
  { label: "Jujur & Dipercaya", Icon: ShieldCheckIcon },
  { label: "Sertifikat SNI", Icon: CertificateIcon },
  { label: "Mitra Riset LIPI & BRIN", Icon: MicroscopeIcon },
];

// 1 icon style konsisten (outline, stroke-width 2, round cap/join) — tiap
// icon representasi literal dari isi label di sebelahnya (DESIGN.md §8.3).
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

function CertificateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 12.5L7.5 21l4.5-2.5 4.5 2.5-1.5-8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 8l1.5 1.5 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicroscopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21v-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M7.5 17.5a4.5 4.5 0 1 1 9 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 14V7a2 2 0 1 1 4 0v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WhyChooseUs() {
  return (
    <Section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>Kenapa Memilih Kami</h2>
        <ul className={styles.row}>
          {values.map((item) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.icon}>
                <item.Icon />
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
