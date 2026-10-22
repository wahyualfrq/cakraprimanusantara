import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { milestoneList } from "@/content/agribisnis/milestone";
import { cn } from "@/lib/utils";
import styles from "./MilestoneBento.module.css";

// Bento milestone Beranda (DESIGN.md §3.3, §11.2 [T8]): subset data milestone §E4,
// verbatim, tanpa item karangan. Sel A tinggi, B dan C standar, D lebar gelap (item
// terakhir). Tahun 2006/2013/2015 (riset LIPI) tampil di section Riset, tidak diulang.
const SUBSET = [1995, 2001, 2009, 2010];
const SEL = ["a", "b", "c", "d"] as const;

export function MilestoneBento() {
  const items = SUBSET.flatMap((tahun) => milestoneList.filter((item) => item.tahun === tahun));

  return (
    <Section tone="muted" aria-labelledby="milestone-judul">
      <Container>
        <SectionHeading
          eyebrow="Sejarah"
          title="Milestone"
          layout="split"
          id="milestone-judul"
          actions={
            <Button href="/tentang-kami" variant="text-link" arrow>
              Milestone lengkap
            </Button>
          }
        />

        <Reveal as="ol" stagger className={styles.bento}>
          {items.map((item, index) => (
            <li key={item.tahun} className={cn(styles.card, styles[SEL[index]])}>
              <span className={styles.year}>{item.tahun}</span>
              <p className={styles.text}>{item.deskripsi}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
