import { Container } from "@/components/ui/Container";
import { pelangganList } from "@/content/agribisnis/pelanggan";
import styles from "./ClientLogos.module.css";

// Daftar Konsumen/Pelanggan Ostindo (PDF Company Profile, CONTENT-SOURCE.md §7) sebagai
// wordmark teks — belum ada aset logo pelanggan di repo. Nama persis sumber, urutan
// sumber. VERIFY: izin klien menampilkan nama pelanggan.
//
// Marquee kanan → kiri (permintaan pemilik proyek; menggantikan larangan marquee di
// DESIGN.md v0.4 §16.4 untuk section ini saja): murni CSS, dua salinan daftar untuk loop
// seamless — salinan kedua aria-hidden. Berhenti saat hover/fokus; statis dan lengkap
// saat prefers-reduced-motion.
function Daftar({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.list} aria-hidden={hidden || undefined}>
      {pelangganList.map((p) => (
        <li key={p.nama} className={styles.wordmark}>
          {p.nama}
        </li>
      ))}
    </ul>
  );
}

export function ClientLogos() {
  return (
    // Label visual dilepas → nama aksesibel lewat aria-label (id pelanggan-judul tidak ada lagi).
    <section className={styles.strip} aria-label="Konsumen/Pelanggan">
      <Container>
        <div className={styles.inner}>
          <div className={styles.label} />
          <div className={styles.viewport}>
            <div className={styles.track}>
              <Daftar />
              <Daftar hidden />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

