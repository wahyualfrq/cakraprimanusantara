import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Berita",
    description: "Berita dan update gabungan dari seluruh unit usaha PT Cakra Prima Nusantara.",
    path: "/berita",
  });
}

export default function BeritaPage() {
  return (
    <Section>
      <Container>
        <h1>Berita</h1>
      </Container>
    </Section>
  );
}
