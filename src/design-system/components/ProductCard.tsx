"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Badge, BadgeVariant } from "./Badge";
import { Price } from "./Price";
import { Button } from "./Button";

export interface ProductCardProps {
  id?: string | number;
  href: string;
  title: string;
  category?: string;
  description?: string;
  price: number | string;
  compareAtPrice?: number | string;
  imageSrc: string;
  hoverImageSrc?: string;
  imageAlt?: string;
  badge?: {
    label?: string;
    variant: BadgeVariant;
  };
  rating?: number;
  reviewCount?: number;
  onAddToCart?: (e: React.MouseEvent) => void;
  onQuickView?: (e: React.MouseEvent) => void;
  className?: string;
}

export function ProductCard({
  href,
  title,
  category,
  description,
  price,
  compareAtPrice,
  imageSrc,
  hoverImageSrc,
  imageAlt = "Product Image",
  badge,
  rating,
  reviewCount,
  onAddToCart,
  onQuickView,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-transparent rounded-[8px] transition-all duration-300 ease-out",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-warm-sand/30 border border-border/10">
        <a href={href} className="block w-full h-full" aria-label={title}>
          <img
            src={isHovered && hoverImageSrc ? hoverImageSrc : imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </a>

        {/* Badge Indicator */}
        {badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
        )}

        {/* Quick Actions Hover Overlay */}
        {onQuickView && (
          <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={onQuickView}
              className="w-8 h-8 rounded-full bg-sacred-ivory/90 text-deep-charcoal hover:bg-meru-gold hover:text-white shadow-xs flex items-center justify-center transition-colors text-xs"
              title="Quick View"
              aria-label="Quick View"
            >
              👁
            </button>
          </div>
        )}

        {/* Floating Add to Cart Button (Mobile / Hover) */}
        {onAddToCart && (
          <div className="absolute inset-x-2.5 bottom-2.5 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out hidden sm:block">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={onAddToCart}
              className="shadow-sm font-medium tracking-wider text-xs py-2"
            >
              ADD TO CART
            </Button>
          </div>
        )}
      </div>

      {/* Product Meta & Typography */}
      <div className="mt-3 flex flex-col flex-1 px-0.5">
        {category && (
          <span className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
            {category}
          </span>
        )}

        <a href={href} className="group-hover:text-meru-gold transition-colors">
          <h3 className="font-sans text-base sm:text-lg font-medium text-deep-charcoal leading-snug line-clamp-1">
            {title}
          </h3>
        </a>

        {description && (
          <p className="mt-1 font-sans text-xs text-earth/80 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Rating if present */}
        {rating !== undefined && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-meru-gold">
            <span>{"★".repeat(Math.floor(rating))}</span>
            {reviewCount !== undefined && (
              <span className="text-muted-foreground text-[11px]">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price Row */}
        <div className="mt-2 pt-1 border-t border-border/10 flex items-center justify-between">
          <Price amount={price} compareAtAmount={compareAtPrice} size="sm" />
        </div>

        {/* Mobile-visible direct Add to Cart button */}
        {onAddToCart && (
          <div className="mt-2 sm:hidden">
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={onAddToCart}
              className="text-[11px] py-1.5"
            >
              ADD TO CART
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
