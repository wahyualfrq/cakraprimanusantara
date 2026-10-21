import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { lokasiList, type KontakItem } from "@/content/kontak";
import { profil } from "@/content/profil";
import { kontakLink, navLinks } from "./navLinks";
import styles from "./Footer.module.css";

// Hanya lokasi Ostindo; lokasi lain di content/kontak.ts di luar scope.
const lokasiOstindo = lokasiList.filter((lokasi) => lokasi.unitUsaha.includes("agribisnis"));

const kontakLabel: Record<KontakItem["tipe"], string> = {
  telepon: "Telepon",
  whatsapp: "WhatsApp",
  fax: "Fax",
  instagram: "Instagram",
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Visi Perusahaan</h3>
            {/* Teks footer situs Ostindo, verbatim (CONTENT-VERBATIM.md §G5). */}
            <p className={styles.address}>{profil.visiPerusahaan}</p>
          </div>

          {lokasiOstindo.map((lokasi) => (
            <div key={lokasi.slug} className={styles.column}>
              <h3 className={styles.columnTitle}>{lokasi.nama}</h3>
              <p className={styles.address}>{lokasi.alamat}</p>
              {(lokasi.kontak ?? [])
                .filter((item) => !item.perluVerifikasi)
                .map((item) => (
                  <p key={`${item.tipe}-${item.nilai}`} className={styles.contact}>
                    {kontakLabel[item.tipe]}: {item.nilai}
                  </p>
                ))}
              {lokasi.email && <p className={styles.contact}>Email: {lokasi.email}</p>}
            </div>
          ))}
        </div>

        <nav className={styles.quickLinks} aria-label="Tautan cepat">
          {[...navLinks, kontakLink].map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>© 2026 PT Anugerah Mustika Ostindo. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
