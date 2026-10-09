import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Sertifikasi",
    description: "Sertifikasi produk unit Agribisnis PT Cakra Prima Nusantara (SNI, dll).",
    path: "/agribisnis/sertifikasi",
  });
}

export default function SertifikasiPage() {
  return (
    <Section>
      <Container>
        <h1>Sertifikasi</h1>
      </Container>
    </Section>
  );
}
