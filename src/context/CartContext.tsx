"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ShopifyCart } from "../lib/shopify/types";

export interface CartItem {
  id: string; // Line ID or fallback ID
  merchandiseId?: string; // Shopify ProductVariant GID
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  variant?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  hasFreeShipping: boolean;
  freeShippingProgress: number; // 0 to 100
  isCartOpen: boolean;
  isLoading: boolean;
  checkoutUrl: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  proceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

const INITIAL_ITEMS: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Helper to convert Shopify cart lines to CartItem array
  const mapShopifyCartToItems = (cart: ShopifyCart): CartItem[] => {
    return cart.lines.edges.map((edge) => {
      const line = edge.node;
      const merchandise = line.merchandise;
      const variantTitle =
        merchandise.title && merchandise.title !== "Default Title"
          ? merchandise.title
          : undefined;

      return {
        id: line.id,
        merchandiseId: merchandise.id,
        title: merchandise.product.title,
        price: parseFloat(merchandise.price.amount),
        image: merchandise.image?.url || "/assets/products/the-meru/the-meru-dhoop-sticks-combo-3.webp",
        variant: variantTitle,
        quantity: line.quantity,
      };
    });
  };

  // Hydrate cart from localStorage on mount and check Shopify sync
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCartId = localStorage.getItem("the_meru_shopify_cart_id");
      if (savedCartId) {
        setShopifyCartId(savedCartId);
        // Fetch fresh cart from Shopify
        fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get", cartId: savedCartId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.cart) {
              setCheckoutUrl(data.cart.checkoutUrl);
              const mapped = mapShopifyCartToItems(data.cart);
              if (mapped.length > 0) {
                setItems(mapped);
              }
            }
          })
          .catch(() => {
            // Ignore background fetch error, keep local storage fallback
          });
      }

      const savedLocal = localStorage.getItem("the_meru_cart");
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save local items to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("the_meru_cart", JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items, isMounted]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Add Item (handles both Shopify Storefront API and local fallback)
  const addItem = async (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity || 1;
    const resolvedMerchandiseId =
      newItem.merchandiseId ||
      (newItem.id.includes("dhoop") || newItem.title.includes("Dhoop")
        ? "gid://shopify/ProductVariant/50623227920632"
        : undefined);

    const itemToAdd = {
      ...newItem,
      merchandiseId: resolvedMerchandiseId,
    };

    setIsLoading(true);

    // 1. Optimistically update local UI
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.id === itemToAdd.id ||
          (itemToAdd.merchandiseId && i.merchandiseId === itemToAdd.merchandiseId)
      );
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prevItems, { ...itemToAdd, quantity: qtyToAdd }];
    });

    openCart();

    // 2. Synchronize with Shopify Storefront API if merchandiseId is present
    if (resolvedMerchandiseId) {
      try {
        if (!shopifyCartId) {
          const res = await fetch("/api/shopify/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "create",
              lines: [{ merchandiseId: resolvedMerchandiseId, quantity: qtyToAdd }],
            }),
          });
          const data = await res.json();
          if (data.success && data.cart) {
            setShopifyCartId(data.cart.id);
            setCheckoutUrl(data.cart.checkoutUrl);
            localStorage.setItem("the_meru_shopify_cart_id", data.cart.id);
            const mapped = mapShopifyCartToItems(data.cart);
            if (mapped.length > 0) setItems(mapped);
          }
        } else {
          const res = await fetch("/api/shopify/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "add",
              cartId: shopifyCartId,
              lines: [{ merchandiseId: resolvedMerchandiseId, quantity: qtyToAdd }],
            }),
          });
          const data = await res.json();
          if (data.success && data.cart) {
            setCheckoutUrl(data.cart.checkoutUrl);
            const mapped = mapShopifyCartToItems(data.cart);
            if (mapped.length > 0) setItems(mapped);
          }
        }
      } catch (err) {
        console.warn("[Shopify Cart] Sync error, preserved local cart:", err);
      }
    }

    setIsLoading(false);
  };

  // Remove Item
  const removeItem = async (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    if (shopifyCartId && id.startsWith("gid://shopify/")) {
      try {
        const res = await fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            cartId: shopifyCartId,
            lineIds: [id],
          }),
        });
        const data = await res.json();
        if (data.success && data.cart) {
          setCheckoutUrl(data.cart.checkoutUrl);
        }
      } catch (err) {
        console.warn("[Shopify Cart] Remove sync error:", err);
      }
    }
  };

  // Update Quantity
  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    if (shopifyCartId && id.startsWith("gid://shopify/")) {
      try {
        const res = await fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            cartId: shopifyCartId,
            lines: [{ id, quantity }],
          }),
        });
        const data = await res.json();
        if (data.success && data.cart) {
          setCheckoutUrl(data.cart.checkoutUrl);
        }
      } catch (err) {
        console.warn("[Shopify Cart] Quantity update sync error:", err);
      }
    }
  };

  const clearCart = () => {
    setItems([]);
    setShopifyCartId(null);
    setCheckoutUrl(null);
    try {
      localStorage.removeItem("the_meru_shopify_cart_id");
      localStorage.removeItem("the_meru_cart");
    } catch {
      // Ignore
    }
  };

  // Proceed to Shopify checkout
  const proceedToCheckout = async () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }

    // If checkoutUrl is not set yet, attempt to create it dynamically with current items
    setIsLoading(true);
    const validLines = items
      .map((i) => ({
        merchandiseId:
          i.merchandiseId ||
          (i.id.includes("dhoop") || i.title.includes("Dhoop")
            ? "gid://shopify/ProductVariant/50623227920632"
            : undefined),
        quantity: i.quantity,
      }))
      .filter((l): l is { merchandiseId: string; quantity: number } =>
        Boolean(l.merchandiseId && l.merchandiseId.startsWith("gid://shopify/ProductVariant/"))
      );

    if (validLines.length > 0) {
      try {
        const res = await fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "create", lines: validLines }),
        });
        const data = await res.json();
        if (data.success && data.cart?.checkoutUrl) {
          setCheckoutUrl(data.cart.checkoutUrl);
          window.location.href = data.cart.checkoutUrl;
          return;
        }
      } catch (err) {
        console.warn("[Checkout] Failed dynamic checkout URL generation:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // Direct permalink fallback: extract numeric variant ID
    const shopDomain =
      process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN || "bir7yt-0k.myshopify.com";

    const permalinkItems = (validLines.length > 0
      ? validLines
      : [{ merchandiseId: "50623227920632", quantity: 1 }]
    )
      .map((l) => {
        const numId = l.merchandiseId.includes("/")
          ? l.merchandiseId.split("/").pop()
          : l.merchandiseId;
        return `${numId}:${l.quantity}`;
      });

    window.location.href = `https://${shopDomain}/cart/${permalinkItems.join(",")}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountToFreeShipping,
        hasFreeShipping,
        freeShippingProgress,
        isCartOpen,
        isLoading,
        checkoutUrl,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
