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
  /** Nomor besar bergaya tipografis di depan tiap item — pengganti bullet/ikon centang. */
  numbered?: boolean;
  className?: string;
};

/** Daftar "judul tebal + penjelasan" untuk poin berlabel (DESIGN.md §8.11). */
export function DefinitionList({ items, numbered = false, className }: DefinitionListProps) {
  return (
    <dl className={cn(styles.list, className)}>
      {items.map((item, index) => (
        <div key={item.label} className={styles.item}>
          {numbered && (
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <div>
            <dt className={styles.label}>{item.label}</dt>
            {item.description && <dd className={styles.description}>{item.description}</dd>}
          </div>
        </div>
      ))}
    </dl>
  );
}
