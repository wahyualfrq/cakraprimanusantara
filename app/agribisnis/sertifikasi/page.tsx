import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Sertifikasi",
    // INTERIM — belum disetujui (D2). Halaman stub noindex; tidak ada kalimat sumber, label faktual pendek.
    description: "Sertifikat dan penghargaan PT Anugerah Mustika Ostindo.",
    path: "/agribisnis/sertifikasi",
    noindex: true,
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
