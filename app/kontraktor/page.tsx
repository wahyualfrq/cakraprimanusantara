import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kontraktor",
    description:
      "Layanan kontraktor umum: civil project, building project, concrete repair, mechanical & electrical, dan chipping kelapa sawit.",
    path: "/kontraktor",
  });
}

export default function KontraktorPage() {
  return (
    <Section>
      <Container>
        <h1>Kontraktor</h1>
      </Container>
    </Section>
  );
}
