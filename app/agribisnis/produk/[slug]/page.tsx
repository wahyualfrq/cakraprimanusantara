import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DefinitionList, type DefinitionItem } from "@/components/ui/DefinitionList";
import { SpecTable, type SpecColumn } from "@/components/ui/SpecTable";
import { buildMetadata } from "@/lib/seo/metadata";
import { renderInlineEmphasis } from "@/lib/text";
import { produkList, type BarisDosis } from "@/content/agribisnis/produk";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Dibutuhkan agar dynamic route bisa di-statically generated (output: export). */
export function generateStaticParams() {
  return produkList.map((p) => ({ slug: p.slug }));
}

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
// fakta final. Hanya komponen yang sudah ada; tampilan disempurnakan di V3.
export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const found = produkList.find((p) => p.slug === slug);
  if (!found) notFound();

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

  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/agribisnis/produk" },
          { label: found.nama, href: `/agribisnis/produk/${found.slug}` },
        ]}
        title={found.nama}
        description={found.deskripsiSingkat}
      />

      {(found.poin?.length || found.deskripsiLengkap.length > 0) && (
        <Section>
          <Container>
            {found.poin && found.poin.length > 0 && (
              <ul>
                {found.poin.map((butir) => (
                  <li key={butir}>{butir}</li>
                ))}
              </ul>
            )}
            {found.deskripsiLengkap.map((paragraf) => (
              <p key={paragraf}>{renderInlineEmphasis(paragraf)}</p>
            ))}
          </Container>
        </Section>
      )}

      {infoProduk.length > 0 && (
        <Section>
          <Container>
            <SectionHeading title="Informasi Produk" />
            <DefinitionList items={infoProduk} />
          </Container>
        </Section>
      )}

      {(tampilkanTabelDosis || found.catatanDosis) && (
        <Section>
          <Container>
            <SectionHeading
              title="Dosis dan Metode Pemupukan"
              description={tampilkanTabelDosis ? undefined : found.catatanDosis}
            />
            {tampilkanTabelDosis && found.dosisAnjuran && (
              <SpecTable
                columns={kolomDosis}
                rows={found.dosisAnjuran}
                rowKey={(baris) => baris.fase}
              />
            )}
          </Container>
        </Section>
      )}
      {/* TODO: Product JSON-LD tanpa harga/rating (STRUCTURE.md §6.2) — V3/Tahap S. */}
    </>
  );
}
