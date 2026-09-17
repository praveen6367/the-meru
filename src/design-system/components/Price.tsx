import React from "react";
import { cn } from "../../lib/utils";

export interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number | string;
  compareAtAmount?: number | string | null;
  currency?: string;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
}

export function Price({
  amount,
  compareAtAmount,
  currency = "₹",
  size = "md",
  showSavings = true,
  className,
  ...props
}: PriceProps) {
  const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.]/g, "")) : amount;
  const numericCompareAt =
    typeof compareAtAmount === "string"
      ? parseFloat(compareAtAmount.replace(/[^0-9.]/g, ""))
      : compareAtAmount;

  const hasDiscount =
    numericCompareAt && !isNaN(numericCompareAt) && numericCompareAt > (numericAmount || 0);

  const discountPercent = hasDiscount
    ? Math.round(((numericCompareAt - (numericAmount || 0)) / numericCompareAt) * 100)
    : 0;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
  };

  return (
    <div className={cn("inline-flex items-baseline gap-2 flex-wrap", className)} {...props}>
      <span className={cn("font-sans font-semibold text-deep-charcoal", sizeClasses[size])}>
        {currency}
        {typeof amount === "number" ? amount.toLocaleString("en-IN") : amount}
      </span>

      {hasDiscount && (
        <>
          <span className="text-xs text-muted-foreground line-through font-normal">
            {currency}
            {typeof compareAtAmount === "number"
              ? compareAtAmount.toLocaleString("en-IN")
              : compareAtAmount}
          </span>
          {showSavings && discountPercent > 0 && (
            <span className="text-[11px] font-medium text-terracotta tracking-tight">
              ({discountPercent}% OFF)
            </span>
          )}
        </>
      )}
    </div>
  );
}
