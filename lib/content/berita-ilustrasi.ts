import { ilustrasi, type Ilustrasi } from "@/content/ilustrasi";

/**
 * Ilustrasi sementara (D4) per artikel terbit — satu sumber untuk daftar Berita, Beranda,
 * dan detail artikel. Bukan dokumentasi kegiatan: tanpa caption, lokasi, atau tanggal.
 * DESIGN.md §12.6 (ilustrasi di samping berita bertanggal) masih OPEN.
 */
export const ilustrasiBerita: Record<string, Ilustrasi> = {
  "kerjasama-brin-teknologi-pestisida": ilustrasi.laboratorium,
  "kerjasama-dengan-lipi": ilustrasi.rumahKaca,
};
