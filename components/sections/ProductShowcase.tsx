import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialIndex } from "@/components/ui/EditorialIndex";
import { produkList } from "@/content/agribisnis/produk";
import styles from "./ProductShowcase.module.css";

// Product Showcase (DESIGN.md §7): selama foto produk asli belum ada, pakai indeks
// editorial bernomor — bukan kartu placeholder berulang (§8.9). Urutan dan kalimat
// tiap baris = kalimat pembuka halaman produk, CONTENT-VERBATIM.md §E2.
export function ProductShowcase() {
  return (
    <Section>
      <Container>
        <div className={styles.header}>
          <SectionHeading title="Produk" />
          <Link href="/agribisnis/produk" className={styles.link}>
            Ke halaman Produk →
          </Link>
        </div>

        <EditorialIndex
          thumbnailVariant="produk"
          items={produkList.map((produk) => ({
            href: `/agribisnis/produk/${produk.slug}`,
            title: produk.nama,
            deskripsi: produk.deskripsiSingkat,
          }))}
        />
      </Container>
    </Section>
  );
}
