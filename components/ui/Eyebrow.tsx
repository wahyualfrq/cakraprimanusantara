import styles from "./Eyebrow.module.css";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: string;
  /** `h2` bila eyebrow sekaligus judul semantik section (mis. intro Tentang di Beranda). */
  as?: "p" | "h2";
  id?: string;
  className?: string;
};

/** Titik hijau + label huruf besar berisi nama section (DESIGN.md §11.2 [T6]). */
export function Eyebrow({ children, as: Tag = "p", id, className }: EyebrowProps) {
  return (
    <Tag id={id} className={cn(styles.eyebrow, className)}>
      {children}
    </Tag>
  );
}
