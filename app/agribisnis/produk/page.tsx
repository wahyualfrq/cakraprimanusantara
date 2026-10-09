import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Produk Agribisnis",
    description: "Daftar produk pupuk hayati dan biopestisida: Ostindo, Futricho, Bless, Rizafert, Actifert.",
    path: "/agribisnis/produk",
  });
}

export default function ProdukAgribisnisPage() {
  return (
    <Section>
      <Container>
        <h1>Produk Agribisnis</h1>
      </Container>
    </Section>
  );
}
