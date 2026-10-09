export type Sertifikasi = {
  slug: string;
  nama: string;
  penerbit: string;
  tahun?: number;
  gambar: string;
  deskripsi?: string;
};

export const sertifikasiList: Sertifikasi[] = [
  // diisi saat migrasi konten — SNI, SNI Terbaru, Penghargaan Alih Teknologi LIPI
];
