import type { ReactNode } from "react";
import styles from "./DefinitionList.module.css";
import { cn } from "@/lib/utils";

export type DefinitionItem = {
  label: string;
  /** Kosongkan kalau sumber cuma punya label tanpa elaborasi — jangan dikarang. */
  description?: ReactNode;
};

type DefinitionListProps = {
  items: DefinitionItem[];
  /** Nomor tipografis di depan tiap item — pengganti bullet/ikon centang. */
  numbered?: boolean;
  /** `grid` = 3 kolom ≥ 640 px (fakta); `stack` = satu kolom (aside). */
  layout?: "stack" | "grid";
  className?: string;
};

/** Daftar "label + nilai" untuk fakta berlabel (DESIGN.md §11.2). */
export function DefinitionList({ items, numbered = false, layout = "stack", className }: DefinitionListProps) {
  return (
    <dl className={cn(styles.list, styles[layout], className)}>
      {items.map((item, index) => (
        // <div> di dalam <dl> hanya boleh berisi <dt>/<dd> (axe: definition-list,
        // dlitem) — nomor dekoratif ikut di dalam <dt>.
        <div key={item.label} className={cn(styles.item, numbered && styles.itemNumbered)}>
          <dt className={styles.label}>
            {numbered && (
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            {item.label}
          </dt>
          {item.description && <dd className={styles.description}>{item.description}</dd>}
        </div>
      ))}
    </dl>
  );
}
