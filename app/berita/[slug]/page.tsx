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
    title: `Berita: ${slug}`,
    description: `Detail artikel berita ${slug}.`,
    path: `/berita/${slug}`,
  });
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Section>
      <Container>
        <h1>Berita: {slug}</h1>
      </Container>
    </Section>
  );
}
