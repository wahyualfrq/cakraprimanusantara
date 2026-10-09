import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { ContentImage } from "@/components/ui/ContentImage";
import { LiteYouTube } from "@/components/ui/LiteYouTube";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/structured-data";
import { layananList, type Layanan } from "@/content/kontraktor/layanan";
import { renderInlineEmphasis } from "@/lib/text";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ layanan: string }>;
};

export function generateStaticParams() {
  return layananList.map((layanan) => ({ layanan: layanan.slug }));
}

export const dynamicParams = false;

function getLayanan(slug: string) {
  return layananList.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { layanan: slug } = await params;
  const layanan = getLayanan(slug);
  if (!layanan) return {};

  return buildMetadata({
    title: layanan.nama,
    description: layanan.kalimatIndeks,
    path: `/kontraktor/${layanan.slug}`,
  });
}

function LayananMedia({ layanan }: { layanan: Layanan }) {
  if (!layanan.jumlahFotoSumber) {
    return (
      <ContentImage
        alt={`Dokumentasi layanan ${layanan.nama}`}
        variant="unit"
        width={800}
        height={520}
        sizes="(min-width: 900px) 60vw, 100vw"
        className={styles.singlePhoto}
      />
    );
  }

  return (
    <div className={styles.gallery}>
      {Array.from({ length: layanan.jumlahFotoSumber }).map((_, index) => (
        <ContentImage
          key={index}
          alt={`Dokumentasi layanan ${layanan.nama} ${index + 1}`}
          variant="unit"
          width={400}
          height={300}
          sizes="(min-width: 900px) 30vw, 50vw"
        />
      ))}
      <LiteYouTube
        videoId={layanan.videoId}
        title={`Video layanan ${layanan.nama}`}
        className={styles.video}
      />
    </div>
  );
}

export default async function LayananDetailPage({ params }: PageProps) {
  const { layanan: slug } = await params;
  const layanan = getLayanan(slug);
  if (!layanan) notFound();

  const index = layananList.findIndex((item) => item.slug === slug);
  const sebelumnya = index > 0 ? layananList[index - 1] : undefined;
  const berikutnya = index < layananList.length - 1 ? layananList[index + 1] : undefined;

  const definitionItems = layanan.poinUtama.map((poin) => ({
    label: poin.label,
    description: renderInlineEmphasis(poin.penjelasan),
  }));

  const schema = serviceSchema({
    name: layanan.nama,
    description: layanan.kalimatIndeks,
  });

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kontraktor", href: "/kontraktor" },
          { label: layanan.nama, href: `/kontraktor/${layanan.slug}` },
        ]}
        title={layanan.nama}
      />

      <Section>
        <Container className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.intro}>{renderInlineEmphasis(layanan.intro)}</p>
            <h2 className={styles.subjudul}>{layanan.subjudul}</h2>
            <p className={styles.pengantarPoin}>{renderInlineEmphasis(layanan.pengantarPoin)}</p>
            <DefinitionList items={definitionItems} numbered />
            <p className={styles.penutup}>{renderInlineEmphasis(layanan.penutup)}</p>
            <LayananMedia layanan={layanan} />
          </div>

          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>Konsultasi Layanan Ini</h2>
            <WhatsAppLink
              nomor="0811-783-675"
              pesan={`Halo, saya ingin konsultasi layanan ${layanan.nama}.`}
              className={styles.asideCta}
            >
              Hubungi via WhatsApp
            </WhatsAppLink>
            <a href="tel:+62711824980" className={styles.asidePhone}>
              0711-824980
            </a>
          </aside>
        </Container>
      </Section>

      <Section>
        <Container>
          <nav aria-label="Navigasi layanan" className={styles.prevNext}>
            {sebelumnya ? (
              <Link href={`/kontraktor/${sebelumnya.slug}`} className={styles.prevLink}>
                ← {sebelumnya.nama}
              </Link>
            ) : (
              <span />
            )}
            {berikutnya && (
              <Link href={`/kontraktor/${berikutnya.slug}`} className={styles.nextLink}>
                {berikutnya.nama} →
              </Link>
            )}
          </nav>
        </Container>
      </Section>
    </>
  );
}
