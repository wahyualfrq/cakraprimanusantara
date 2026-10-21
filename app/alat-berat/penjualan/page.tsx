import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  // Route dinonaktifkan (keputusan D7) — metadata lama tidak ikut diserialisasi.
  notFound();
  return buildMetadata({
    title: "Penjualan Alat Berat",
    description: "Katalog alat berat yang tersedia untuk dijual.",
    path: "/alat-berat/penjualan",
    noindex: true,
  });
}

export default function PenjualanAlatBeratPage() {
  // Route dinonaktifkan (keputusan D7) — notFound() di page juga, supaya konten
  // tidak ikut diserialisasi ke payload RSC. Kode di bawah dipertahankan.
  notFound();
  return (
    <Section>
      <Container>
        <h1>Penjualan Alat Berat</h1>
      </Container>
    </Section>
  );
}
