import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentImage } from "@/components/ui/ContentImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/structured-data";
import { beritaPublishedList, getBeritaBySlug } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
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

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getBeritaBySlug(slug);
  if (!entry || entry.meta.draft) notFound();

  const { meta, Content } = entry;
  const schema = articleSchema({
    headline: meta.judul,
    datePublished: meta.tanggal,
  });

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: meta.judul, href: `/berita/${meta.slug}` },
        ]}
        title={meta.judul}
      />

      <Section>
        <Container className={styles.layout}>
          {meta.tanggal && (
            <p className={styles.tanggal}>{formatTanggalIndonesia(meta.tanggal)}</p>
          )}

          {meta.fotoAlt && (
            <ContentImage
              alt={meta.fotoAlt}
              variant="berita"
              width={800}
              height={520}
              sizes="(min-width: 900px) 60vw, 100vw"
              className={styles.foto}
            />
          )}

          <div className={styles.content}>
            <Content />
          </div>
        </Container>
      </Section>
    </>
  );
}
