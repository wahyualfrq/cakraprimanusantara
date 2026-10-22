import { Container } from "@/components/ui/Container";
import { pelangganList } from "@/content/agribisnis/pelanggan";
import styles from "./ClientLogos.module.css";

// Daftar Konsumen/Pelanggan Ostindo (PDF Company Profile, CONTENT-SOURCE.md §7)
// sebagai wordmark teks, bukan logo (DESIGN.md §11.2 "Strip pelanggan"). Nama persis
// sumber, urutan sumber, tanpa marquee. VERIFY: izin klien menampilkan nama pelanggan.
export function ClientLogos() {
  return (
    <section className={styles.strip} aria-labelledby="pelanggan-judul">
      <Container>
        <div className={styles.inner}>
          <h2 id="pelanggan-judul" className={styles.label}>
            Konsumen/Pelanggan
          </h2>
          {/* tabIndex: area geser < 900 px harus bisa dijangkau keyboard (axe scrollable-region-focusable). */}
          <ul className={styles.list} tabIndex={0} aria-labelledby="pelanggan-judul">
            {pelangganList.map((p) => (
              <li key={p.nama} className={styles.wordmark}>
                {p.nama}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
