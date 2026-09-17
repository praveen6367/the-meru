import React from "react";
import { cn } from "../../lib/utils";

export type DividerVariant = "gold-hairline" | "gold-gradient" | "subtle" | "with-motif";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  motif?: React.ReactNode;
}

export function Divider({
  variant = "gold-hairline",
  motif = "✧",
  className,
  ...props
}: DividerProps) {
  if (variant === "gold-gradient") {
    return (
      <div
        className={cn("h-[1px] w-full bg-gradient-to-r from-transparent via-[#C99A28]/45 to-transparent my-6", className)}
        {...props}
      />
    );
  }

  if (variant === "subtle") {
    return (
      <div
        className={cn("h-[1px] w-full bg-deep-charcoal/10 my-4", className)}
        {...props}
      />
    );
  }

  if (variant === "with-motif") {
    return (
      <div className={cn("relative flex items-center justify-center my-8", className)} {...props}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#C99A28]/30" />
        </div>
        <div className="relative bg-sacred-ivory px-3 text-meru-gold text-xs font-sans select-none">
          {motif}
        </div>
      </div>
    );
  }

  // Default: gold hairline
  return (
    <div
      className={cn("h-[1px] w-full bg-[#C99A28]/25 my-6", className)}
      {...props}
    />
  );
}
