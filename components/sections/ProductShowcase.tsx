import { Section } from "@/components/ui/Section";
import { kategoriLabel, produkList } from "@/content/agribisnis/produk";
import { ProductCarousel } from "./ProductCarousel";

// Produk di Beranda — karusel kartu S2 (DESIGN.md §13.1). Urutan sumber
// dan kalimat tiap kartu = kalimat pembuka halaman produk, CONTENT-VERBATIM.md §E2.
// Menampilkan packshot produk resmi dan terverifikasi dari public/produk/.
export function ProductShowcase() {
  return (
    <Section aria-labelledby="produk-judul">
      <ProductCarousel
        title="Produk Unggulan"
        accent="Ostindo"
        items={produkList.map((produk) => ({
          href: `/produk/${produk.slug}`,
          nama: produk.nama,
          kategori: kategoriLabel[produk.kategori],
          deskripsi: produk.deskripsiSingkat,
          gambar: produk.gambar,
        }))}
      />
    </Section>
  );
}
