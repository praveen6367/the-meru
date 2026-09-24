"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { proceedToCheckout, items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    } else {
      proceedToCheckout();
    }
  }, [items, proceedToCheckout, router]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 rounded-full border-2 border-meru-gold/30 border-t-meru-gold animate-spin mb-6" />
      <h1 className="text-xl sm:text-2xl font-semibold text-deep-charcoal tracking-tight">
        Redirecting to Sacred Checkout...
      </h1>
      <p className="mt-2 text-xs sm:text-sm text-[#736B5E] max-w-sm">
        Please wait while we connect your items with our secure Shopify checkout portal.
      </p>
    </div>
  );
}
