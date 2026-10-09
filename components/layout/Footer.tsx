import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

type LokasiFooter = {
  label: string;
  alamat: string;
  kontak?: string;
};

// TODO: pindahkan ke content/kontak.ts begitu migrasi konten berjalan.
const lokasiList: LokasiFooter[] = [
  {
    label: "Kantor Pusat (Palembang)",
    alamat: "Jl. Veteran No. 318, Kel. Kuto Batu, Kec. Ilir Timur II, Palembang 30111",
  },
  {
    label: "Kantor Operasional (Palembang)",
    alamat: "Komp. Griya Maju, Jl. Sako Baru Blok A No. 1-8, Palembang 30165",
    kontak: "0711-824980 / 0811-783675",
  },
  {
    label: "Workshop/Pool (Palembang)",
    alamat: "Jl. Talang Keramat Raya No. 77, Talang Kelapa, Banyuasin",
  },
  {
    label: "Office Agribisnis (Jakarta)",
    alamat: "Kompleks Bojong Indah, Jl. Pakis Raya 88B, Jakarta Barat 11740",
    kontak: "WA +62 819 2922 6666",
  },
  {
    label: "Factory Agribisnis (Tangerang)",
    alamat: "Jl. Waru Doyong No. 59, Jayanti, Tangerang, Banten",
  },
];

const quickLinks = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Kontraktor", href: "/kontraktor" },
  { label: "Alat Berat", href: "/alat-berat" },
  { label: "Trading", href: "/trading" },
  { label: "Agribisnis", href: "/agribisnis" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {lokasiList.map((lokasi) => (
            <div key={lokasi.label} className={styles.column}>
              <h3 className={styles.columnTitle}>{lokasi.label}</h3>
              <p className={styles.address}>{lokasi.alamat}</p>
              {lokasi.kontak && <p className={styles.contact}>{lokasi.kontak}</p>}
            </div>
          ))}
        </div>

        <nav className={styles.quickLinks} aria-label="Tautan cepat">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>© 2026 PT Cakra Prima Nusantara. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
