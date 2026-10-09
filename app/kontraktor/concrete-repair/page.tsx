import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Concrete Repair",
    description: "Layanan concrete repair oleh unit Kontraktor PT Cakra Prima Nusantara.",
    path: "/kontraktor/concrete-repair",
  });
}

export default function ConcreteRepairPage() {
  return (
    <Section>
      <Container>
        <h1>Concrete Repair</h1>
      </Container>
    </Section>
  );
}
