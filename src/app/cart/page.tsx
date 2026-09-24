"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import Section2 from "../sections/section2";
import HeaderSection from "../sections/header-section";
import FooterNewSection from "../sections/footer-new-section";
import { Button, LinkButton } from "../../design-system/components/Button";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "../../design-system/icons";

export default function CartPage() {
  const {
    items,
    totalCount,
    subtotal,
    freeShippingThreshold,
    amountToFreeShipping,
    hasFreeShipping,
    freeShippingProgress,
    updateQuantity,
    removeItem,
    proceedToCheckout,
    isLoading,
  } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-clip font-sans">
      {/* Top Announcement Bar */}
      <Section2 />

      {/* Main Header & Navigation */}
      <HeaderSection />

      <main id="MainContent" className="flex-1 w-full bg-[#FFFFFF] py-6 sm:py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Editorial Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-xs text-[#736B5E] mb-6">
            <Link href="/" className="hover:text-meru-gold transition-colors">
              Home
            </Link>
            <span className="text-deep-charcoal/20">/</span>
            <span className="text-deep-charcoal font-medium">Your Sacred Cart</span>
          </nav>

          {/* Page Heading */}
          <div className="border-b border-deep-charcoal/10 pb-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-deep-charcoal">
              YOUR CART
            </h1>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? "item" : "items"} in your cart
            </span>
          </div>

          {/* Free Shipping Rewards Progress Bar */}
          <div className="bg-sacred-ivory/80 px-4 sm:px-6 py-4 rounded-[6px] border border-deep-charcoal/10 mb-8 max-w-4xl">
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-deep-charcoal mb-2.5">
              <div className="flex items-center gap-2">
                <TruckIcon size={18} className="text-meru-gold" />
                <span>
                  {hasFreeShipping ? (
                    <span className="text-botanical font-semibold">
                      ✓ You have unlocked Free Express Delivery!
                    </span>
                  ) : (
                    <span>
                      Add{" "}
                      <strong className="text-deep-charcoal font-bold">
                        ₹{amountToFreeShipping.toLocaleString("en-IN")}
                      </strong>{" "}
                      more to qualify for <strong className="text-meru-gold">Free Delivery!</strong>
                    </span>
                  )}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">
                {hasFreeShipping ? "100%" : `${freeShippingProgress}%`}
              </span>
            </div>

            <div className="w-full h-2 bg-deep-charcoal/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-meru-gold to-[#E0B94A] transition-all duration-300 ease-out rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="py-16 sm:py-24 text-center max-w-lg mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sacred-ivory border border-meru-gold/30 flex items-center justify-center text-meru-gold text-3xl mb-5">
                ✧
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-deep-charcoal">
                Your cart is currently empty
              </h2>
              <p className="mt-2.5 text-sm text-[#5D574E] leading-relaxed max-w-sm">
                Explore our live collection of 100% charcoal-free temple dhoop sticks and artisanal sacred lifestyle rituals.
              </p>
              <LinkButton
                variant="primary"
                size="md"
                withArrow
                href="/products/the-meru-3-piece-stick-combo-pack"
                className="mt-8 tracking-[0.14em]"
              >
                DISCOVER THE COLLECTION
              </LinkButton>
            </div>
          ) : (
            /* Cart Grid: Left Items + Right Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Items Table */}
              <div className="lg:col-span-8 divide-y divide-deep-charcoal/10 border-t border-b border-deep-charcoal/10">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    {/* Thumbnail */}
                    <div className="w-22 h-22 sm:w-24 sm:h-24 shrink-0 rounded-[4px] bg-[#FAF8F5] border border-deep-charcoal/10 overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-deep-charcoal leading-snug">
                        {item.title}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.variant}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-sm sm:text-base font-bold text-deep-charcoal">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.compareAtPrice && item.compareAtPrice > item.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{item.compareAtPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Total & Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Stepper */}
                      <div className="inline-flex items-center border border-deep-charcoal/20 rounded-[3px] bg-[#FFFFFF] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-deep-charcoal hover:bg-sacred-ivory transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={12} />
                        </button>
                        <span className="w-9 text-center text-xs font-semibold text-deep-charcoal select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-deep-charcoal hover:bg-sacred-ivory transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right min-w-[80px]">
                        <span className="text-base sm:text-lg font-bold text-deep-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-terracotta transition-colors cursor-pointer"
                        title="Remove item"
                        aria-label={`Remove ${item.title}`}
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-4 bg-[#FAF7F0] border border-deep-charcoal/10 rounded-[6px] p-6 lg:sticky lg:top-28">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-deep-charcoal mb-4 pb-3 border-b border-deep-charcoal/10">
                  ORDER SUMMARY
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between items-center text-[#5D574E]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-deep-charcoal">
                      ₹{subtotal.toLocaleString("en-IN")}.00 INR
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#5D574E]">
                    <span>Estimated Shipping</span>
                    <span className={hasFreeShipping ? "text-botanical font-semibold" : ""}>
                      {hasFreeShipping ? "FREE" : "₹50 (Free over ₹499)"}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-deep-charcoal/10 text-base">
                    <span className="font-bold text-deep-charcoal">Estimated Total</span>
                    <span className="text-xl font-bold text-deep-charcoal">
                      ₹{(subtotal + (hasFreeShipping ? 0 : 50)).toLocaleString("en-IN")}.00 INR
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#736B5E] mt-2 mb-6">
                  Taxes included. Complete shipping and payment details calculated at official Shopify checkout.
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  withArrow
                  glare
                  disabled={isLoading}
                  onClick={proceedToCheckout}
                  className="h-13 tracking-[0.16em] font-semibold text-sm shadow-md"
                >
                  {isLoading ? "PREPARING CHECKOUT..." : "PROCEED TO CHECKOUT"}
                </Button>

                <div className="mt-6 pt-4 border-t border-deep-charcoal/10 flex flex-col gap-2.5 text-xs text-[#5D574E]">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon size={16} className="text-botanical shrink-0" />
                    <span>100% Verified Sacred & Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-meru-gold text-sm shrink-0">✦</span>
                    <span>Dispatched in 24-48 Hours with SMS Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-meru-gold text-sm shrink-0">✦</span>
                    <span>100% Charcoal-Free Temple Flower Formulation</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* The Meru Footer */}
      <FooterNewSection />
    </div>
  );
}
