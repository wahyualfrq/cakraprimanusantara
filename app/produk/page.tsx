import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialIndex } from "@/components/ui/EditorialIndex";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { kategoriLabel, produkList } from "@/content/agribisnis/produk";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Produk Agribisnis",
    description: "Daftar produk pupuk hayati dan biopestisida: Ostindo, Futricho, Bless, Rizafert, Actifert.",
    path: "/produk",
  });
}

// Daftar Produk (DESIGN.md v0.4 §13.3): tanpa foto produk asli → bukan grid kartu
// bergambar. Produk pertama (Ostindo — "awal sekaligus core business perusahaan",
// CONTENT-VERBATIM.md §E1) tampil sebagai blok unggulan S4; sisanya indeks editorial
// S6, urutan sumber §E2. Kalimat per item = kalimat pembuka halaman produk, verbatim.
export default function ProdukAgribisnisPage() {
  const [unggulan, ...lainnya] = produkList;

  return (
    <>
      <PageHeader
        variant="photo"
        photoSrc="/images/gambar-10.png"
        photoPosition="center 45%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/produk" },
        ]}
        title="Produk"
        description="Rangkaian produk penyubur tanah, pupuk hayati, dan biopestisida ramah lingkungan."
      />

      <Section aria-label="Daftar produk">
        <Container className={styles.stack}>
          <Reveal>
            <Link href={`/produk/${unggulan.slug}`} className={styles.featured}>
              <span className={styles.featuredPattern} aria-hidden="true" />
              <span className={styles.featuredTop}>
                <span className={styles.label}>{kategoriLabel[unggulan.kategori]}</span>
                <span className={styles.numeral} aria-hidden="true">
                  01
                </span>
              </span>
              <span className={styles.featuredBody}>
                <span className={styles.featuredName}>{unggulan.nama}</span>
                <span className={styles.featuredDesc}>{unggulan.deskripsiSingkat}</span>
                <span className={styles.featuredMore}>
                  Selengkapnya <span className={styles.arrow} aria-hidden="true"></span>
                </span>
              </span>
            </Link>
          </Reveal>

          <EditorialIndex
            start={2}
            thumbnailVariant="produk"
            items={lainnya.map((produk) => ({
              href: `/produk/${produk.slug}`,
              title: produk.nama,
              meta: kategoriLabel[produk.kategori],
              deskripsi: produk.deskripsiSingkat,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
