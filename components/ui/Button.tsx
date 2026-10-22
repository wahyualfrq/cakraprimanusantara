import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "accent" | "text-link";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  /** `sm` = tinggi 40 px (CTA navbar desktop, DESIGN.md §9.3). */
  size?: "md" | "sm";
  /** Tampilkan panah "→" yang bergeser 4 px saat hover. */
  arrow?: boolean;
  /** Lebar penuh wadah (mis. CTA menu mobile). */
  block?: boolean;
  /** Teks putih untuk varian text-link di atas foto/latar gelap. */
  onDark?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  outline: styles.outline,
  light: styles.light,
  accent: styles.accent,
  "text-link": styles.textLink,
};

/**
 * Satu-satunya sistem tombol (DESIGN.md §8): persegi radius md, hover ganti warna.
 * Varian `accent` dan `light` hanya di atas foto/latar gelap; `text-link` untuk aksi tersier.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  block = false,
  onDark = false,
  className,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    styles.button,
    variantClass[variant],
    size === "sm" && styles.sm,
    block && styles.block,
    onDark && styles.onDark,
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
