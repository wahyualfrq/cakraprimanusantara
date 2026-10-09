import type { ReactNode } from "react";
import styles from "./SpecTable.module.css";
import { cn } from "@/lib/utils";

export type SpecColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
};

type SpecTableProps<T> = {
  columns: SpecColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  className?: string;
};

/**
 * Tabel spesifikasi responsif — stacked di mobile lewat CSS (data-label per
 * sel), bukan markup ganda. DESIGN.md §8.11 "Daftar unit alat".
 */
export function SpecTable<T>({ columns, rows, rowKey, className }: SpecTableProps<T>) {
  return (
    <div className={cn(styles.wrap, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td key={col.key} data-label={col.header}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
