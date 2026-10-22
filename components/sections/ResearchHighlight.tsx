import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/ui/Timeline";
import { milestoneList } from "@/content/agribisnis/milestone";
import { narasiRisetList } from "@/content/agribisnis/riset";
import styles from "./ResearchHighlight.module.css";

// Riset di Beranda — split-rail 4:8 (DESIGN.md §13.1): rail judul | paragraf §E3
// "Kerjasama Penelitian dan Pengembangan" (verbatim) + lini waktu milestone riset §E4
// (kerja sama dan lisensi LIPI). Tahun lain sudah tampil di bento, tidak diulang.
const TAHUN_RISET = [2006, 2013, 2015];
const bagianKerjasama = narasiRisetList.find((bagian) => bagian.judul === "Kerjasama Penelitian dan Pengembangan");

export function ResearchHighlight() {
  const sorotan = milestoneList.filter((item) => TAHUN_RISET.includes(item.tahun));

  return (
    <Section aria-labelledby="riset-judul">
      <Container className={styles.grid}>
        <div className={styles.rail}>
          <Eyebrow>Riset &amp; Inovasi</Eyebrow>
          <h2 id="riset-judul" className={styles.title}>
            {bagianKerjasama?.judul ?? "Riset & Inovasi"}
          </h2>
          <Button href="/riset-dan-inovasi" variant="text-link" arrow>
            Riset &amp; Inovasi
          </Button>
        </div>

        <div className={styles.body}>
          {bagianKerjasama?.paragraf.map((paragraf) => (
            <p key={paragraf} className={styles.lead}>
              {paragraf}
            </p>
          ))}
          <Timeline items={sorotan} />
        </div>
      </Container>
    </Section>
  );
}
