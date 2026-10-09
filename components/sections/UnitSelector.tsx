import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./UnitSelector.module.css";

type UnitTile = {
  label: string;
  deskripsi: string;
  href: string;
};

// TODO: pindahkan ke content/ begitu migrasi konten unit usaha berjalan.
// Foto asli menyusul via Vercel Blob (STRUCTURE.md §7.3) — sampai saat itu
// tile pakai placeholder pattern (DESIGN.md §8.9), bukan foto/gradient flat.
const unitTiles: UnitTile[] = [
  {
    label: "Kontraktor",
    deskripsi: "General contractor untuk proyek sipil, bangunan, dan perbaikan struktur",
    href: "/kontraktor",
  },
  {
    label: "Alat Berat",
    deskripsi: "Sewa & jual alat berat, armada 100+ unit se-Sumatera Selatan",
    href: "/alat-berat",
  },
  {
    label: "Trading",
    deskripsi: "Distributor resmi cat, pelumas, aki, dan material industrial",
    href: "/trading",
  },
  {
    label: "Agribisnis",
    deskripsi: "Pupuk hayati & biopestisida terpercaya sejak 1995",
    href: "/agribisnis",
  },
];

export function UnitSelector() {
  return (
    <Section id="unit-usaha" className={styles.section}>
      <Container>
        <h2 className={styles.heading}>Unit Usaha</h2>
        <div className={styles.grid}>
          {unitTiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className={styles.tile}>
              <div className={styles.tilePattern} aria-hidden="true" />
              <div className={styles.tileScrim} aria-hidden="true" />
              <div className={styles.tileContent}>
                <span className={styles.tileLabel}>{tile.label}</span>
                <span className={styles.tileDescription}>{tile.deskripsi}</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
