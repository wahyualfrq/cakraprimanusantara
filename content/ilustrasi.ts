// Ilustrasi sementara (keputusan D4) — satu sumber src + alt per gambar, dipakai
// konsisten di semua halaman. Bukan dokumentasi kegiatan: alt diawali
// "Ilustrasi", tanpa lokasi, lembaga, atau tanggal, dan tidak diberi caption.
// Alt menggambarkan isi gambar yang terlihat, bukan konteks artikel/halaman.

export type Ilustrasi = {
  src: string;
  alt: string;
};

export const ilustrasi = {
  /** public/images/gambar-4.png — petani di kebun kelapa sawit dengan ladang di latar. */
  kebunSawit: {
    src: "/images/gambar-4.png",
    alt: "Ilustrasi kebun kelapa sawit dan lahan tanaman pertanian",
  },
  /** public/images/gambar-9.png — dua orang berjas laboratorium mengamati bibit dalam pot. */
  laboratorium: {
    src: "/images/gambar-9.png",
    alt: "Ilustrasi pengamatan bibit tanaman dalam pot di laboratorium",
  },
  /** public/images/gambar-11.png — dua orang memeriksa bibit tanaman di rumah kaca. */
  rumahKaca: {
    src: "/images/gambar-11.png",
    alt: "Ilustrasi pengamatan bibit tanaman di rumah kaca",
  },
  /** public/images/gambar-12.png — piala, kemasan, dan butiran pupuk di atas meja. */
  pialaPupuk: {
    src: "/images/gambar-12.png",
    alt: "Ilustrasi piala penghargaan dan produk pupuk",
  },
} satisfies Record<string, Ilustrasi>;
