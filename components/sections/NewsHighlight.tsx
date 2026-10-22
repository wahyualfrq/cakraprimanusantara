import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { beritaPublishedList, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { ilustrasiBerita } from "@/lib/content/berita-ilustrasi";
import styles from "./NewsHighlight.module.css";

// Berita Beranda (DESIGN.md §13.1): satu artikel unggulan besar + kartu visual untuk
// artikel terbit lainnya. Menggunakan foto riil dari public/berita/ dan tata letak yang mudah dipindai.
const SLUG_UNGGULAN = "kerjasama-brin-teknologi-pestisida";

export function NewsHighlight() {
  const unggulan = getBeritaBySlug(SLUG_UNGGULAN);
  const lainnya = beritaPublishedList.filter((entry) => entry.meta.slug !== SLUG_UNGGULAN).slice(0, 3);
  const featuredImg = ilustrasiBerita[SLUG_UNGGULAN] ?? {
    src: "/berita/Picture2.jpg",
    alt: "Penandatanganan kerja sama Pusat Riset Mikrobiologi Terapan BRIN dengan PT Anugerah Mustika Ostindo",
  };

  return (
    <Section aria-labelledby="berita-judul">
      <Container>
        <SectionHeading
          eyebrow="Kabar Terkini"
          title="Berita &amp; Publikasi"
          accent="Publikasi"
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
                  <Image
                    src={featuredImg.src}
                    alt={featuredImg.alt}
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
                    Baca artikel lengkap
                  </span>
                </span>
              </Link>
            </Reveal>
          )}

          {lainnya.length > 0 && (
            <Reveal as="ul" stagger className={styles.list}>
              {lainnya.map(({ meta }) => {
                const thumb = ilustrasiBerita[meta.slug];
                return (
                  <li key={meta.slug}>
                    <Link href={`/berita/${meta.slug}`} className={styles.cardItem}>
                      {thumb && (
                        <div className={styles.thumbWrapper}>
                          <Image
                            src={thumb.src}
                            alt={thumb.alt}
                            fill
                            sizes="140px"
                            className={styles.thumbImage}
                          />
                        </div>
                      )}
                      <div className={styles.cardItemContent}>
                        {meta.tanggal && (
                          <time dateTime={meta.tanggal} className={styles.date}>
                            {formatTanggalIndonesia(meta.tanggal)}
                          </time>
                        )}
                        <h4 className={styles.cardItemTitle}>{meta.judul}</h4>
                        {meta.excerpt && (
                          <p className={styles.cardItemExcerpt}>{meta.excerpt}</p>
                        )}
                        <span className={styles.cardItemMore}>
                          Baca artikel
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}

