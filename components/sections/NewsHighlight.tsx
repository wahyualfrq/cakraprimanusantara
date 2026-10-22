import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { beritaPublishedList, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { ilustrasi } from "@/content/ilustrasi";
import styles from "./NewsHighlight.module.css";

// Berita Beranda (DESIGN.md §13.1): satu artikel unggulan besar + baris S5 untuk
// artikel terbit lainnya. Judul, tanggal, excerpt dari MDX; tanpa kategori (sumber
// tidak memberi). Ilustrasi hanya pada unggulan (§12.6 INTERIM), baris tanpa thumbnail.
const SLUG_UNGGULAN = "kerjasama-brin-teknologi-pestisida";

export function NewsHighlight() {
  const unggulan = getBeritaBySlug(SLUG_UNGGULAN);
  const lainnya = beritaPublishedList.filter((entry) => entry.meta.slug !== SLUG_UNGGULAN);

  return (
    <Section aria-labelledby="berita-judul">
      <Container>
        <SectionHeading
          title="Berita"
          layout="split"
          id="berita-judul"
          actions={
            <Button href="/berita" variant="text-link">
              Semua berita
            </Button>
          }
        />

        <div className={styles.grid}>
          {unggulan && !unggulan.meta.draft && (
            <Reveal as="article" className={styles.featured}>
              <Link href={`/berita/${unggulan.meta.slug}`} className={styles.featuredLink}>
                <span className={styles.featuredMedia}>
                  {/* Ilustrasi sementara (D4) — bukan dokumentasi kegiatan. */}
                  <Image
                    src={ilustrasi.laboratorium.src}
                    alt={ilustrasi.laboratorium.alt}
                    fill
                    sizes="(min-width: 1200px) 640px, (min-width: 900px) 55vw, calc(100vw - 2rem)"
                    className={styles.image}
                  />
                </span>
                <span className={styles.featuredBody}>
                  {unggulan.meta.tanggal && (
                    <time dateTime={unggulan.meta.tanggal} className={styles.date}>
                      {formatTanggalIndonesia(unggulan.meta.tanggal)}
                    </time>
                  )}
                  <h3 className={styles.featuredTitle}>{unggulan.meta.judul}</h3>
                  {unggulan.meta.excerpt && <span className={styles.excerpt}>{unggulan.meta.excerpt}</span>}
                  <span className={styles.more}>
                    Baca artikel <span aria-hidden="true"></span>
                  </span>
                </span>
              </Link>
            </Reveal>
          )}

          {lainnya.length > 0 && (
            <Reveal as="ul" stagger className={styles.list}>
              {lainnya.map(({ meta }) => (
                <li key={meta.slug}>
                  <Link href={`/berita/${meta.slug}`} className={styles.row}>
                    {meta.tanggal && (
                      <time dateTime={meta.tanggal} className={styles.date}>
                        {formatTanggalIndonesia(meta.tanggal)}
                      </time>
                    )}
                    <h3 className={styles.rowTitle}>{meta.judul}</h3>
                    {meta.excerpt && <span className={styles.excerpt}>{meta.excerpt}</span>}
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}
