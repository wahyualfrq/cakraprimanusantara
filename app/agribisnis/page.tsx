import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Agribisnis",
    // INTERIM — belum disetujui (D2). Halaman stub noindex; tidak ada kalimat sumber, label faktual pendek.
    description: "Agribisnis PT Anugerah Mustika Ostindo.",
    path: "/agribisnis",
    noindex: true,
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
