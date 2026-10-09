export type Brand = {
  slug: string;
  nama: string;
  logo: string;
  deskripsi?: string;
  website?: string;
};

export const brandList: Brand[] = [
  // diisi saat migrasi konten — 10 brand distributor (Jotun, Eneos, GForce
  // Batteries, Massiv Batteries, LiuGong, HEO, Borgari, Conch, R-M, BASF)
];
