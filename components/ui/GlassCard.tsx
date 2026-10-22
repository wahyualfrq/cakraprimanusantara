import type { ElementType, ReactNode } from "react";
import styles from "./GlassCard.module.css";
import { cn } from "@/lib/utils";

type GlassVariant = "light" | "tinted";
type GlassRadius = "lg" | "xl" | "full";

type GlassCardProps = {
  children: ReactNode;
  variant?: GlassVariant;
  radius?: GlassRadius;
  as?: ElementType;
  className?: string;
};

/**
 * Kontainer liquid glass — hanya di atas foto, maks. satu per section (DESIGN.md §11.5);
 * varian `solid` dihentikan di v0.4. Token warna/blur/shadow WAJIB dari --cpn-glass-*,
 * tidak ada rgba/backdrop-filter manual di luar module.css ini.
 */
export function GlassCard({
  children,
  variant = "light",
  radius = "lg",
  as: Tag = "div",
  className,
}: GlassCardProps) {
  return (
    <Tag className={cn(styles.card, styles[variant], styles[`radius-${radius}`], className)}>
      {children}
    </Tag>
  );
}
