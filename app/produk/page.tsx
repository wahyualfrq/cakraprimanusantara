import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialIndex } from "@/components/ui/EditorialIndex";
import { buildMetadata } from "@/lib/seo/metadata";
import { produkList } from "@/content/agribisnis/produk";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Produk Agribisnis",
    description: "Daftar produk pupuk hayati dan biopestisida: Ostindo, Futricho, Bless, Rizafert, Actifert.",
    path: "/produk",
  });
}

// Indeks editorial bernomor (DESIGN.md §8.11), urutan sumber CONTENT-VERBATIM.md §E2.
// Kalimat per baris = kalimat pembuka halaman produk, verbatim. Hanya komponen
// yang sudah ada — tampilan disempurnakan di V3.
export default function ProdukAgribisnisPage() {
  return (
    <>
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/produk" },
        ]}
        title="Produk"
      />

      <Section>
        <Container>
          <EditorialIndex
            thumbnailVariant="produk"
            items={produkList.map((produk) => ({
              href: `/produk/${produk.slug}`,
              title: produk.nama,
              deskripsi: produk.deskripsiSingkat,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
