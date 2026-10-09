export type KategoriAlat = {
  slug: string;
  nama: string;
  deskripsi: string;
  gambar: string;
};

export const kategoriAlatList: KategoriAlat[] = [
  // diisi saat migrasi konten — Excavator, Bulldozer, Motor Grader, Vibro,
  // Wheel Loader, Dump Truck, Forklift, Pontoon, Compressor
];
