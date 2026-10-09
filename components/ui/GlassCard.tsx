import type { ElementType, ReactNode } from "react";
import styles from "./GlassCard.module.css";
import { cn } from "@/lib/utils";

type GlassVariant = "light" | "tinted" | "solid";
type GlassRadius = "lg" | "xl" | "full";

type GlassCardProps = {
  children: ReactNode;
  variant?: GlassVariant;
  radius?: GlassRadius;
  as?: ElementType;
  className?: string;
};

/**
 * Kontainer liquid glass generik — token warna/blur/shadow WAJIB dari
 * DESIGN.md §5 (--cpn-glass-*), tidak ada rgba/backdrop-filter manual di
 * luar module.css ini.
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
