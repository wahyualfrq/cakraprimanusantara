import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata({
    title: `Produk: ${slug}`,
    description: `Detail produk agribisnis ${slug}: deskripsi, dosis anjuran, dan sertifikasi.`,
    path: `/agribisnis/produk/${slug}`,
  });
}

export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Section>
      <Container>
        <h1>Produk: {slug}</h1>
        {/* TODO: Product JSON-LD (STRUCTURE.md §6.2) */}
      </Container>
    </Section>
  );
}
