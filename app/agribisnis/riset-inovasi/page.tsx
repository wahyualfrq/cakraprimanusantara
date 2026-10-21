import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Riset & Inovasi",
    // INTERIM — belum disetujui (D2). Kalimat pertama CONTENT-VERBATIM.md §E3 (typo "tana" diperbaiki — TYPO-LOG.md).
    description:
      "OSTINDO merupakan suatu produk penyubur tanah hayati dengan formula unggulan yang mengkombinasikan bahan organik berkualitas dengan mikroba terseleksi sehingga berperan dalam meningkatkan kehidupan tanah secara alami melalui proses biologi tanah.",
    path: "/agribisnis/riset-inovasi",
    noindex: true,
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
