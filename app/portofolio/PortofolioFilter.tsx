"use client";

import { useState } from "react";
import { proyekList, type KategoriProyek } from "@/content/kontraktor/proyek";
import styles from "./page.module.css";

const LABEL: Record<KategoriProyek, string> = {
  "chipping": "Chipping",
  "pekerjaan-tanah-jalan": "Tanah & Jalan",
  "bangunan": "Bangunan",
  "concrete-repair": "Concrete Repair",
  "mekanikal": "Mekanikal",
  "alat-berat": "Alat Berat",
  "sipil": "Sipil",
};

const ALL_CATEGORIES = Object.keys(LABEL) as KategoriProyek[];

export function PortofolioFilter() {
  const [active, setActive] = useState<KategoriProyek | "semua">("semua");

  const filtered =
    active === "semua"
      ? proyekList
      : proyekList.filter((p) => p.kategori === active);

  const countByKategori = (k: KategoriProyek) =>
    proyekList.filter((p) => p.kategori === k).length;

  return (
    <div className={styles.filterWrap}>
      {/* Tab bar — Kontrol teks sederhana dengan indikator garis bawah aktif, bukan badge/pill */}
      <div className={styles.tabBar} role="tablist" aria-label="Filter kategori proyek">
        <button
          role="tab"
          aria-selected={active === "semua"}
          className={`${styles.tab} ${active === "semua" ? styles.tabActive : ""}`}
          onClick={() => setActive("semua")}
        >
          Semua
          <span className={styles.tabCount}>({proyekList.length})</span>
        </button>
        {ALL_CATEGORIES.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={active === k}
            className={`${styles.tab} ${active === k ? styles.tabActive : ""}`}
            onClick={() => setActive(k)}
          >
            {LABEL[k]}
            <span className={styles.tabCount}>({countByKategori(k)})</span>
          </button>
        ))}
      </div>

      {/* Project list — 23 proyek konstruksi dipertahankan utuh */}
      <ol className={styles.proyekList} aria-live="polite">
        {filtered.map((proyek, index) => (
          <li key={proyek.slug} className={styles.proyekItem}>
            <span className={styles.proyekIndex} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.proyekBody}>
              <span className={styles.proyekJudul}>{proyek.judul}</span>
              <div className={styles.proyekMeta}>
                {/* Kategori sebagai teks biasa tanpa wadah badge/pill */}
                <span className={styles.proyekKategori}>
                  {LABEL[proyek.kategori]}
                </span>
                {/* Informasi verifikasi sebagai teks biasa tanpa badge */}
                {proyek.kategoriPerluVerifikasi && (
                  <span
                    className={styles.statusVerifikasi}
                    title="Kategori usulan berdasarkan judul proyek, belum dikonfirmasi klien"
                  >
                    (Kategori dalam verifikasi)
                  </span>
                )}
                {proyek.klien && (
                  <span className={styles.proyekMetaItem}>
                    {proyek.klien}
                  </span>
                )}
                {proyek.lokasi && (
                  <span className={styles.proyekMetaItem}>
                    {proyek.lokasi}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
