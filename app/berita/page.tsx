import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBeritaInSourceOrder, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { ilustrasi, type Ilustrasi } from "@/content/ilustrasi";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Berita",
    // INTERIM — belum disetujui (D2). Sumber tidak punya kalimat deskripsi halaman Berita; label faktual pendek.
    description: "Berita PT Anugerah Mustika Ostindo.",
    path: "/berita",
  });
}

// Ilustrasi sementara (D4) — bukan dokumentasi kegiatan; tanpa caption. Hanya untuk
// artikel unggulan (DESIGN.md §12.6 INTERIM); baris arsip tanpa thumbnail.
const ILUSTRASI_UNGGULAN: Record<string, Ilustrasi> = {
  "kerjasama-brin-teknologi-pestisida": ilustrasi.laboratorium,
};
const SLUG_UNGGULAN = "kerjasama-brin-teknologi-pestisida";

// Struktur DESIGN.md v0.4 §13.6: artikel unggulan (split-media 5:7) → "Berita lainnya"
// (baris S5, tanpa artikel unggulan; disembunyikan bila kosong). Hanya artikel terbit,
// urutan sumber; draft tetap notFound() di halaman detail dan tidak masuk sitemap.
export default function BeritaPage() {
  const featured = getBeritaBySlug(SLUG_UNGGULAN);
  const tampilkanUnggulan = Boolean(featured && !featured.meta.draft);
  const lainnya = getBeritaInSourceOrder().filter(
    (entry) => !entry.meta.draft && !(tampilkanUnggulan && entry.meta.slug === SLUG_UNGGULAN),
  );
  const gambarUnggulan = featured ? ILUSTRASI_UNGGULAN[featured.meta.slug] : undefined;

  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
        ]}
        title="Berita"
      />

      {featured && tampilkanUnggulan && (
        <Section aria-label="Artikel unggulan">
          <Container>
            <article className={styles.featured}>
              <Link href={`/berita/${featured.meta.slug}`} className={styles.featuredLink}>
                {gambarUnggulan && (
                  <span className={styles.featuredMedia}>
                    <Image
                      src={gambarUnggulan.src}
                      alt={gambarUnggulan.alt}
                      fill
                      sizes="(min-width: 1200px) 450px, (min-width: 900px) 38vw, calc(100vw - 2rem)"
                      className={styles.cover}
                      // Elemen LCP /berita/ di 360 & 1440 → preload + prioritas tinggi (diukur Tahap O).
                      preload
                      fetchPriority="high"
                    />
                  </span>
                )}

                <span className={styles.featuredBody}>
                  {featured.meta.tanggal && (
                    <time dateTime={featured.meta.tanggal} className={styles.date}>
                      {formatTanggalIndonesia(featured.meta.tanggal)}
                    </time>
                  )}
                  <h2 className={styles.featuredTitle}>{featured.meta.judul}</h2>
                  {featured.meta.excerpt && <span className={styles.featuredExcerpt}>{featured.meta.excerpt}</span>}
                  <span className={styles.readMore}>
                    Baca artikel lengkap <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </article>
          </Container>
        </Section>
      )}

      {lainnya.length > 0 && (
        <Section aria-labelledby="berita-lainnya">
          <Container className={styles.archive}>
            <SectionHeading title="Berita lainnya" id="berita-lainnya" />
            <Reveal as="ul" stagger className={styles.list}>
              {lainnya.map(({ meta }) => (
                <li key={meta.slug}>
                  <Link href={`/berita/${meta.slug}`} className={styles.row}>
                    {meta.tanggal && (
                      <time dateTime={meta.tanggal} className={styles.date}>
                        {formatTanggalIndonesia(meta.tanggal)}
                      </time>
                    )}
                    <span className={styles.rowMain}>
                      <h3 className={styles.rowTitle}>{meta.judul}</h3>
                      {meta.excerpt && <span className={styles.rowExcerpt}>{meta.excerpt}</span>}
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  );
}
