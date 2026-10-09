import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Agribisnis",
    description: "Produk pupuk hayati dan biopestisida oleh unit Agribisnis PT Cakra Prima Nusantara.",
    path: "/agribisnis",
  });
}

export default function AgribisnisPage() {
  return (
    <Section>
      <Container>
        <h1>Agribisnis</h1>
      </Container>
    </Section>
  );
}
