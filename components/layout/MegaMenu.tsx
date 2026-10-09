import Link from "next/link";
import styles from "./MegaMenu.module.css";
import { cn } from "@/lib/utils";

// Trading cuma 1 halaman flat (tanpa sub-halaman) — jadi baris link biasa di
// bawah grid kolom, BUKAN kolom mega-menu kosong (lihat instruksi navbar).
const columns = [
  {
    title: "Kontraktor",
    href: "/kontraktor",
    links: [
      { label: "Civil Project", href: "/kontraktor/civil-project" },
      { label: "Building Project", href: "/kontraktor/building-project" },
      { label: "Concrete Repair", href: "/kontraktor/concrete-repair" },
      { label: "Mechanical & Electrical", href: "/kontraktor/mechanical-electrical" },
      { label: "Chipping Kelapa Sawit", href: "/kontraktor/chipping-kelapa-sawit" },
    ],
  },
  {
    title: "Alat Berat",
    href: "/alat-berat",
    links: [
      { label: "Sewa Alat", href: "/alat-berat/sewa" },
      { label: "Penjualan Alat", href: "/alat-berat/penjualan" },
    ],
  },
  {
    title: "Agribisnis",
    href: "/agribisnis",
    links: [
      { label: "Produk", href: "/agribisnis/produk" },
      { label: "Riset & Inovasi", href: "/agribisnis/riset-inovasi" },
      { label: "Sertifikasi", href: "/agribisnis/sertifikasi" },
    ],
  },
];

export function MegaMenu() {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.trigger}>
        Unit Usaha
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={cn(styles.panel, styles.panelSolid)}>
        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <Link href={column.href} className={styles.columnTitle}>
                {column.title}
              </Link>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link href="/trading" className={styles.tradingRow}>
          Trading
        </Link>
      </div>
    </div>
  );
}
