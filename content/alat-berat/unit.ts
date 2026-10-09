export type UnitAlat = {
  slug: string;
  nama: string;
  kategoriSlug: string;
  brand: string;
  spesifikasi?: string;
  gambar: string;
  tipe: "sewa" | "penjualan";
};

export const unitAlatList: UnitAlat[] = [
  // diisi saat migrasi konten — daftar unit alat per kategori
];
