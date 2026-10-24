import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { lokasiCakraPrimaNusantara, lokasiList } from "@/content/kontak";
import { profil } from "@/content/profil";
import { kontakHref, kontakLabel } from "@/lib/kontak";
import { BackToTop } from "./BackToTop";
import { kontakLink, navLinks } from "./navLinks";
import styles from "./Footer.module.css";

// Lokasi Ostindo + PT Cakra Prima Nusantara; lokasi Cakra lain di content/kontak.ts di luar scope.
const lokasiFooter = [
  ...lokasiList.filter((lokasi) => lokasi.unitUsaha.includes("agribisnis")),
  lokasiCakraPrimaNusantara,
];

/**
 * Footer (DESIGN.md §14): green-900; Visi Perusahaan 5 | Office 4 | Factory 3 | Cakra 4 di ≥ 900 px;
 * kontak sebagai pasangan label | nilai; tautan cepat + hak cipta di baris bawah.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        {/* Reveal ringan per kolom (stagger); tanpa JS / reduced motion langsung tampil. */}
        <Reveal stagger className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.name}>{profil.nama}</p>
            {/* Teks footer situs Ostindo, verbatim (CONTENT-VERBATIM.md §G5). */}
            <p className={styles.text}>{profil.visiPerusahaan}</p>
          </div>

          {lokasiFooter.map((lokasi) => {
            const pesanWhatsApp = `Halo, saya ingin menghubungi ${
              lokasi === lokasiCakraPrimaNusantara ? lokasi.nama : profil.nama
            }.`;
            const kontak = (lokasi.kontak ?? []).filter((item) => !item.perluVerifikasi);
            return (
              <div key={lokasi.slug} className={styles.column}>
                <h2 className={styles.columnTitle}>{lokasi.nama}</h2>
                <address className={styles.text}>{lokasi.alamat}</address>
                {(kontak.length > 0 || lokasi.email) && (
                  <dl className={styles.contacts}>
                    {kontak.map((item) => {
                      const href = kontakHref(item, pesanWhatsApp);
                      const external = item.tipe === "whatsapp" || item.tipe === "instagram";
                      return (
                        <div key={`${item.tipe}-${item.nilai}`} className={styles.contact}>
                          <dt>{kontakLabel[item.tipe]}</dt>
                          <dd>
                            {href ? (
                              <a
                                href={href}
                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              >
                                {item.nilai}
                              </a>
                            ) : (
                              item.nilai
                            )}
                          </dd>
                        </div>
                      );
                    })}
                    {lokasi.email && (
                      <div className={styles.contact}>
                        <dt>Email</dt>
                        <dd>
                          <a href={`mailto:${lokasi.email}`}>{lokasi.email}</a>
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
            );
          })}
        </Reveal>

        <div className={styles.bottom}>
          <nav aria-label="Tautan cepat">
            <ul className={styles.quickLinks}>
              {[...navLinks, kontakLink].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.bottomEnd}>
            <p className={styles.copyright}>© 2026 PT Anugerah Mustika Ostindo. All Rights Reserved.</p>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
