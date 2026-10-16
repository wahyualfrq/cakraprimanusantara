import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { produkList } from "@/content/agribisnis/produk";

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

export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const found = produkList.find((p) => p.slug === slug);
  if (!found) notFound();

  return (
    <Section>
      <Container>
        <h1>{found.nama}</h1>
        {/* TODO: Product JSON-LD (STRUCTURE.md §6.2) */}
      </Container>
    </Section>
  );
}
