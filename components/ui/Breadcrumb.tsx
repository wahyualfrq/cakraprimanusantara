import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

/**
 * Trail breadcrumb + JSON-LD BreadcrumbList (STRUCTURE.md §6.2) — satu
 * komponen untuk keduanya supaya tidak ada halaman dalam yang lupa pasang
 * structured data-nya.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schema = breadcrumbSchema(items.map((item) => ({ name: item.label, path: item.href })));

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className={styles.nav}>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className={styles.item}>
                {isLast ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
