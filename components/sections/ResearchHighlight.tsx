import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milestoneList } from "@/content/agribisnis/milestone";
import styles from "./ResearchHighlight.module.css";

// Sorotan riset di beranda: milestone yang berkaitan dengan kerja sama riset dan
// lisensi LIPI (CONTENT-VERBATIM.md §E4, verbatim). Lini waktu tipografis tanpa
// foto (keputusan V4) — tidak ada angka/klaim selain teks milestone sumber.
const TAHUN_SOROTAN = [2006, 2013, 2015];

export function ResearchHighlight() {
  const sorotan = milestoneList.filter((item) => TAHUN_SOROTAN.includes(item.tahun));

  return (
    <Section>
      <Container className={styles.grid}>
        <div className={styles.intro}>
          <SectionHeading title="Riset & Inovasi" />
          <Link href="/agribisnis/riset-inovasi" className={styles.link}>
            Lihat Riset &amp; Inovasi →
          </Link>
        </div>

        <ol className={styles.timeline}>
          {sorotan.map((item) => (
            <li key={item.tahun} className={styles.item}>
              <span className={styles.year}>{item.tahun}</span>
              <p className={styles.desc}>{item.deskripsi}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
