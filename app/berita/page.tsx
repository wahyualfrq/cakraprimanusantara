import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentImage } from "@/components/ui/ContentImage";
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

// Ilustrasi sementara (D4) — bukan dokumentasi kegiatan; tanpa caption.
const ILUSTRASI_BERITA: Record<string, Ilustrasi> = {
  "kerjasama-brin-teknologi-pestisida": ilustrasi.laboratorium,
  "kerjasama-dengan-lipi": ilustrasi.rumahKaca,
};

export default function BeritaPage() {
  const featured = getBeritaBySlug("kerjasama-brin-teknologi-pestisida");
  // Hanya artikel yang isinya genuine (bukan draft), urutan sumber. Artikel draft
  // tetap notFound() di halaman detail dan tidak masuk sitemap.
  const terbit = getBeritaInSourceOrder().filter((entry) => !entry.meta.draft);
  const ilustrasiUnggulan = featured ? ILUSTRASI_BERITA[featured.meta.slug] : undefined;

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

      {/* ── ARTIKEL UNGGULAN ───────────────────────────────────────────── */}
      {featured && !featured.meta.draft && (
        <Section className={styles.featuredSection}>
          <Container>
            <article className={styles.featuredCard}>
              <div className={styles.featuredContent}>
                {featured.meta.tanggal && (
                  <div className={styles.featuredMetaRow}>
                    <time dateTime={featured.meta.tanggal} className={styles.featuredDate}>
                      {formatTanggalIndonesia(featured.meta.tanggal)}
                    </time>
                  </div>
                )}

                <h2 className={styles.featuredTitle}>
                  <Link
                    href={`/berita/${featured.meta.slug}`}
                    className={styles.featuredTitleLink}
                  >
                    {featured.meta.judul}
                  </Link>
                </h2>

                {featured.meta.excerpt && (
                  <p className={styles.featuredExcerpt}>{featured.meta.excerpt}</p>
                )}

                <div className={styles.featuredCtaRow}>
                  <Link
                    href={`/berita/${featured.meta.slug}`}
                    className={styles.featuredButton}
                  >
                    Baca Artikel Lengkap →
                  </Link>
                </div>
              </div>

              {ilustrasiUnggulan && (
                <div className={styles.featuredMedia}>
                  <figure className={styles.featuredFigure}>
                    <div className={styles.featuredMediaFrame}>
                      <Image
                        src={ilustrasiUnggulan.src}
                        alt={ilustrasiUnggulan.alt}
                        fill
                        sizes="(min-width: 1024px) 540px, 100vw"
                        className={styles.featuredImage}
                        priority
                      />
                    </div>
                  </figure>
                </div>
              )}
            </article>
          </Container>
        </Section>
      )}

      {/* ── SEMUA ARTIKEL TERBIT ───────────────────────────────────────── */}
      <Section className={styles.archiveSection}>
        <Container>
          <div className={styles.archiveHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Semua Berita</h2>
            </div>
          </div>

          <div className={styles.archiveGrid}>
            {terbit.map((entry) => {
              const { meta } = entry;
              const ilustrasi = ILUSTRASI_BERITA[meta.slug];

              return (
                <article key={meta.slug} className={styles.cardActive}>
                  <div className={styles.cardMedia}>
                    {ilustrasi ? (
                      <div className={styles.mediaWrapper}>
                        <Image
                          src={ilustrasi.src}
                          alt={ilustrasi.alt}
                          fill
                          sizes="(min-width: 900px) 400px, 100vw"
                          className={styles.cardImage}
                        />
                      </div>
                    ) : (
                      <ContentImage
                        alt={meta.fotoAlt ?? meta.judul}
                        variant="berita"
                        fill
                        sizes="(min-width: 900px) 400px, 100vw"
                      />
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    {meta.tanggal && (
                      <div className={styles.cardMeta}>
                        <time dateTime={meta.tanggal} className={styles.cardDate}>
                          {formatTanggalIndonesia(meta.tanggal)}
                        </time>
                      </div>
                    )}

                    <h3 className={styles.cardTitle}>
                      <Link href={`/berita/${meta.slug}`} className={styles.cardTitleLink}>
                        {meta.judul}
                      </Link>
                    </h3>

                    {meta.excerpt && <p className={styles.cardExcerpt}>{meta.excerpt}</p>}

                    <div className={styles.cardFooter}>
                      <Link href={`/berita/${meta.slug}`} className={styles.readMoreLink}>
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
