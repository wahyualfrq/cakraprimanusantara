import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList, type DefinitionItem } from "@/components/ui/DefinitionList";
import { SpecTable, type SpecColumn } from "@/components/ui/SpecTable";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { kontakLink } from "@/components/layout/navLinks";
import { buildMetadata } from "@/lib/seo/metadata";
import { productSchema } from "@/lib/seo/structured-data";
import { renderInlineEmphasis } from "@/lib/text";
import { kategoriLabel, produkList, type BarisDosis } from "@/content/agribisnis/produk";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Dibutuhkan agar dynamic route bisa di-statically generated (output: export). */
export function generateStaticParams() {
  return produkList.map((p) => ({ slug: p.slug }));
}

// Slug di luar produkList langsung 404 statis (sama dengan /berita/[slug]).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = produkList.find((p) => p.slug === slug);
  if (!found) return {};

  return buildMetadata({
    title: found.nama,
    description: found.deskripsiSingkat,
    path: `/produk/${slug}`,
  });
}

// Lembar produk (DESIGN.md v0.4 §13.4): split-aside 8:4 — isi verbatim + tabel dosis di
// kiri, aside S1 sticky di kanan. Hanya data bersumber dari content/agribisnis/produk.ts;
// field perluVerifikasi / dosisPerluVerifikasi TIDAK dirender sebagai fakta final.
// Tanpa foto: foto produk asli belum tersedia.
export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const found = produkList.find((p) => p.slug === slug);
  if (!found) notFound();

  const path = `/produk/${found.slug}`;
  const infoProduk: DefinitionItem[] = [
    { label: "Kategori", description: kategoriLabel[found.kategori] },
    ...(found.faktaKunci ?? [])
      .filter((fakta) => !fakta.perluVerifikasi)
      .map((fakta) => ({ label: fakta.label, description: fakta.nilai })),
    ...(found.sertifikasi?.length ? [{ label: "Sertifikasi", description: found.sertifikasi.join(", ") }] : []),
    ...(found.catatanPenyimpanan ? [{ label: "Catatan", description: found.catatanPenyimpanan }] : []),
  ];

  const tampilkanTabelDosis = Boolean(found.dosisAnjuran?.length) && !found.dosisPerluVerifikasi;
  const adaFrekuensi = found.dosisAnjuran?.some((baris) => baris.frekuensi) ?? false;
  // Judul kolom mengikuti tabel sumber "DOSIS DAN METODE PEMUPUKAN" (CONTENT-VERBATIM.md §E2).
  const kolomDosis: SpecColumn<BarisDosis>[] = [
    { key: "fase", header: "Umur/Fase Tanaman", render: (baris) => baris.fase },
    { key: "dosis", header: "Dosis Anjuran", render: (baris) => baris.dosis },
    ...(adaFrekuensi
      ? [{ key: "frekuensi", header: "Frekuensi", render: (baris: BarisDosis) => baris.frekuensi ?? "" }]
      : []),
    { key: "metode", header: "Metode", render: (baris) => baris.metode ?? "" },
  ];

  const lainnya = produkList.filter((p) => p.slug !== found.slug);

  // Product JSON-LD hanya fakta sumber: nama + kalimat pembuka §E2 (tanpa harga/rating).
  const schema = productSchema({ name: found.nama, description: found.deskripsiSingkat, path });

  return (
    <>
      <JsonLd data={schema} />

      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/produk" },
          { label: found.nama, href: path },
        ]}
        title={found.nama}
        description={found.deskripsiSingkat}
      />

      <Section>
        <Container className={styles.layout}>
          <div className={styles.main}>
            {found.poin && found.poin.length > 0 && (
              <div className={styles.block}>
                {found.judulPoin && <p className={styles.pointsTitle}>{found.judulPoin}</p>}
                <ol className={styles.points}>
                  {found.poin.map((butir, index) => (
                    <li key={butir}>
                      <span className={styles.number} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{butir}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {found.deskripsiLengkap.length > 0 && (
              <div className={styles.prose}>
                {found.deskripsiLengkap.map((paragraf) => (
                  <p key={paragraf}>{renderInlineEmphasis(paragraf)}</p>
                ))}
              </div>
            )}

            {(tampilkanTabelDosis || found.catatanDosis) && (
              <Reveal className={styles.block}>
                <SectionHeading title="Dosis dan Metode Pemupukan" id="dosis-judul" className={styles.blockHeading} />
                {tampilkanTabelDosis && found.dosisAnjuran ? (
                  <SpecTable columns={kolomDosis} rows={found.dosisAnjuran} rowKey={(baris) => baris.fase} />
                ) : (
                  <p className={styles.note}>{found.catatanDosis}</p>
                )}
              </Reveal>
            )}
          </div>

          <Card as="aside" className={styles.aside} aria-labelledby="informasi-produk">
            <h2 id="informasi-produk" className={styles.asideTitle}>
              Informasi Produk
            </h2>
            <DefinitionList items={infoProduk} />
            <div className={styles.asideActions}>
              <Button href={kontakLink.href} block>
                {kontakLink.label}
              </Button>
              <Button href="/produk" variant="text-link">
                <span aria-hidden="true">←</span> Semua produk
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Navigasi antarproduk — kartu horizontal ringkas, urutan sumber. */}
      <Section tone="muted" aria-labelledby="produk-lain-judul">
        <Container>
          <SectionHeading title="Produk lainnya" id="produk-lain-judul" />
          <Reveal as="ul" stagger className={styles.others}>
            {lainnya.map((produk) => (
              <li key={produk.slug}>
                <Link href={`/produk/${produk.slug}`} className={styles.otherCard}>
                  <span className={styles.otherMeta}>{kategoriLabel[produk.kategori]}</span>
                  <span className={styles.otherName}>{produk.nama}</span>
                  <span className={styles.otherArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
