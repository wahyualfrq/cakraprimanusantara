import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList, type DefinitionItem } from "@/components/ui/DefinitionList";
import { SpecTable, type SpecColumn } from "@/components/ui/SpecTable";
import { PillButton } from "@/components/ui/PillButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { kontakLink } from "@/components/layout/navLinks";
import { buildMetadata } from "@/lib/seo/metadata";
import { productSchema } from "@/lib/seo/structured-data";
import { renderInlineEmphasis } from "@/lib/text";
import { produkList, type BarisDosis } from "@/content/agribisnis/produk";
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
    path: `/agribisnis/produk/${slug}`,
    noindex: true,
  });
}

// Lembar produk (DESIGN.md §8.11) dari content/agribisnis/produk.ts — hanya data
// bersumber. Field perluVerifikasi / dosisPerluVerifikasi TIDAK dirender sebagai
// fakta final. Tanpa foto: foto produk asli belum tersedia (D4 tidak dipakai di sini).
export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const found = produkList.find((p) => p.slug === slug);
  if (!found) notFound();

  const path = `/agribisnis/produk/${found.slug}`;
  const infoProduk: DefinitionItem[] = [
    ...(found.faktaKunci ?? [])
      .filter((fakta) => !fakta.perluVerifikasi)
      .map((fakta) => ({ label: fakta.label, description: fakta.nilai })),
    ...(found.sertifikasi?.length
      ? [{ label: "Sertifikasi", description: found.sertifikasi.join(", ") }]
      : []),
    ...(found.catatanPenyimpanan
      ? [{ label: "Catatan", description: found.catatanPenyimpanan }]
      : []),
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

  // Product JSON-LD hanya fakta sumber: nama + kalimat pembuka §E2 (tanpa harga/rating).
  const schema = productSchema({ name: found.nama, description: found.deskripsiSingkat, path });

  return (
    <>
      <JsonLd data={schema} />

      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/agribisnis/produk" },
          { label: found.nama, href: path },
        ]}
        title={found.nama}
        description={found.deskripsiSingkat}
      />

      <Section>
        <Container className={styles.layout}>
          <div className={styles.prose}>
            {found.poin && found.poin.length > 0 && (
              <>
                {found.judulPoin && <p className={styles.pointsTitle}>{found.judulPoin}</p>}
                <ul className={styles.points}>
                  {found.poin.map((butir) => (
                    <li key={butir}>{butir}</li>
                  ))}
                </ul>
              </>
            )}
            {found.deskripsiLengkap.map((paragraf) => (
              <p key={paragraf}>{renderInlineEmphasis(paragraf)}</p>
            ))}
          </div>

          {infoProduk.length > 0 && (
            <aside className={styles.aside} aria-labelledby="informasi-produk">
              <h2 id="informasi-produk" className={styles.asideTitle}>
                Informasi Produk
              </h2>
              <DefinitionList items={infoProduk} />
            </aside>
          )}
        </Container>
      </Section>

      {(tampilkanTabelDosis || found.catatanDosis) && (
        <Section>
          <Container>
            <SectionHeading title="Dosis dan Metode Pemupukan" />
            {tampilkanTabelDosis && found.dosisAnjuran ? (
              <div className={styles.tableWrap}>
                <SpecTable
                  columns={kolomDosis}
                  rows={found.dosisAnjuran}
                  rowKey={(baris) => baris.fase}
                />
              </div>
            ) : (
              <p className={styles.note}>{found.catatanDosis}</p>
            )}
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className={styles.footerNav}>
            <Link href="/agribisnis/produk" className={styles.backLink}>
              ← Semua produk
            </Link>
            <PillButton href={kontakLink.href} variant="solid">
              {kontakLink.label}
            </PillButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
