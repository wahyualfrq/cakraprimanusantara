import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContentImage } from "@/components/ui/ContentImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/structured-data";
import { beritaPublishedList, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { ilustrasi, type Ilustrasi } from "@/content/ilustrasi";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return beritaPublishedList.map((entry) => ({ slug: entry.meta.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBeritaBySlug(slug);
  if (!entry || entry.meta.draft) return {};

  return buildMetadata({
    title: entry.meta.judul,
    description: entry.meta.excerpt,
    path: `/berita/${slug}`,
  });
}

// Ilustrasi sementara (D4) untuk artikel terbit — bukan dokumentasi kegiatan.
const ARTIKEL_MEDIA: Record<string, Ilustrasi> = {
  "kerjasama-brin-teknologi-pestisida": ilustrasi.laboratorium,
  "kerjasama-dengan-lipi": ilustrasi.rumahKaca,
};

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getBeritaBySlug(slug);
  if (!entry || entry.meta.draft) notFound();

  const { meta, Content } = entry;
  const media = ARTIKEL_MEDIA[meta.slug];

  const schema = articleSchema({
    headline: meta.judul,
    path: `/berita/${meta.slug}`,
    datePublished: meta.tanggal,
  });

  return (
    <>
      <JsonLd data={schema} />

      <article className={styles.articlePage}>
        <Container className={styles.articleContainer}>
          {/* 1. Breadcrumb Beranda / Berita / judul artikel (item aktif = halaman ini) */}
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumb
              items={[
                { label: "Beranda", href: "/" },
                { label: "Berita", href: "/berita" },
                { label: meta.judul, href: `/berita/${meta.slug}` },
              ]}
            />
          </div>

          {/* 2. Gambar Utama Artikel (Sebelum Judul) */}
          {media ? (
            <div className={styles.mediaFrame}>
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 1024px) 820px, 100vw"
                className={styles.mediaImage}
                priority
              />
            </div>
          ) : meta.fotoAlt ? (
            <div className={styles.mediaFrame}>
              <ContentImage
                alt={meta.fotoAlt}
                variant="berita"
                fill
                sizes="(min-width: 1024px) 820px, 100vw"
              />
            </div>
          ) : null}

          {/* 3. Informasi Entitas dan Tanggal Publikasi */}
          <div className={styles.metaGroup}>
            <span className={styles.metaEntity}>PT Anugerah Mustika Ostindo</span>
            {meta.tanggal && (
              <>
                <span className={styles.metaDot} aria-hidden="true">·</span>
                <time dateTime={meta.tanggal} className={styles.metaDate}>
                  Diterbitkan pada {formatTanggalIndonesia(meta.tanggal)}
                </time>
              </>
            )}
          </div>

          {/* 4. Judul Artikel */}
          <h1 className={styles.title}>{meta.judul}</h1>

          {/* 5. Excerpt atau Ringkasan Artikel */}
          {meta.excerpt && (
            <p className={styles.lead}>{meta.excerpt}</p>
          )}

          {/* 6. Isi Artikel */}
          <div className={styles.content}>
            <Content />
          </div>

          {/* 7. Footer: CTA & Tautan Kembali ke Semua Berita */}
          <footer className={styles.articleFooter}>
            <div className={styles.ctaBox}>
              {/* Tanpa kalimat deskriptif karangan (aturan CONTENT-VERBATIM.md #3). */}
              <div className={styles.ctaContent}>
                {/* h2: heading pertama setelah h1 (isi MDX tidak memakai heading). */}
                <h2 className={styles.ctaHeading}>Hubungi Kami</h2>
              </div>
              <Link href="/hubungi-kami" className={styles.ctaButton}>
                Hubungi Kami
              </Link>
            </div>

            <div className={styles.navigationRow}>
              {/* <Link href="/berita" className={styles.backLink}>
                ← Kembali ke Semua Berita
              </Link> */}
            </div>
          </footer>
        </Container>
      </article>
    </>
  );
}
