"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { type ProductItem } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { Button, MeruArrow } from "../../../design-system/components/Button";

interface ProductViewProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export default function ProductView({ product, relatedProducts }: ProductViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0); // First accordion open by default
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const mainImageRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart, proceedToCheckout } = useCart();

  const handleAddToCart = async (shouldOpenCart: boolean = true) => {
    await addItem({
      id: product.shopifyVariantId || product.id,
      merchandiseId: product.shopifyVariantId,
      title: product.title,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0]?.src || "",
      variant: product.subtitle,
      quantity: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    if (shouldOpenCart) {
      openCart();
    }
  };

  const handleBuyNow = async () => {
    await addItem({
      id: product.shopifyVariantId || product.id,
      merchandiseId: product.shopifyVariantId,
      title: product.title,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0]?.src || "",
      variant: product.subtitle,
      quantity: quantity,
    });
    proceedToCheckout();
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, product.images.length]);

  const discountAmount = product.compareAtPrice - product.price;
  const activeImage = product.images[selectedImageIndex] || product.images[0];
  const isComingSoon =
    product.isComingSoon ?? (product.slug !== "the-meru-3-piece-stick-combo-pack");

  return (
    <div className="w-full bg-[#FFFFFF] text-deep-charcoal min-h-screen">
      {/* Editorial Breadcrumb */}
      <div className="w-full max-w-[1380px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-xs text-[#736B5E] font-sans">
          <Link href="/" className="hover:text-meru-gold transition-colors">
            Home
          </Link>
          <span className="text-deep-charcoal/20">/</span>
          <Link href="/#shopify-section-165769448781d7dc80" className="hover:text-meru-gold transition-colors">
            Sacred Offerings
          </Link>
          <span className="text-deep-charcoal/20">/</span>
          <span className="text-deep-charcoal font-medium truncate max-w-[220px] sm:max-w-none">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Product Canvas: Left Gallery (~56%) + Right Editorial Column (~44%) */}
      <section className="w-full max-w-[1380px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-2 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Clean Editorial Gallery (NO OUTER WHITE CARD) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            
            {/* Desktop Vertical Thumbnail Rail (Left of Main Image) */}
            {product.images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-3 shrink-0 w-[68px] lg:w-[74px]">
                {product.images.map((img, idx) => {
                  const isActive = idx === selectedImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      onMouseEnter={() => setSelectedImageIndex(idx)}
                      className={`relative w-full aspect-square rounded-[3px] bg-[#FBF9F5] p-1 transition-all duration-200 cursor-pointer overflow-hidden ${
                        isActive
                          ? "border border-meru-gold ring-1 ring-meru-gold/40 shadow-2xs opacity-100"
                          : "border border-deep-charcoal/10 opacity-70 hover:opacity-100 hover:border-deep-charcoal/30"
                      }`}
                      aria-label={`Select view ${idx + 1} of ${product.title}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Hero Photograph (Directly on Page Canvas - No Outer Card Box) */}
            <div className="flex-1 w-full flex flex-col">
              <div
                ref={mainImageRef}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setLightboxOpen(true)}
                className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-hidden cursor-zoom-in bg-[#FAF8F5]/60 select-none group"
                title="Click to view full screen photograph"
              >
                {/* Clean Product Badge Overlay (Subtle, Restrained) */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                  {isComingSoon ? (
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-meru-gold bg-[#1E1C19]/90 border border-meru-gold/50 px-2.5 py-1 rounded-[2px] uppercase backdrop-blur-xs">
                      COMING SOON
                    </span>
                  ) : (
                    <>
                      <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] text-[#1E160D] bg-sacred-ivory/90 border border-meru-gold/40 px-2.5 py-1 rounded-[2px] uppercase backdrop-blur-xs">
                        {product.badge}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.08em] text-[#5D574E] bg-white/80 px-2 py-1 rounded-[2px] uppercase">
                        {product.stockStatus}
                      </span>
                    </>
                  )}
                </div>

                {/* Subtle Expand Hint */}
                <div className="absolute bottom-3 right-3 z-10 text-[10px] text-[#736B5E] bg-white/85 px-2 py-1 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Click to expand
                </div>

                {/* Main Product Image with Refined Cursor-Tracking Zoom */}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }}
                  className={`w-full h-full object-contain transition-transform ease-out ${
                    isZoomed ? "scale-140 duration-100 cursor-crosshair" : "scale-100 duration-300"
                  }`}
                />
              </div>

              {/* Mobile Horizontal Thumbnail Strip (Below main image only on small screens) */}
              {product.images.length > 1 && (
                <div className="flex sm:hidden items-center gap-2.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
                  {product.images.map((img, idx) => {
                    const isActive = idx === selectedImageIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`shrink-0 w-16 h-16 rounded-[2px] bg-[#FAF8F5] p-1 transition-all cursor-pointer ${
                          isActive
                            ? "border border-meru-gold ring-1 ring-meru-gold/40 opacity-100"
                            : "border border-deep-charcoal/10 opacity-70"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Natural Editorial Column (NO SECTION CARDS)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col font-sans lg:sticky lg:top-24">
            
            {/* 1. Category Pill / Collection Label */}
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-meru-gold block">
              THE MERU RITUAL COLLECTION
            </span>

            {/* 2. Product Name (Clean Established Sans-Serif Typography) */}
            <h1 className="font-sans text-2xl sm:text-3xl lg:text-[36px] font-semibold text-deep-charcoal tracking-tight leading-[1.18] mt-2 mb-1.5">
              {product.title}
            </h1>

            {/* 3. Short Product Descriptor */}
            <p className="text-sm sm:text-[15px] text-[#5D574E] font-normal leading-normal">
              {product.subtitle}
            </p>

            {/* 4. Subtle Rating & Verified Ritualists */}
            <div className="flex items-center gap-2 mt-3 text-xs text-[#5D574E]">
              <span className="text-meru-gold text-sm tracking-wide">★★★★★</span>
              <span className="font-semibold text-deep-charcoal">{product.rating}</span>
              <span className="text-deep-charcoal/30">·</span>
              <span>{product.reviewCount} Verified Ritualists</span>
            </div>

            {/* 5. Natural Price Display (No Cards, No Heavy Green Pills) */}
            <div className="mt-5 pt-4 border-t border-deep-charcoal/8 flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-deep-charcoal tracking-tight">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.compareAtPrice > product.price && (
                  <>
                    <span className="text-sm sm:text-base text-[#736B5E] line-through font-normal">
                      ₹{product.compareAtPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-semibold text-meru-gold uppercase tracking-wider">
                      SAVE ₹{discountAmount.toLocaleString("en-IN")} ({product.discountPercentage})
                    </span>
                  </>
                )}
              </div>

              {/* Shipping Microcopy */}
              <p className="text-[11px] sm:text-xs text-[#736B5E] font-normal mt-1">
                Inclusive of all taxes · Free express shipping on eligible orders
              </p>

              {/* Net Content Specification */}
              <p className="text-xs text-[#5D574E] mt-1.5 flex items-center gap-1.5">
                <span className="text-deep-charcoal font-medium">Pack Net Weight:</span>
                <span>{product.netQuantity}</span>
              </p>
            </div>

            {/* 6. Purchase Action Block (Live purchase controls OR Coming Soon notice) */}
            {isComingSoon ? (
              <div className="mt-6 flex flex-col gap-3.5">
                <div className="bg-[#FAF7F0] border border-meru-gold/30 rounded-[4px] p-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-meru-gold animate-pulse" />
                    <span className="font-sans text-[11px] uppercase font-bold tracking-[0.2em] text-meru-gold">
                      RITUAL IN CRAFT • COMING SOON
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#5D574E] leading-relaxed font-sans">
                    This sacred formulation is currently being handcrafted in limited micro-batches. Pre-orders and dispatch will open soon.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled
                  className="h-12 tracking-[0.16em] font-semibold bg-[#1E1C19]/25 text-deep-charcoal/50 border-transparent cursor-not-allowed select-none"
                >
                  COMING SOON
                </Button>

                <div className="flex items-center gap-2 text-[11px] text-[#736B5E] pt-1">
                  <span>✦ Pure botanical ingredients</span>
                  <span className="text-deep-charcoal/20">·</span>
                  <span>Artisanal micro-batch</span>
                  <span className="text-deep-charcoal/20">·</span>
                  <span>Launching soon</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  {/* Quantity Stepper (120px) */}
                  <div className="flex items-center h-12 w-[120px] shrink-0 border border-deep-charcoal/20 rounded-[2px] bg-transparent">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full text-base text-deep-charcoal hover:text-meru-gold transition-colors flex items-center justify-center cursor-pointer select-none"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-sans text-sm font-semibold text-deep-charcoal select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full text-base text-deep-charcoal hover:text-meru-gold transition-colors flex items-center justify-center cursor-pointer select-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Cart (Global Gold Shimmer Button - 240px) */}
                  <div className="flex-1 min-w-[200px] sm:max-w-[260px]">
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      withArrow={!added}
                      glare
                      onClick={() => handleAddToCart(true)}
                      className="h-12 tracking-[0.14em] font-semibold"
                    >
                      {added ? "✓ ADDED TO CART" : "ADD TO CART"}
                    </Button>
                  </div>

                  {/* Secondary Buy Now (Refined Ivory with Slender Border) */}
                  <div className="w-full sm:w-auto sm:min-w-[150px]">
                    <Button
                      variant="secondary"
                      size="md"
                      fullWidth
                      withArrow
                      onClick={handleBuyNow}
                      className="h-12 tracking-[0.14em] font-medium"
                    >
                      BUY NOW
                    </Button>
                  </div>
                </div>

                {/* Quiet Craft Trust Line */}
                <div className="flex items-center gap-2 text-[11px] text-[#736B5E] pt-1">
                  <span>✦ Handcrafted with dignity</span>
                  <span className="text-deep-charcoal/20">·</span>
                  <span>100% Charcoal-Free</span>
                  <span className="text-deep-charcoal/20">·</span>
                  <span>Direct Artisan Sourcing</span>
                </div>
              </div>
            )}

            {/* 7. Product Introduction (Concise Editorial Paragraph) */}
            <div className="mt-7 pt-6 border-t border-deep-charcoal/8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-deep-charcoal mb-2">
                The Sensory Offering
              </h3>
              <p className="text-sm sm:text-[14px] text-[#423D35] leading-relaxed font-sans">
                {product.overview}
              </p>
            </div>

            {/* 8. Product Highlights (Quiet Horizontal List - No Big Feature Boxes) */}
            <div className="mt-5 pt-4 border-t border-deep-charcoal/8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                {product.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-meru-gold text-xs shrink-0 mt-0.5">✦</span>
                    <div>
                      <span className="font-semibold text-deep-charcoal">{h.title}</span>
                      <span className="text-[#736B5E] block text-[11px] leading-tight mt-0.5">
                        {h.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. Minimalist Accordions (Thin Dividers, Label, Minimal Expand Icon) */}
            <div className="mt-7 border-t border-deep-charcoal/10 divide-y divide-deep-charcoal/10">
              {product.accordions.map((acc, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div key={index} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between text-left font-sans text-sm font-medium text-deep-charcoal hover:text-meru-gold transition-colors cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
                        {acc.title}
                      </span>
                      <span className="text-base font-light text-deep-charcoal/60 group-hover:text-meru-gold transition-colors ml-4">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pt-2.5 pb-1 text-xs sm:text-[13px] text-[#5D574E] leading-relaxed font-sans animate-in fade-in-50 duration-200">
                        {Array.isArray(acc.content) ? (
                          <div className="flex flex-col gap-2">
                            {acc.content.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        ) : (
                          <p>{acc.content}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BRAND STORY TRANSITION SECTION (CALM, EDITORIAL, SPACIOUS) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#FAF7F0] border-y border-deep-charcoal/6 py-14 sm:py-20 my-6">
        <div className="max-w-3xl mx-auto px-6 text-center font-sans">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-meru-gold block mb-2.5">
            The Philosophy of Living Sacred
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-[32px] font-semibold text-deep-charcoal leading-snug tracking-tight">
            From Sacred Offerings to Everyday Rituals
          </h2>
          <div className="w-12 h-[1px] bg-meru-gold/60 mx-auto my-4.5" />
          <p className="text-sm sm:text-[15px] text-[#5D574E] leading-relaxed max-w-2xl mx-auto font-normal">
            Every creation at The Meru begins where devotion meets mindful transformation.
            We take sacred temple offerings and repurpose them with pure botanical resins, damask rose petals,
            and fragrant Ayurvedic spices. What once honored divinity returns to nourish your home—free from toxic charcoal,
            artificial chemicals, or synthetic additives.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* RELATED PRODUCTS: COMPLETE THE RITUAL                     */}
      {/* ========================================================= */}
      {relatedProducts.length > 0 && (
        <section className="w-full max-w-[1380px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-18">
          <div className="text-center mb-10 font-sans">
            <span className="text-[11px] uppercase tracking-[0.2em] text-meru-gold font-semibold block">
              Curated Harmonies
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-semibold text-deep-charcoal mt-1 tracking-tight">
              Complete The Ritual
            </h3>
            <p className="text-xs sm:text-sm text-[#736B5E] mt-1">
              Discover complementary offerings crafted for your mindful practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedProducts.map((rel) => {
              const isRelComingSoon =
                rel.isComingSoon ?? (rel.slug !== "the-meru-3-piece-stick-combo-pack");

              return (
                <div
                  key={rel.id}
                  className="bg-transparent flex flex-col justify-between group"
                >
                  <Link href={`/products/${rel.slug}`} className="block relative">
                    {/* Clean uncropped image canvas */}
                    <div className="aspect-[4/3] w-full bg-[#FAF8F5]/80 p-6 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[#FAF8F5]">
                      <img
                        src={rel.images[0]?.src}
                        alt={rel.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-sacred-ivory/95 border border-meru-gold/40 text-deep-charcoal text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                        {isRelComingSoon ? "COMING SOON" : rel.badge}
                      </span>
                    </div>

                    <div className="mt-4 text-left font-sans">
                      <span className="text-[11px] font-semibold text-meru-gold uppercase tracking-wider block">
                        {rel.subtitle.split("•")[0]?.trim()}
                      </span>
                      <h4 className="font-sans text-base sm:text-lg font-semibold text-deep-charcoal mt-0.5 line-clamp-1 group-hover:text-meru-gold transition-colors">
                        {rel.title}
                      </h4>
                      <div className="flex items-baseline gap-2.5 mt-1.5">
                        <span className="text-base sm:text-lg font-bold text-deep-charcoal">
                          ₹{rel.price.toLocaleString("en-IN")}
                        </span>
                        {rel.compareAtPrice > rel.price && (
                          <span className="text-xs text-[#736B5E] line-through">
                            ₹{rel.compareAtPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div className="mt-4 pt-3 border-t border-deep-charcoal/8 flex items-center gap-3">
                    <Link
                      href={`/products/${rel.slug}`}
                      className="flex-1 text-center py-2.5 px-3 rounded-[2px] border border-deep-charcoal/20 text-xs font-semibold text-deep-charcoal hover:border-deep-charcoal hover:bg-sacred-ivory transition-colors uppercase tracking-wider"
                    >
                      View Details
                    </Link>
                    {isRelComingSoon ? (
                      <Button
                        variant="primary"
                        size="sm"
                        disabled
                        className="flex-1 h-10 tracking-[0.12em] font-semibold bg-[#1E1C19]/25 text-deep-charcoal/50 border-transparent cursor-not-allowed select-none"
                      >
                        COMING SOON
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          addItem({
                            id: rel.shopifyVariantId || rel.id,
                            merchandiseId: rel.shopifyVariantId,
                            title: rel.title,
                            price: rel.price,
                            compareAtPrice: rel.compareAtPrice,
                            image: rel.images[0]?.src || "",
                            variant: rel.subtitle,
                            quantity: 1,
                          });
                          openCart();
                        }}
                        className="flex-1 h-10 tracking-[0.12em] font-semibold"
                      >
                        + ADD TO CART
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* MINIMAL FULL-SCREEN LIGHTBOX MODAL                         */}
      {/* ========================================================= */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1E1C19]/96 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in-0 duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-[#FAF8F5]/80 hover:text-white text-2xl p-2 cursor-pointer z-50"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Lightbox Image Stage */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-[85vh] object-contain select-none"
            />
          </div>

          {/* Navigation indicators if multiple */}
          {product.images.length > 1 && (
            <div
              className="flex items-center gap-3 mt-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-12 h-12 rounded-[2px] bg-white/10 p-1 border transition-all cursor-pointer ${
                    i === selectedImageIndex
                      ? "border-meru-gold ring-1 ring-meru-gold opacity-100"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
