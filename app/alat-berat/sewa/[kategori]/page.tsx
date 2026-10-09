import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ kategori: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  return buildMetadata({
    title: `Sewa ${kategori}`,
    description: `Daftar unit alat berat kategori ${kategori} yang tersedia untuk disewa.`,
    path: `/alat-berat/sewa/${kategori}`,
  });
}

export default async function SewaKategoriPage({ params }: PageProps) {
  const { kategori } = await params;
  return (
    <Section>
      <Container>
        <h1>Sewa {kategori}</h1>
      </Container>
    </Section>
  );
}
