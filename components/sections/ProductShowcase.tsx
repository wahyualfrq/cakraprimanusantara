import { Section } from "@/components/ui/Section";
import { kategoriLabel, produkList } from "@/content/agribisnis/produk";
import { ProductCarousel } from "./ProductCarousel";

// Produk di Beranda — karusel kartu tinggi S2 (DESIGN.md §13.1 [T7]). Urutan sumber
// dan kalimat tiap kartu = kalimat pembuka halaman produk, CONTENT-VERBATIM.md §E2.
// Latar kartu = pola, bukan foto: foto produk asli belum tersedia (§12.1).
export function ProductShowcase() {
  return (
    <Section aria-labelledby="produk-judul">
      <ProductCarousel
        title="Produk Ostindo"
        accent="Ostindo"
        items={produkList.map((produk) => ({
          href: `/produk/${produk.slug}`,
          nama: produk.nama,
          kategori: kategoriLabel[produk.kategori],
          deskripsi: produk.deskripsiSingkat,
        }))}
      />
    </Section>
  );
}
