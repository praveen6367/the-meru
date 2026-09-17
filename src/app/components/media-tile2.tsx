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
};

/** An interactive hero product card for the Best Sellers showcase. */
export default function MediaTile2({ d, styles }: { d: MediaTile2Data; styles?: MediaTile2Styles }) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const numericPrice = parseFloat(d.label4.replace(/[^0-9.]/g, "")) || 0;
    const comparePrice = d.label3 ? parseFloat(d.label3.replace(/[^0-9.]/g, "")) : undefined;
    addItem({
      id: d.id2 || d.href || d.label,
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
      className="w-full h-full border border-solid border-deep-charcoal/10 rounded-[8px] sm:rounded-[10px] text-center bg-background shadow-subtle hover:shadow-hover transition-all duration-300 overflow-hidden flex flex-col justify-between group"
      aria-label={d.ariaLabel}
      role="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full flex flex-col justify-between p-3.5 sm:p-4">
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

        {/* Add to Cart Button */}
        <div className="mt-3 pt-2.5 border-t border-deep-charcoal/10">
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
        </div>
      </div>
    </div>
  );
}
