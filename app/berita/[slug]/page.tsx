import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContentImage } from "@/components/ui/ContentImage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { kontakLink } from "@/components/layout/navLinks";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/structured-data";
import { beritaPublishedList, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import { ilustrasiBerita } from "@/lib/content/berita-ilustrasi";
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

// Artikel (DESIGN.md v0.4 §13.7): container article 820 px — breadcrumb → sampul 16:9
// (tinggi maks. 440 px) → metadata → H1 → ringkasan → isi 68ch.
export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getBeritaBySlug(slug);
  if (!entry || entry.meta.draft) notFound();

  const { meta, Content } = entry;
  const media = ilustrasiBerita[meta.slug];
  // Artikel terkait = artikel terbit lain (tanpa kategori di sumber, jadi tanpa pemeringkatan).
  const terkait = beritaPublishedList.filter((item) => item.meta.slug !== meta.slug).slice(0, 2);

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

      {terkait.length > 0 && (
        <Section tone="muted" aria-labelledby="berita-terkait">
          <Container size="article">
            <h2 id="berita-terkait" className={styles.relatedTitle}>
              Berita lainnya
            </h2>
            <Reveal as="ul" stagger className={styles.related}>
              {terkait.map(({ meta: item }) => {
                const gambar = ilustrasiBerita[item.slug];
                return (
                  <li key={item.slug}>
                    <Link href={`/berita/${item.slug}`} className={styles.relatedCard}>
                      <span className={styles.relatedMedia}>
                        {gambar ? (
                          <Image src={gambar.src} alt={gambar.alt} fill sizes="(min-width: 640px) 240px, calc(100vw - 2rem)" className={styles.relatedImage} />
                        ) : (
                          <ContentImage alt="" variant="berita" fill sizes="240px" />
                        )}
                      </span>
                      <span className={styles.relatedBody}>
                        {item.tanggal && (
                          <time dateTime={item.tanggal} className={styles.relatedDate}>
                            {formatTanggalIndonesia(item.tanggal)}
                          </time>
                        )}
                        <span className={styles.relatedName}>{item.judul}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  );
}

