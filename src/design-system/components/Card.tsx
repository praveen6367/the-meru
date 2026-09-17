import React from "react";
import { cn } from "../../lib/utils";

export type CardVariant = "product" | "editorial" | "informational" | "impact" | "collection";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  product:
    "bg-transparent border border-deep-charcoal/10 rounded-[8px] hover:border-meru-gold/40 hover:shadow-subtle",
  editorial:
    "bg-sacred-ivory border border-deep-charcoal/10 rounded-[10px] shadow-card",
  informational:
    "bg-warm-sand/40 border border-deep-charcoal/10 rounded-[8px]",
  impact:
    "bg-surface-3 border border-meru-gold/20 rounded-[10px] shadow-subtle",
  collection:
    "bg-sacred-ivory border border-deep-charcoal/10 rounded-[12px] overflow-hidden group hover:shadow-hover",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-3 sm:p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8 md:p-10",
};

export function Card({
  variant = "editorial",
  padding = "md",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        variantStyles[variant],
        paddingStyles[padding],
        interactive && "cursor-pointer hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
