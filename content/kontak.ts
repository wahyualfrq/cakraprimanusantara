export type KontakItem = {
  tipe: "telepon" | "whatsapp" | "fax" | "instagram";
  nilai: string;
  /** Nama PIC kalau disebut di sumber, mis. "Bpk. Sukartono". */
  label?: string;
  /** true kalau item ini dibaca dari ikon/screenshot, bukan teks jelas (CONTENT-SOURCE.md §2). */
  perluVerifikasi?: boolean;
};

export type Lokasi = {
  slug: string;
  nama: string;
  jenis: "kantor-pusat" | "kantor-operasional" | "workshop" | "pabrik" | "office";
  alamat: string;
  kontak?: KontakItem[];
  email?: string;
  latitude?: number;
  longitude?: number;
  unitUsaha: Array<"kontraktor" | "alat-berat" | "trading" | "agribisnis">;
};

/** Hanya berlaku untuk lokasi Cakra (Kontraktor/Alat Berat/Trading) — CONTENT-SOURCE.md §2. */
export const jamOperasionalCakra = "Senin - Jumat, 09.00 - 17.00";

// Sumber: CONTENT-SOURCE.md §2. Koordinat peta [GAP] — tidak ditebak, tautan
// lokasi dibangun dari teks alamat (lihat lib/whatsapp.ts untuk pola serupa
// pada tautan WhatsApp; tautan Maps dibangun di halaman /kontak, Fase 8).
export const lokasiList: Lokasi[] = [
  {
    slug: "kantor-pusat-palembang",
    nama: "Kantor Pusat Palembang",
    jenis: "kantor-pusat",
    alamat: "Jl. Veteran No. 318, Kel. Kuto Batu, Kec. Ilir Timur II, Kota Palembang 30111, Sumatera Selatan",
    email: "info@cakraindopratama.com",
    unitUsaha: ["kontraktor", "alat-berat", "trading"],
  },
  {
    slug: "kantor-operasional-palembang",
    nama: "Kantor Operasional Palembang",
    jenis: "kantor-operasional",
    alamat:
      "Komp. Griya Maju, Jl. Sako Baru Blok A No. 1-8, Rt. 07 Rw. 03, Kel. Sako Baru, Kec. Sako, Palembang 30165",
    kontak: [
      { tipe: "telepon", nilai: "0711-824980" },
      { tipe: "fax", nilai: "0711-819821", perluVerifikasi: true },
      { tipe: "whatsapp", nilai: "0811-783-675", label: "Bpk. Sukartono" },
      { tipe: "whatsapp", nilai: "0813-6891-8599", label: "Ibu Ayni" },
    ],
    unitUsaha: ["kontraktor", "alat-berat", "trading"],
  },
  {
    slug: "workshop-pool-palembang",
    nama: "Workshop/Pool Palembang",
    jenis: "workshop",
    alamat: "Jl. Talang Keramat Raya No. 77 RT.08, Kel. Talang Keramat, Kec. Talang Kelapa, Banyuasin, Palembang",
    email: "info@cakraindopratama.com",
    unitUsaha: ["alat-berat"],
  },
  {
    slug: "office-agribisnis-jakarta",
    nama: "Office Agribisnis Jakarta",
    jenis: "office",
    alamat: "Kompleks Bojong Indah, Jl. Pakis Raya 88 B, Jakarta Barat 11740",
    kontak: [
      { tipe: "whatsapp", nilai: "+62 819 2922 6666" },
      { tipe: "telepon", nilai: "+62 21 580 9964" },
      { tipe: "fax", nilai: "+62 21 580 9965" },
      { tipe: "instagram", nilai: "@pupukkebun" },
    ],
    email: "ostindo_mail@yahoo.com",
    unitUsaha: ["agribisnis"],
  },
  {
    slug: "pabrik-agribisnis-tangerang",
    nama: "Pabrik Agribisnis Tangerang",
    jenis: "pabrik",
    alamat: "Waru Doyong 59, Jl. Raya Balaraja-Serang Km 35, Jayanti, Tangerang, Banten",
    // Kontak ikut lokasi Office Jakarta — sumber tidak punya kontak terpisah untuk pabrik.
    unitUsaha: ["agribisnis"],
  },
];
