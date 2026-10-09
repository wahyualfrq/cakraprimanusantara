import styles from "./StatBadge.module.css";

type StatBadgeProps = {
  value: string;
  label: string;
};

/** Isi konten untuk floating stat card di hero — 1 angka besar + label pendek (DESIGN.md §7). */
export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
