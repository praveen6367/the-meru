import React from "react";
import { cn } from "../../lib/utils";

export type BadgeVariant = "sale" | "new" | "bestseller" | "limited" | "handcrafted" | "ritual" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  sale: "bg-terracotta text-white border border-terracotta",
  new: "bg-deep-charcoal text-sacred-ivory border border-deep-charcoal",
  bestseller: "bg-meru-gold text-deep-charcoal font-bold border border-[#B88A20]/40",
  limited: "bg-surface-card text-earth border border-meru-gold/40",
  handcrafted: "bg-botanical text-white border border-botanical",
  ritual: "bg-warm-sand/80 text-deep-charcoal border border-deep-charcoal/20",
  outline: "bg-transparent text-deep-charcoal border border-deep-charcoal/20",
};

const defaultLabels: Record<BadgeVariant, string> = {
  sale: "SALE",
  new: "NEW",
  bestseller: "BESTSELLER",
  limited: "LIMITED",
  handcrafted: "HANDCRAFTED",
  ritual: "RITUAL",
  outline: "FEATURED",
};

export function Badge({
  variant = "ritual",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  const content = children || defaultLabels[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-sans uppercase font-medium tracking-widest transition-colors select-none",
        size === "sm" ? "text-[10px] px-2 py-0.5 rounded-[3px]" : "text-xs px-2.5 py-1 rounded-[4px]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {content}
    </span>
  );
}
