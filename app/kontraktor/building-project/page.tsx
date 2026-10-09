import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Building Project",
    description: "Layanan building project oleh unit Kontraktor PT Cakra Prima Nusantara.",
    path: "/kontraktor/building-project",
  });
}

export default function BuildingProjectPage() {
  return (
    <Section>
      <Container>
        <h1>Building Project</h1>
      </Container>
    </Section>
  );
}
