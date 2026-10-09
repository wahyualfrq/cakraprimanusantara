import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Chipping Kelapa Sawit",
    description: "Layanan chipping kelapa sawit oleh unit Kontraktor PT Cakra Prima Nusantara.",
    path: "/kontraktor/chipping-kelapa-sawit",
  });
}

export default function ChippingKelapaSawitPage() {
  return (
    <Section>
      <Container>
        <h1>Chipping Kelapa Sawit</h1>
      </Container>
    </Section>
  );
}
