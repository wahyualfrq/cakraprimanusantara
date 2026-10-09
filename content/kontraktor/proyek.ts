export type Proyek = {
  slug: string;
  judul: string;
  kategori: "civil" | "building" | "concrete-repair" | "mechanical-electrical" | "chipping";
  klien?: string;
  lokasi?: string;
  gambar: string;
  ringkasan: string;
};

export const proyekList: Proyek[] = [
  // diisi saat migrasi konten — 18 item dari web lama
];
