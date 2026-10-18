import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./UnitSelector.module.css";

type UnitTile = {
  label: string;
  deskripsi: string;
  href: string;
  image: string;
  imageAlt: string;
};

const unitTiles: UnitTile[] = [
  {
    label: "Kontraktor",
    deskripsi: "General contractor untuk proyek sipil, bangunan, dan perbaikan struktur",
    href: "/kontraktor",
    image: "/images/gambar-3.png",
    imageAlt: "Proyek pengaspalan jalan dan konstruksi sipil PT Cakra Indo Pratama",
  },
  {
    label: "Alat Berat",
    deskripsi: "Sewa & jual alat berat, armada 100+ unit se-Sumatera Selatan",
    href: "/alat-berat",
    image: "/images/gambar-2.png",
    imageAlt: "Armada excavator operasional sewa alat berat PT Cakra Indo Pratama",
  },
  {
    label: "Trading",
    deskripsi: "Distributor dan agen untuk merek nasional dan internasional",
    href: "/trading",
    image: "/images/gambar-1.png",
    imageAlt: "Aktivitas pergudangan distribusi material dan logistik industrial",
  },
  {
    label: "Agribisnis",
    deskripsi: "Pupuk hayati & biopestisida terpercaya sejak 1995",
    href: "/agribisnis",
    image: "/images/gambar-4.png",
    imageAlt: "Pengawasan perkebunan kelapa sawit dan aplikasi produk agribisnis OSTINDO",
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
              <Image
                src={tile.image}
                alt={tile.imageAlt}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={styles.tileImage}
              />
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
