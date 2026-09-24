"use client";

import { useState } from "react";
import type { MediaTile2Styles } from "../_styles";
import { cn } from "../../lib/utils";
import { useCart } from "../../context/CartContext";
import { Button } from "../../design-system/components/Button";

export type MediaTile2Data = {
  ariaLabel: string;
  href: string;
  alt: string;
  imgSrc: string;
  alt2: string;
  imgSrc2: string;
  label: string;
  label2: string;
  id: string;
  id2: string;
  label3: string;
  label4: string;
  label5: string;
  isComingSoon?: boolean;
  shopifyVariantId?: string;
};

/** An interactive hero product card for the Best Sellers showcase. */
export default function MediaTile2({
  d,
  styles,
  isComingSoon = d.isComingSoon ?? false,
}: {
  d: MediaTile2Data;
  styles?: MediaTile2Styles;
  isComingSoon?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComingSoon) return;

    const numericPrice = parseFloat(d.label4.replace(/[^0-9.]/g, "")) || 0;
    const comparePrice = d.label3 ? parseFloat(d.label3.replace(/[^0-9.]/g, "")) : undefined;
    addItem({
      id: d.id2 || d.href || d.label,
      merchandiseId: d.shopifyVariantId,
      title: d.label,
      price: numericPrice,
      compareAtPrice: comparePrice,
      image: d.imgSrc,
      variant: d.label2 || "The Meru Collection",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        "w-full h-full border border-solid border-deep-charcoal/10 rounded-[8px] sm:rounded-[10px] text-center bg-background transition-all duration-300 overflow-hidden flex flex-col justify-between relative",
        isComingSoon
          ? "cursor-default select-none shadow-none"
          : "shadow-subtle hover:shadow-hover group"
      )}
      aria-label={d.ariaLabel}
      role="group"
      onMouseEnter={() => !isComingSoon && setIsHovered(true)}
      onMouseLeave={() => !isComingSoon && setIsHovered(false)}
    >
      {/* Coming Soon Overlay */}
      {isComingSoon && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-sacred-ivory/40 backdrop-blur-[1px] select-none pointer-events-none">
          <div className="bg-[#1E1C19]/95 border border-[#C99A28]/60 rounded-lg px-5 py-3 shadow-xl flex flex-col items-center text-center">
            <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-[#C99A28] uppercase">
              COMING SOON
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#F8F4EB]/80 font-sans tracking-wide mt-0.5">
              The Meru Collection
            </span>
          </div>
        </div>
      )}

      {/* Main Card Content (Completely blurred if coming soon) */}
      <div
        className={cn(
          "h-full flex flex-col justify-between p-3.5 sm:p-4 transition-all duration-300",
          isComingSoon && "filter blur-md opacity-60 pointer-events-none select-none"
        )}
      >
        {isComingSoon ? (
          <div className="block relative cursor-default select-none">
            {/* Main Hero Product Photography */}
            <div className="relative aspect-square w-full rounded-[6px] overflow-hidden bg-sacred-ivory/50">
              <img
                className="w-full h-full object-contain block"
                data-component="image"
                alt={d.alt}
                src={d.imgSrc}
                loading="lazy"
              />
              {d.label5 && (
                <span className="absolute top-2.5 right-2.5 bg-meru-gold text-deep-charcoal text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider shadow-xs">
                  {d.label5.trim()}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-3 text-left">
              <h3 className="font-sans text-sm sm:text-base font-semibold text-deep-charcoal line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] leading-snug">
                {d.label}
              </h3>

              {d.label2 && (
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1 font-sans">
                  {d.label2}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                <span className="text-meru-gold text-sm">★</span>
                <span className="font-semibold text-deep-charcoal text-[11px]">4.8</span>
                <span className="text-muted-foreground text-[10px]">(Verified)</span>
              </div>

              <div className="flex items-baseline gap-2 mt-2 font-sans">
                <span className="text-base sm:text-lg font-bold text-deep-charcoal">{d.label4}</span>
                {d.label3 && (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    {d.label3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <a className="block relative cursor-pointer" data-component="link" href={d.href}>
            {/* Main Hero Product Photography - Uncropped & Expansive */}
            <div className="relative aspect-square w-full rounded-[6px] overflow-hidden bg-sacred-ivory/50">
              <img
                className="w-full h-full object-contain block transition-transform duration-500 ease-out"
                data-component="image"
                alt={d.alt}
                src={isHovered && d.imgSrc2 && d.imgSrc2 !== d.imgSrc ? d.imgSrc2 : d.imgSrc}
                loading="lazy"
              />
              {d.label5 && (
                <span className="absolute top-2.5 right-2.5 bg-meru-gold text-deep-charcoal text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider shadow-xs">
                  {d.label5.trim()}
                </span>
              )}
            </div>

            {/* Product Info - Previous Left-aligned Layout */}
            <div className="mt-3 text-left">
              <h3 className="font-sans text-sm sm:text-base font-semibold text-deep-charcoal line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] hover:text-meru-gold transition-colors leading-snug">
                {d.label}
              </h3>

              {d.label2 && (
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1 font-sans">
                  {d.label2}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                <span className="text-meru-gold text-sm">★</span>
                <span className="font-semibold text-deep-charcoal text-[11px]">4.8</span>
                <span className="text-muted-foreground text-[10px]">(Verified)</span>
              </div>

              <div className="flex items-baseline gap-2 mt-2 font-sans">
                <span className="text-base sm:text-lg font-bold text-deep-charcoal">{d.label4}</span>
                {d.label3 && (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    {d.label3}
                  </span>
                )}
              </div>
            </div>
          </a>
        )}

        {/* Add to Cart / Coming Soon Button */}
        <div className="mt-3 pt-2.5 border-t border-deep-charcoal/10">
          {isComingSoon ? (
            <Button
              variant="primary"
              size="md"
              fullWidth
              disabled
              className="bg-[#1E1C19]/30 text-white/70 border-transparent cursor-not-allowed"
              suppressHydrationWarning
            >
              COMING SOON
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              fullWidth
              withArrow={!added}
              id={d.id2}
              onClick={handleAddToCart}
              className={added ? "bg-botanical text-white border-botanical hover:bg-botanical" : ""}
              suppressHydrationWarning
            >
              {added ? "✓ Added to Cart" : "ADD TO CART"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
