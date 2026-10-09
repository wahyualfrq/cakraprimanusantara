import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBeritaInSourceOrder } from "@/lib/content/berita";
import { formatTanggalIndonesia } from "@/lib/tanggal";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Berita",
    description: "Daftar berita dari unit usaha Agribisnis.",
    path: "/berita",
  });
}

export default function BeritaPage() {
  const items = getBeritaInSourceOrder();

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

      <Section>
        <Container>
          <ol className={styles.list}>
            {items.map((entry, index) => {
              const tanggal =
                !entry.meta.draft && entry.meta.tanggal
                  ? formatTanggalIndonesia(entry.meta.tanggal)
                  : undefined;

              const inner = (
                <>
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.body}>
                    <span className={styles.title}>{entry.meta.judul}</span>
                    <span className={styles.meta}>
                      <span className={styles.unit}>Agribisnis</span>
                      {tanggal && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{tanggal}</span>
                        </>
                      )}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={entry.meta.slug} className={styles.item}>
                  {entry.meta.draft ? (
                    <div className={styles.row}>{inner}</div>
                  ) : (
                    <Link href={`/berita/${entry.meta.slug}`} className={styles.row}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>
    </>
  );
}
