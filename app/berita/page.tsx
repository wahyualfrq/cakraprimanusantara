import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

// Struktur Berita (DESIGN.md §8.11): artikel utama + arsip berbaris — bukan grid
// kartu. Hanya artikel yang isinya genuine (bukan draft), urutan sumber; artikel
// draft tetap notFound() di halaman detail dan tidak masuk sitemap.
export default function BeritaPage() {
  const featured = getBeritaBySlug("kerjasama-brin-teknologi-pestisida");
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

      {/* ── ARTIKEL UNGGULAN ─────────────────────────────────────────── */}
      {featured && !featured.meta.draft && (
        <Section>
          <Container>
            <article className={styles.featured}>
              {ilustrasiUnggulan && (
                <div className={styles.featuredMedia}>
                  <Image
                    src={ilustrasiUnggulan.src}
                    alt={ilustrasiUnggulan.alt}
                    fill
                    sizes="(min-width: 900px) 560px, 100vw"
                    className={styles.cover}
                    // Elemen LCP /berita/ di 360 & 1440 → preload + prioritas tinggi (diukur Tahap O).
                    preload
                    fetchPriority="high"
                  />
                </div>
              )}

              <div className={styles.featuredBody}>
                {featured.meta.tanggal && (
                  <time dateTime={featured.meta.tanggal} className={styles.date}>
                    {formatTanggalIndonesia(featured.meta.tanggal)}
                  </time>
                )}

                <h2 className={styles.featuredTitle}>
                  <Link href={`/berita/${featured.meta.slug}`} className={styles.titleLink}>
                    {featured.meta.judul}
                  </Link>
                </h2>

                {featured.meta.excerpt && (
                  <p className={styles.featuredExcerpt}>{featured.meta.excerpt}</p>
                )}

                <Link href={`/berita/${featured.meta.slug}`} className={styles.readMore}>
                  Baca Artikel Lengkap →
                </Link>
              </div>
            </article>
          </Container>
        </Section>
      )}

      {/* ── SEMUA ARTIKEL TERBIT — arsip berbaris ────────────────────── */}
      <Section>
        <Container>
          <SectionHeading title="Semua Berita" />

          <ul className={styles.list}>
            {terbit.map((entry) => {
              const { meta } = entry;
              const gambar = ILUSTRASI_BERITA[meta.slug];

              return (
                <li key={meta.slug}>
                  <article className={styles.row}>
                    <div className={styles.thumb}>
                      {gambar ? (
                        <Image
                          src={gambar.src}
                          alt={gambar.alt}
                          fill
                          sizes="(min-width: 640px) 220px, calc(100vw - 2rem)"
                          className={styles.cover}
                        />
                      ) : (
                        <ContentImage
                          alt={meta.fotoAlt ?? meta.judul}
                          variant="berita"
                          fill
                          sizes="(min-width: 640px) 220px, calc(100vw - 2rem)"
                        />
                      )}
                    </div>

                    <div className={styles.rowBody}>
                      {meta.tanggal && (
                        <time dateTime={meta.tanggal} className={styles.date}>
                          {formatTanggalIndonesia(meta.tanggal)}
                        </time>
                      )}
                      <h3 className={styles.rowTitle}>
                        <Link href={`/berita/${meta.slug}`} className={styles.titleLink}>
                          {meta.judul}
                        </Link>
                      </h3>
                      {meta.excerpt && <p className={styles.rowExcerpt}>{meta.excerpt}</p>}
                      <Link href={`/berita/${meta.slug}`} className={styles.readMore}>
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}
