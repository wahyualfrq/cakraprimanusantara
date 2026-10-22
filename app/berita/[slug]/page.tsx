import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContentImage } from "@/components/ui/ContentImage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { kontakLink } from "@/components/layout/navLinks";
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

// Artikel (DESIGN.md v0.4 §13.7): container article 820 px — breadcrumb → sampul 16:9
// (tinggi maks. 440 px) → metadata → H1 → ringkasan → isi 68ch.
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
        <Container size="article" className={styles.article}>
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Berita", href: "/berita" },
              { label: meta.judul, href: `/berita/${meta.slug}` },
            ]}
          />

          {media ? (
            <div className={styles.mediaFrame}>
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 900px) 820px, calc(100vw - 2rem)"
                className={styles.mediaImage}
                // LCP artikel: gambar ini di desktop, H1 di mobile — preload saja, tanpa prioritas tinggi.
                preload
              />
            </div>
          ) : meta.fotoAlt ? (
            <div className={styles.mediaFrame}>
              <ContentImage alt={meta.fotoAlt} variant="berita" fill sizes="(min-width: 900px) 820px, 100vw" />
            </div>
          ) : null}

          <header className={styles.header}>
            <p className={styles.meta}>
              <span>PT Anugerah Mustika Ostindo</span>
              {meta.tanggal && (
                <>
                  <span className={styles.metaDot} aria-hidden="true">
                    ·
                  </span>
                  <time dateTime={meta.tanggal}>Diterbitkan pada {formatTanggalIndonesia(meta.tanggal)}</time>
                </>
              )}
            </p>
            <h1 className={styles.title}>{meta.judul}</h1>
            {meta.excerpt && <p className={styles.lead}>{meta.excerpt}</p>}
          </header>

          <div className={styles.content}>
            <Content />
          </div>

          <footer className={styles.articleFooter}>
            {/* Tanpa kalimat deskriptif karangan (aturan CONTENT-VERBATIM.md #3). */}
            <Card className={styles.ctaBox}>
              {/* h2: heading pertama setelah h1 (isi MDX tidak memakai heading). */}
              <h2 className={styles.ctaHeading}>{kontakLink.label}</h2>
              <Button href={kontakLink.href} arrow>
                {kontakLink.label}
              </Button>
            </Card>
            <Button href="/berita" variant="text-link">
              <span aria-hidden="true">←</span> Semua berita
            </Button>
          </footer>
        </Container>
      </article>
    </>
  );
}
