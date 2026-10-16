import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { kategoriAlatList } from "@/content/alat-berat/kategori";

type PageProps = {
  params: Promise<{ kategori: string }>;
};

/** Dibutuhkan agar dynamic route bisa di-statically generated (output: export). */
export function generateStaticParams() {
  return kategoriAlatList.map((k) => ({ kategori: k.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  const found = kategoriAlatList.find((k) => k.slug === kategori);
  if (!found) return {};

  return buildMetadata({
    title: `Sewa ${found.nama}`,
    description: `Daftar unit alat berat kategori ${found.nama} yang tersedia untuk disewa di Palembang dan sekitarnya.`,
    path: `/alat-berat/sewa/${kategori}`,
    noindex: true,
  });
}

export default async function SewaKategoriPage({ params }: PageProps) {
  const { kategori } = await params;
  const found = kategoriAlatList.find((k) => k.slug === kategori);
  if (!found) notFound();

  return (
    <Section>
      <Container>
        <h1>Sewa {found.nama}</h1>
      </Container>
    </Section>
  );
}
