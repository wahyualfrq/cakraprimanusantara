import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Sewa Alat Berat",
    description: "Katalog kategori alat berat yang tersedia untuk disewa.",
    path: "/alat-berat/sewa",
  });
}

export default function SewaAlatBeratPage() {
  return (
    <Section>
      <Container>
        <h1>Sewa Alat Berat</h1>
      </Container>
    </Section>
  );
}
