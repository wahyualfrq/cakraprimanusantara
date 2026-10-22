import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pelangganList } from "@/content/agribisnis/pelanggan";
import styles from "./ClientLogos.module.css";

// Daftar Konsumen/Pelanggan Ostindo (PDF Company Profile, CONTENT-SOURCE.md §7)
// sebagai wordmark teks, bukan logo (DESIGN.md §7).
const pelangganRow = pelangganList.map((p) => p.nama);

function LogoStrip({ label, items }: { label: string; items: string[] }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <ul className={styles.list}>
        {items.map((name) => (
          <li key={name} className={styles.wordmark}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClientLogos() {
  return (
    <Section>
      <Container className={styles.stack}>
        <LogoStrip label="Konsumen/Pelanggan" items={pelangganRow} />
      </Container>
    </Section>
  );
}
