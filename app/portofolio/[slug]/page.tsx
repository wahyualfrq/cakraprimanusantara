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
    title: `Detail Proyek: ${slug}`,
    description: `Detail proyek portofolio ${slug}.`,
    path: `/portofolio/${slug}`,
  });
}

export default async function PortofolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Section>
      <Container>
        <h1>Detail Proyek: {slug}</h1>
      </Container>
    </Section>
  );
}
