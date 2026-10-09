import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Penjualan Alat Berat",
    description: "Katalog alat berat yang tersedia untuk dijual.",
    path: "/alat-berat/penjualan",
  });
}

export default function PenjualanAlatBeratPage() {
  return (
    <Section>
      <Container>
        <h1>Penjualan Alat Berat</h1>
      </Container>
    </Section>
  );
}
