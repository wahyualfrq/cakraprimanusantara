import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kontak",
    description: "Kontak dan lokasi seluruh unit usaha PT Cakra Prima Nusantara.",
    path: "/kontak",
  });
}

export default function KontakPage() {
  return (
    <Section>
      <Container>
        <h1>Kontak</h1>
        {/* TODO: render 5 lokasi dari content/kontak.ts + LocalBusiness JSON-LD per lokasi (STRUCTURE.md §6.2) */}
      </Container>
    </Section>
  );
}
