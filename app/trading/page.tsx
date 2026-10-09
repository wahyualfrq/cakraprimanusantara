import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Trading",
    description:
      "Distribusi material, cat, oli, dan baterai industrial oleh PT Cakra Prima Nusantara.",
    path: "/trading",
  });
}

export default function TradingPage() {
  return (
    <Section>
      <Container>
        <h1>Trading</h1>
        {/* TODO: deskripsi unit Trading belum ada copy di sumber lama — PRD.md §11 */}
      </Container>
    </Section>
  );
}
