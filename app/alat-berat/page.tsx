import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Alat Berat",
    description: "Rental dan penjualan alat berat oleh PT Cakra Prima Nusantara.",
    path: "/alat-berat",
  });
}

export default function AlatBeratPage() {
  return (
    <Section>
      <Container>
        <h1>Alat Berat</h1>
      </Container>
    </Section>
  );
}
