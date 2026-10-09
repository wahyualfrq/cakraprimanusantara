import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Portofolio",
    description: "Showcase proyek gabungan dari seluruh unit usaha PT Cakra Prima Nusantara.",
    path: "/portofolio",
  });
}

export default function PortofolioPage() {
  return (
    <Section>
      <Container>
        <h1>Portofolio</h1>
      </Container>
    </Section>
  );
}
