import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContentImage } from "@/components/ui/ContentImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListSchema } from "@/lib/seo/structured-data";
import { proyekList } from "@/content/kontraktor/proyek";
import styles from "./page.module.css";

// Satu-satunya pencapaian dari sumber lain (Ostindo) yang masuk halaman ini
// (CONTENT-VERBATIM.md §B) — bukan proyek kontraktor, jadi tidak di proyekList.
const pencapaian = "OSTINDO kembali Mendapatkan Penghargaan Best Fertilizer 2016";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Portofolio",
    description: `${proyekList.length} proyek dari unit usaha Kontraktor.`,
    path: "/portofolio",
  });
}

export default function PortofolioPage() {
  const schema = itemListSchema(
    proyekList.map((proyek) => ({ name: proyek.judul })),
  );

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Portofolio", href: "/portofolio" },
        ]}
        title="Portofolio"
      />

      <Section>
        <Container>
          <p className={styles.jumlah}>{proyekList.length} proyek</p>

          <ol className={styles.list}>
            {proyekList.map((proyek, index) => (
              <li key={proyek.slug} className={styles.item}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.thumb}>
                  <ContentImage alt="" variant="proyek" fill sizes="56px" />
                </span>
                <span className={styles.title}>{proyek.judul}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className={styles.pencapaianSection}>
        <Container>
          <SectionHeading title="Pencapaian" />
          <p className={styles.pencapaianItem}>{pencapaian}</p>
        </Container>
      </Section>
    </>
  );
}
