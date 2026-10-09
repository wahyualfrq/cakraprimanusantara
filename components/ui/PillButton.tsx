import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./PillButton.module.css";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline-glass" | "glass";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type PillButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type PillButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type PillButtonProps = PillButtonAsButton | PillButtonAsLink;

/**
 * Tombol pill (radius-full) — dipakai untuk CTA hero & section penutup.
 * Varian "glass"/"outline-glass" untuk di atas foto, "solid" untuk di atas
 * background terang. Semua warna lewat var(--cpn-*), lihat DESIGN.md §7.
 */
export function PillButton({ children, variant = "solid", className, href, ...rest }: PillButtonProps) {
  const classes = cn(styles.pill, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
