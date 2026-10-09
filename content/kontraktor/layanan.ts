export type Layanan = {
  slug: string;
  nama: string;
  kategori: "civil" | "building" | "concrete-repair" | "mechanical-electrical" | "chipping";
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  gambar: string;
};

export const layananList: Layanan[] = [
  // diisi saat migrasi konten — 5 layanan dari web lama
];
