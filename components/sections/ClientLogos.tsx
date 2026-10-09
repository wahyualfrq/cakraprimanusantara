import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./ClientLogos.module.css";

// TODO: ganti dengan logo asli (foto) begitu aset tersedia — pindahkan ke content/klien.ts.
const klienRow = [
  "Astra Agro Lestari",
  "PTPN",
  "Perhutani",
  "PT Sampoerna Agro",
  "PT Bukit Asam",
  "PT PP Persero",
];

const mitraRow = ["Komatsu", "Caterpillar", "Jotun", "BASF", "Eneos", "LiuGong"];

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
    <Section className={styles.section}>
      <Container className={styles.stack}>
        <LogoStrip label="Dipercaya oleh" items={klienRow} />
        <LogoStrip label="Mitra Distribusi" items={mitraRow} />
      </Container>
    </Section>
  );
}
