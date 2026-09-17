"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
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
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

// Default initial item to showcase the luxury cart drawer immediately
const INITIAL_ITEMS: CartItem[] = [
  {
    id: "BtnAddProduct-the-meru-dhoop-sticks-combo-3",
    title: "The Meru Dhoop Sticks – Combo Pack of 3 (150g)",
    price: 300,
    compareAtPrice: 400,
    image: "/assets/products/the-meru/the-meru-dhoop-sticks-combo-3.webp",
    variant: "Indian Rose, Kesar Chandan & Lavender (150g)",
    quantity: 1,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage if present
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem("the_meru_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Upgrade any legacy cloned paths to authentic The Meru image
          const sanitized = parsed.map((item) => {
            if (item.image?.includes("/assets/cloned/")) {
              return {
                ...item,
                image: "/assets/products/the-meru/the-meru-dhoop-sticks-combo-3.webp",
              };
            }
            return item;
          });
          setItems(sanitized);
        }
      }
    } catch {
      // Ignore parse errors, fallback to default
    }
  }, []);

  // Save to localStorage on change
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

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity || 1;
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prevItems, { ...newItem, quantity: qtyToAdd }];
    });
    openCart();
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
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
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
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
