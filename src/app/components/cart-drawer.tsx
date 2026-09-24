"use client";

import React, { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "../../design-system/icons";
import { Button, LinkButton } from "../../design-system/components/Button";

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    freeShippingThreshold,
    amountToFreeShipping,
    hasFreeShipping,
    freeShippingProgress,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    proceedToCheckout,
    isLoading,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-label="Close cart drawer"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-[#FFFFFF] shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-deep-charcoal/10 flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <h2 className="font-sans text-base sm:text-lg font-semibold tracking-wide text-deep-charcoal">
              YOUR CART
            </h2>
            <span className="font-sans text-xs text-muted-foreground font-semibold">
              ({totalCount})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-deep-charcoal/70 hover:text-meru-gold transition-colors cursor-pointer rounded-full"
            aria-label="Close cart"
          >
            <CloseIcon size={19} />
          </button>
        </div>

        {/* Free Shipping Rewards Progress Bar */}
        <div className="bg-sacred-ivory/80 px-4 sm:px-5 py-3.5 border-b border-deep-charcoal/10">
          <div className="flex items-center justify-between text-xs font-sans font-medium text-deep-charcoal mb-2">
            <div className="flex items-center gap-1.5">
              <TruckIcon size={17} className="text-meru-gold" />
              <span>
                {hasFreeShipping ? (
                  <span className="text-botanical font-semibold">
                    ✓ You have unlocked Free Delivery!
                  </span>
                ) : (
                  <span>
                    Spend{" "}
                    <strong className="text-deep-charcoal font-bold">
                      ₹{amountToFreeShipping.toLocaleString("en-IN")}
                    </strong>{" "}
                    more for <strong className="text-meru-gold">Free Delivery!</strong>
                  </span>
                )}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {hasFreeShipping ? "100%" : `${freeShippingProgress}%`}
            </span>
          </div>

          <div className="w-full h-1.5 bg-deep-charcoal/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-meru-gold to-[#E0B94A] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Content: Items or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-deep-charcoal/10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 rounded-full bg-sacred-ivory border border-meru-gold/30 flex items-center justify-center text-meru-gold text-2xl font-sans mb-4">
                ✧
              </div>
              <h3 className="font-sans text-lg sm:text-xl text-deep-charcoal font-semibold">
                Your cart is empty
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-earth max-w-xs leading-relaxed font-sans">
                Begin your journey with our handcrafted sacred incense, havan cups, and artisanal lifestyle rituals.
              </p>
              <LinkButton
                variant="primary"
                size="md"
                withArrow
                href="/collections/all"
                onClick={closeCart}
                className="mt-6"
              >
                EXPLORE THE COLLECTION
              </LinkButton>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3 sm:gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-[6px] bg-sacred-ivory border border-deep-charcoal/10 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans text-sm sm:text-base font-medium text-deep-charcoal leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-terracotta p-1 transition-colors shrink-0"
                        title="Remove item"
                        aria-label={`Remove ${item.title}`}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>

                    {item.variant && (
                      <span className="text-[11px] font-sans text-muted-foreground mt-0.5 line-clamp-1">
                        {item.variant}
                      </span>
                    )}

                    {/* Stepper + Price Row */}
                    <div className="flex items-center justify-between mt-3 pt-1">
                      {/* Understated Stepper */}
                      <div className="inline-flex items-center border border-deep-charcoal/20 rounded-[4px] bg-[#FFFFFF] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-deep-charcoal hover:bg-sacred-ivory transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-sans font-semibold text-deep-charcoal select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-deep-charcoal hover:bg-sacred-ivory transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="text-right">
                        <span className="font-sans text-sm font-semibold text-deep-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        {item.compareAtPrice && item.compareAtPrice > item.price && (
                          <span className="block text-[10px] text-muted-foreground line-through">
                            ₹{(item.compareAtPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-deep-charcoal/10 bg-[#FFFFFF] flex flex-col gap-3">
            <div className="flex items-baseline justify-between text-sm font-sans">
              <span className="font-semibold text-deep-charcoal uppercase tracking-wider text-xs">
                SUBTOTAL
              </span>
              <span className="font-sans text-base sm:text-lg font-bold text-deep-charcoal">
                ₹{subtotal.toLocaleString("en-IN")}.00 INR
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground font-sans leading-tight">
              Taxes included. Shipping calculated at checkout.
            </p>

            {/* Buy Now / Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              withArrow
              disabled={isLoading}
              onClick={proceedToCheckout}
            >
              {isLoading ? "PREPARING CHECKOUT..." : "PROCEED TO CHECKOUT"}
            </Button>

            {/* View Full Cart Page Link */}
            <LinkButton
              variant="outline"
              size="md"
              fullWidth
              href="/cart"
              onClick={closeCart}
              className="text-xs tracking-wider"
            >
              VIEW FULL CART
            </LinkButton>

            {/* Payment & Security Badge */}
            <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-muted-foreground font-sans">
              <ShieldCheckIcon size={14} className="text-botanical" />
              <span>100% Verified Sacred & Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
