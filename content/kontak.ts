export type Lokasi = {
  slug: string;
  nama: string;
  jenis: "kantor-pusat" | "kantor-operasional" | "workshop" | "pabrik" | "office";
  alamat: string;
  telepon?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
};

export const lokasiList: Lokasi[] = [
  // diisi saat migrasi konten — 5 lokasi: HO Palembang, Kantor Operasional
  // Palembang, Workshop/Pool Palembang, Office Jakarta, Pabrik Tangerang
];
