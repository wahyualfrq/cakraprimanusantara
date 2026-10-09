import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Mechanical & Electrical",
    description: "Layanan mechanical & electrical oleh unit Kontraktor PT Cakra Prima Nusantara.",
    path: "/kontraktor/mechanical-electrical",
  });
}

export default function MechanicalElectricalPage() {
  return (
    <Section>
      <Container>
        <h1>Mechanical &amp; Electrical</h1>
      </Container>
    </Section>
  );
}
