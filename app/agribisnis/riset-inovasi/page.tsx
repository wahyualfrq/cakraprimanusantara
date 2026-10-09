import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Riset & Inovasi",
    description: "Riset, inovasi, dan mitra riset unit Agribisnis PT Cakra Prima Nusantara.",
    path: "/agribisnis/riset-inovasi",
  });
}

export default function RisetInovasiPage() {
  return (
    <Section>
      <Container>
        <h1>Riset &amp; Inovasi</h1>
      </Container>
    </Section>
  );
}
