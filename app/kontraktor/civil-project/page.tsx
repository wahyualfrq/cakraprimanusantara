import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Civil Project",
    description: "Layanan civil project oleh unit Kontraktor PT Cakra Prima Nusantara.",
    path: "/kontraktor/civil-project",
  });
}

export default function CivilProjectPage() {
  return (
    <Section>
      <Container>
        <h1>Civil Project</h1>
      </Container>
    </Section>
  );
}
