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
      {/* Tab bar */}
      <div className={styles.tabBar} role="tablist" aria-label="Filter kategori proyek">
        <button
          role="tab"
          aria-selected={active === "semua"}
          className={`${styles.tab} ${active === "semua" ? styles.tabActive : ""}`}
          onClick={() => setActive("semua")}
        >
          Semua
          <span className={styles.tabCount}>{proyekList.length}</span>
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
            <span className={styles.tabCount}>{countByKategori(k)}</span>
          </button>
        ))}
      </div>

      {/* Project list */}
      <ol className={styles.proyekList} aria-live="polite">
        {filtered.map((proyek, index) => (
          <li key={proyek.slug} className={styles.proyekItem}>
            <span className={styles.proyekIndex} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.proyekBody}>
              <span className={styles.proyekJudul}>{proyek.judul}</span>
              <div className={styles.proyekMeta}>
                <span className={styles.proyekKategori}>
                  {LABEL[proyek.kategori]}
                </span>
                {proyek.kategoriPerluVerifikasi && (
                  <span
                    className={styles.verifikasiBadge}
                    title="Kategori usulan berdasarkan judul proyek, belum dikonfirmasi klien"
                  >
                    <span aria-hidden="true">* </span>Perlu Verifikasi
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
