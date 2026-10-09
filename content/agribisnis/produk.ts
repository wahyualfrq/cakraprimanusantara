export type DosisTable = {
  tanaman: string;
  dosis: string;
  keterangan?: string;
};

export type Produk = {
  slug: string;
  nama: string;
  kategori: "penyubur-tanah" | "bio-pestisida" | "pupuk-cair" | "mikoriza" | "bio-activator";
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  gambar: string;
  dosisAnjuran?: DosisTable[];
  sertifikasi?: string[];
};

export const produkList: Produk[] = [
  // diisi saat migrasi konten — Ostindo, Futricho, Bless NPK, Bless Cair,
  // Rizafert, Actifert
];
